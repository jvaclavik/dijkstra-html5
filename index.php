<?php
require_once 'config.php';

$shops = dibi::query('SELECT * FROM [shops]')->fetchAll();
$news = dibi::query('SELECT * FROM [news]')->fetchAll();
$shopCategories = dibi::query('SELECT * FROM [shop_categories]')->fetchAll();
  
  
?>

<!DOCTYPE html> 
<head>
<meta charset="utf-8" />
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
<link href="stylesheets/jquery.lightbox-0.5.css" media="screen" rel="stylesheet" type="text/css" />
<link href="stylesheets/site.css" media="screen" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="stylesheets/jquery.mCustomScrollbar.css" />

<script src="javascripts/jquery.js" type="text/javascript"></script>
<script src="javascripts/jquery.lightbox-0.5.min.js" type="text/javascript"></script>
<script src="javascripts/jquery.mCustomScrollbar.concat.min.js"></script>

<script src="javascripts/script.js" type="text/javascript"></script>
<script src="javascripts/map.js" type="text/javascript"></script>


<title></title>
</head>
<body>
<div id="main">
  <div id="ad">
    <span id="banner">
      <img src="images/bubbles.jpg" alt="reklama">
    </span>
  </div>
  <a id="close" href="#"></a>
  <span id="timeout"><span></span></span>
  <div id="panel">
    <div id="inside">

      <img src="images/oc-logo.png" alt="" id="oc-logo">
      <div id="navigation">
        <button class="shops"><img src="images/button-shops.png" alt=""></button>
        <button class="news"><img src="images/button-news.png" alt=""></button>
        <button class="map"><img src="images/button-map.png" alt=""></button>
      </div>
      <div id="big">
        <div id="tabs">
          <button class="shops"><div class="inactive"><img src="images/icon-shops.png" alt=""><span>Seznam obchodů</span></div></button>
          <button class="news"><div class="inactive"><img src="images/icon-news.png" alt=""><span>Akce</span></div></button>
          <button class="map"><div class="inactive"><img src="images/icon-map.png" alt=""><span>Mapa</span></div></button>
  
        </div>
        <div id="white">
          <div id="shops" class="section">
            <div class="shop-list scrollbar">
              <?php 
              for($i=0; $i < count($shopCategories); $i++) { 
                $shopCategory = $shopCategories[$i];
                
                 //if(count($shopCategories)/2 < $i) 
                ?>  
                  <div class="category">
                    <h2><?php echo $shopCategory["name"] ?></h2>
                    <ul>
                      <?php foreach($shops as $shop) {  ?>
                        <?php if($shopCategory["id"] == $shop["category"]) { ?>
                          <li><a href="<?php echo $shop["id"] ?>" class="shop-link"><?php echo $shop["name"] ?></a></li>      
                        <?php } ?>
                      <?php } ?>
                    </ul>
                  </div>
                <?php } ?>  
            </div>
          </div>
          <div id="shop-detail" class="section">
            <div>
              <h2 class="name"></h2>
              <div class="desc"></div>
              <div class="web"></div>
              <div class="logo"></div>
              <div class="email"></div>
              <div class="phone"></div>
              <div class="gallery">
                <!--<a href="images/and.png"><img src="images/and.png" alt="" /></a>-->
              </div>
              <a href="" id="navigate" class="map"><img src="images/button-navigate.png" alt=""></a>  
              <!--<button class="shops"><img src="images/button-back.png" alt=""></button>-->
              <button class="shop-detail"><img src="images/button-detail.png" alt=""></button>
            </div>
          </div>
    
          <div id="map" class="section">
            <!--<button class="my-position">Zpět na moji pozici</button>  -->
     &nbsp;
            <!--<div>
              <input type="text" id="finalNode">
              <input type="submit" id="finalNodeButton">
            </div>-->
            <div class="map-content">
              <div id="floor0" class="floor">
                <h2>Přízemí</h2>
                <img src="images/mapa.jpg" style="position: absolute;">
                <canvas id="floor0-canvas" width="800" height="800" style="position: absolute; margin-top: -25px; opacity: 1"></canvas>
                <img src="images/mapa.jpg" style="position: absolute; opacity: 0.01" usemap="#html-map">
              </div>
      
              <div id="floor1" class="floor">
                <h2>1. patro</h2>
                <img src="images/mapa.jpg" style="position: absolute;">
                <canvas id="floor1-canvas" width="800" height="800" style="position: absolute; margin-top: -25px; opacity: 1"></canvas>
                <img src="images/mapa.jpg" style="position: absolute; opacity: 0.01">
              </div>
      
              <div id="floor2" class="floor">
                <h2>2. patro</h2>
                <img src="images/mapa.jpg" style="position: absolute;">
                <canvas id="floor2-canvas" width="800" height="800" style="position: absolute; margin-top: -25px; opacity: 1"></canvas>
                <img src="images/mapa.jpg" style="position: absolute; opacity: 0.01">
              </div>
      
              <map name="html-map" id="html-map">
              <area shape="poly" coords="483,294,489,294,502,311,534,311,536,331,556,336,551,397,495,396,497,355,478,353" href="1">
              <area shape="poly" coords="486,255,484,289,492,289,504,310,554,310,563,255"  href="2">
              <area shape="poly" coords="100,71,225,71,226,132,325,132,329,249,178,248,171,227,125,229,124,209,111,209,110,164,103,164"  href="3">
              </map>
            <div class="both"></div>
            
            </div>
    
    
          </div>
          
          <div id="news" class="section">
            <div class="news-scroll scrollbar">
              <table>
                <tr valign="top">
                  <?php 
                  for($i=0; $i < count($news); $i++) { 
                    $n = $news[$i];
                    if(($i+1) % 2 == 1)
                      echo "<td>";
                    ?>
                      
                        <a href="<?php echo $n["id"] ?>" class="news-link">
                          <img src="<?php echo $n["image"] ?>" alt="">
                          <div>
                            <span><?php echo $n["name"] ?></span>
                          </div>
                        </a>
                    
      
                    <?php 
                    if(($i+1) % 2 == 0 || (($i+1) % 2 == 1 && ($i+1) == count($news)))
                      echo "</td>";
                  } 
                  ?>
                </tr>
              </table>
            </div>
          </div>
          <div id="news-detail" class="section">
            <div>
              <h2 class="name"></h2>
              <div class="image"></div>
              <div class="desc"></div>
              <button class="news"><img src="images/button-back.png" alt=""></button>
            </div>
            <div class="both"></div>
          </div>
          <div class="both"></div>
        </div>
  
      </div>  
    </div>
  </div>
</div>

</body>
</html> 
