<?php

require_once 'config.php';

Class GetData {
  private $editPass;

  function __construct($id, $type) {
    header('Content-type: application/json');
    if($type == "shops"){
      $result = dibi::query('SELECT * FROM [shops] WHERE [id]=%s' ,$id);
    } else if($type == "news"){
      $result = dibi::query('SELECT * FROM [news] WHERE [id]=%s', $id);
    }
    $all = $result->fetchAll();
    
    if(isset($all[0])){  
      $data = $all[0];
            echo json_encode($data);
  
      }
    
    
  }
}

$LoadData = new GetData($_GET["id"], $_GET["type"]);
