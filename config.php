<?php

require_once 'dibi/dibi.php';

try {
  dibi::connect(array(
      'driver' => 'sqlite3',
  		'database' => 'kiosek'
  ));

} catch (DibiException $e) {
  echo get_class($e), ': ', $e->getMessage(), "\n";
}
    
