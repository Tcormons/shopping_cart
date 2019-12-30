<?php

if ($request['method'] === 'GET') {

  $link = get_db_link();

  if (isset($request['query']['productId'])) {
    $productId = intval($request['query']['productId']);
    $validId = is_numeric($productId);
    if (!$validId) {
      throw new ApiError('The product Id is not valid', 400);
    }
    $query = "SELECT * FROM `products` WHERE productID = $productId";
    $sql = mysqli_query($link, $query);
    $data = (mysqli_fetch_assoc($sql));
  } else {
    $query = "SELECT productId, name, price, image, category, shortDescription FROM `products`";
    $sql = mysqli_query($link, $query);
    $data = (mysqli_fetch_all($sql, MYSQLI_ASSOC));
  }

  if ($data === null) {
    throw new ApiError('The product Id is not valid', 404);
  }

  $response['body'] = [
    'message' => $data
  ];
  send($response);
}
