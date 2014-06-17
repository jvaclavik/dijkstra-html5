
$(document).ready(
  function() {
    init(); 
  }
  );

var timeout = 0;
var sec = 61;
var max_sec = 61;



function Communicate (){
  this.getData = function (id, type){
    $.ajax({
      url: 'getData.php?id='+id+'&type='+type+'',
      type: 'get',
      dataType: 'json',
      success: function(data) {
        if(type == "shops"){
          $("#shop-detail .name").text(data.name);
          $("#shop-detail .desc").text(data.desc);
          $("#shop-detail .logo").text(data.logo);
          if(data.logo != "")
            $("#shop-detail .logo").html("<img src='"+data.logo+"' alt=''>");
          $("#shop-detail .web").text(data.web);
          $("#shop-detail .email").text(data.email);
          $("#shop-detail .phone").text(data.phone);
          $("#navigate").attr("href", data.nodeId);
        } else if(type == "news"){
          $("#news-detail .name").text(data.name);
          $("#news-detail .desc").text(data.desc);
          if(data.image != "")
            $("#shop-detail .image").html("<img src='."+data.image+"' alt=''>");
        }
      },
      async: false
    });
  }
}



function Index (){
	$(".shop-list").mCustomScrollbar();
	$(".news-scroll").mCustomScrollbar({
    //horizontalScroll:true
  });

  $('.gallery a').lightBox();
  
  this.panelEject = function (){
    $('#panel').click(function (){
      $("#panel #navigation, #oc-logo").hide("fast");
      $("#close, #timeout, #tabs").show("fast");
      $("#panel").animate({height:890},300);
      $("#ad").animate({height:930},300);
      return false;
    });
    $('#close').click(function (){
      $("#close, #timeout, #panel .section,  #tabs").hide("fast");
      $("#panel #navigation, #oc-logo").show("fast");
      $("#panel").animate({height:250},300);
      $("#ad ").animate({height:1670},300);


      clearInterval(timeout);
      timeout = 0;
      return false;
    });

  }
  
  this.navigation = function (){
    $('#panel button').click(function (){
      var idSection = $(this).attr("class");
      $("#panel .section").hide("fast");
      $("#tabs div").addClass("inactive");
      $(".section").removeClass().addClass("section");
      $("#tabs ."+idSection+" div").removeClass().addClass("active");
      $("#"+idSection).show("fast");
      
      $(".shop-link").removeClass().addClass("shop-link");
      $(".shop-list").mCustomScrollbar("update");
      $(".news-scroll").mCustomScrollbar("update");


    });
  }

  this.timeoutClosePanel = function (){
    sec = max_sec;
    timeout = setInterval(function() {
      sec--;
      $('#timeout span').text(sec);
      if(sec == 0){
        $('#close').trigger('click');            
      }
    }, 1000);

  }

  this.timeoutClickHandler = function (){
    $('*:not(#close)').click(function (){
      if(timeout == 0){  
        Index.timeoutClosePanel();
      } else{
        clearInterval(timeout);
        timeout = 0;
        Index.timeoutClosePanel();

      }
    
    });
  }

  this.shops = function (){
    $('.shop-link').click(function (){
      var idShop = $(this).attr("href");
      $("button.shop-detail").show();
      $("#shop-detail").show();
      $("#shop-detail").addClass("left");
      $("#shops").addClass("right");
      $(".shop-link").removeClass().addClass("shop-link");
      $(this).addClass("active");
      C = new Communicate();
      C.getData(idShop, "shops");
    });
  }
  
  this.shopDetail = function (){
    $('button.shop-detail').click(function (){
      $("#shop-detail").removeClass().addClass("section");
      $("#shops").hide();
      $("button.shop-detail").hide();
    });
  }

  this.newsDetail = function (){
    $('.news-link').click(function (){
      var idNews = $(this).attr("href");
      $("#panel .section").hide("fast");
      $("#news-detail").show("fast");
      C = new Communicate();
      C.getData(idNews, "news");
//      $("#shop-detail > h2").text(idShop);
    });
  }
  
  this.navigateToShop = function (){
    $('#navigate').click(function (){
      var idNode = $(this).attr("href");
      $("#panel .section").hide("fast");
      $("#map").show("fast");
      $("#tabs div").addClass("inactive");
      $("#tabs .map div").removeClass().addClass("active");
      
      Map.mainControl(idNode);
    });
  }

  this.htmlMap = function (){
    $('#html-map area').click(function (){
      var idShop = $(this).attr("href");

      $("#panel .section").hide("fast");
      $("#shop-detail").show("fast");
      C = new Communicate();
      C.getData(idShop, "shops");


    });
  }

}
function init() {

  Index = new Index();
  Index.panelEject();
  Index.navigation();
  Index.timeoutClickHandler();
  Index.shops();
  Index.shopDetail();
  Index.newsDetail();
  Index.navigateToShop();
  Index.htmlMap();
}