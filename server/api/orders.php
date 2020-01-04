<?php

if ($request['method'] === 'POST') {
  $link = get_db_link();

  if (!$_SESSION['cart_id']) {
    throw new ApiError('You need an active shopping cart to proceed', 400);
  }

  $cartId = $_SESSION['cart_id'];
  $name = $request['body']['name'];
  $email = $request['body']['email'];
  $phone = $request['body']['phone'];
  $creditCard = $request['body']['creditCard'];
  $shippingAddress = $request['body']['shippingAddress'];

  if (!$name) {
    throw new ApiError('You need to present a name to checkout', 400);
  }

  if (!$creditCard) {
    throw new ApiError('You need to present a creditcard to checkout', 400);
  }

  if (!$shippingAddress) {
    throw new ApiError('You need to present a shipping address to checkout', 400);
  }

  $orderQuery = "INSERT INTO `orders`(cartId, name, email, phone, creditCard, shippingAddress)
                 VALUES (?,?,?,?,?,?)";
  $statement = $link->prepare($orderQuery);
  $statement->bind_param('isssss', $cartId, $name, $email, $phone, $creditCard, $shippingAddress);
  $orderSubmit = $statement->execute();
  $orderId = $statement->insert_id;

  $orderQuery = "SELECT * FROM `orders` WHERE orderId = $orderId";
  $query = $link->query($orderQuery);
  $data = (mysqli_fetch_assoc($query));
  unset($_SESSION['cart_id']);

  $response['body'] = [
    'message' => $data
  ];
  send($response);
}
