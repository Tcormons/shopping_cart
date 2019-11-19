<?php

if ($request['method'] === 'GET') {
  if (isset($request['query']['productId'])){
    $productId = intval($request['query']['productId']);
    $validId = is_numeric($productId);
    if (!$validId){
      throw new ApiError('The product Id is not valid', 400);
    }
    $query = "SELECT * FROM `products` WHERE productID = $productId";
  } else {
  $query = "SELECT productId, name, price, image, shortDescription FROM `products`";
  }

  $link = get_db_link();
  $sql = mysqli_query($link, $query);
  $data = (mysqli_fetch_all($sql, MYSQLI_ASSOC));

  if ($data === []) {
    throw new ApiError('The product Id is not valid', 404);
  }
  $response['body'] = [
    'message' => $data
  ];
  send($response);
}
