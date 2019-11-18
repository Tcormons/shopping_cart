<?php

if ($request['method'] === 'GET') {
  $link = get_db_link();
  $message = get_product_data($link);
  $response['body'] = [
    'message' => $message
  ];
  send($response);
}

function get_product_data($link)
{
  $query = "SELECT productId, name, price, image, shortDescription FROM `products`";
  $sql = mysqli_query($link, $query);
  $data = (mysqli_fetch_all($sql));
  return $data;
}
