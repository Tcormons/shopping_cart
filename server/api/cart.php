<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  if (!$_SESSION['cart_id']) {
    $response['body'] = [];
    send($response);
  } else {
    $cartId = $_SESSION['cart_id'];
    $query = $link->query("SELECT cartItems.cartItemId AS id, products.productId, products.name, products.price, products.image, products.shortDescription
                                  FROM `cartItems` INNER JOIN `products`
                                  ON cartItems.productId = products.productId
                                  WHERE cartItems.cartId = $cartId");
  }
  $response = (mysqli_fetch_assoc($query));
  $response['body'] = $response;
  send($response);
}

if ($request['method'] === 'POST') {
  if (!$request['body']['productId']){
    throw new ApiError('This product Id is not valid', 400);
  } else {
    $productId = intval($request['body']['productId']);
    $priceQuery = $link->query("SELECT price FROM `products` WHERE products.productID = $productId");
    $price = (mysqli_fetch_assoc($priceQuery));
    $time = $link->query("INSERT INTO `carts`(createdAt) VALUES (CURRENT_TIMESTAMP)");
    $cartsInsertId = $link->insert_id;
    $cartItemsInsert = $link->query("INSERT INTO `cartItems`(cartId, productId, price) VALUES ($cartsInsertId, $productId, $price[price])");
    $cartItemsInsertId = $link->insert_id;
    $query = $link->query("SELECT cartItems.cartItemId AS id, products.productId, products.name, products.price, products.image, products.shortDescription
                                  FROM `cartItems` INNER JOIN `products`
                                  ON cartItems.productId = products.productId
                                  WHERE cartItems.cartItemId = $cartItemsInsertId");
}
    $response = (mysqli_fetch_assoc($query));
    $_SESSION['cart_id'] = $cartsInsertId;
    $response['body'] = $response;
    send($response);

}
