$(document).ready(
  function() {
    initMap(); 
  }
  );

var _ = Infinity;
var startFloor = 0;
var startNode = 3;

var finalNodeId = -1; //position in array
var startNodeId = -1; //position in array
var numberFloors;
var numNodes;
var edges;
var vertices;
var path;
var stairs = [];

function Map (){


  this.print_r = function(obj,t){
   
      // define tab spacing
      var tab = t || '';
  	
      // check if it's array
      var isArr = Object.prototype.toString.call(obj) === '[object Array]' ? true : false;
  	
      // use {} for object, [] for array
      var str = isArr ? ('Array\n' + tab + '[\n') : ('Object\n' + tab + '{\n');
   
      // walk through it's properties
      for(var prop in obj){
          if (obj.hasOwnProperty(prop)) {
              var val1 = obj[prop];
              var val2 = '';
              var type = Object.prototype.toString.call(val1);
              switch(type){
  			
                  // recursive if object/array
                  case '[object Array]':
                  case '[object Object]':
                      val2 = Map.print_r(val1, (tab + '\t'));
                      break;
  					
                  case '[object String]':
                      val2 = '\'' + val1 + '\'';
                      break;
  					
                  default:
                      val2 = val1;
              }
              str += tab + '\t' + prop + ' => ' + val2 + ',\n';
          }
      }
  	
      // remove extra comma for last property
      str = str.substring(0, str.length-2) + '\n' + tab;
  	
      return isArr ? (str + ']') : (str + '}');
  };
//  var var_dump = print_r; // equivalent function
  
  
  
  this.shortestPath = function(edges, numVertices, startVertex) {
    var done = new Array(numVertices);
    done[startVertex] = true;
    var pathLengths = new Array(numVertices);
    var predecessors = new Array(numVertices);
    for (var i = 0; i < numVertices; i++) {
      pathLengths[i] = edges[startVertex][i];
      if (edges[startVertex][i] != Infinity) {
        predecessors[i] = startVertex;
      }
    }
    pathLengths[startVertex] = 0;
    for (var i = 0; i < numVertices - 1; i++) {
      var closest = -1;
      var closestDistance = Infinity;
      for (var j = 0; j < numVertices; j++) {
        if (!done[j] && pathLengths[j] < closestDistance) {
          closestDistance = pathLengths[j];
          closest = j;
        }
      }
      done[closest] = true;
      for (var j = 0; j < numVertices; j++) {
        if (!done[j]) {
          var possiblyCloserDistance = pathLengths[closest] + edges[closest][j];
          if (possiblyCloserDistance < pathLengths[j]) {
            pathLengths[j] = possiblyCloserDistance;
            predecessors[j] = closest;
          }
        }
      }
    }
    return { "startVertex": startVertex,
             "pathLengths": pathLengths,
             "predecessors": predecessors };
  }
  
  this.constructPath = function(shortestPathInfo, endVertex) {
    var path = [];
    while (endVertex != shortestPathInfo.startVertex) {
      path.unshift(endVertex);
      
      endVertex = shortestPathInfo.predecessors[endVertex];
    }
    return path;
  }
  
  
  
  this.loadGraph = function(data) {
    //alert(data["vertices"][2]["id"]);
    var numVertices = data["vertices"].length;
    var numEdges = data["edges"].length;
  
    var matrix = [];
    
  
    for(var i=0; i < numVertices; i++){
      matrix[i] = new Array();
  
      for(var j=0; j < numVertices; j++){
        //console.log("%o, %o\n", i, j);
        matrix[i][j] = _;
        
        for(var k=0; k < numEdges; k++){
  //      alert(data["edges"][k]["from"]+"=="+ i +" && "+data["edges"][k]["to"]+"=="+j+"");
          if((data["edges"][k]["from"] == data["vertices"][i]["id"] && data["edges"][k]["to"] == data["vertices"][j]["id"]) || (data["edges"][k]["to"] == data["vertices"][i]["id"] && data["edges"][k]["from"] == data["vertices"][j]["id"])){ // neorientovany graf
            //spocti vzdalenost
            x = Math.abs(data["vertices"][i]["x"]-data["vertices"][j]["x"]);
            y = Math.abs(data["vertices"][i]["y"]-data["vertices"][j]["y"]);
          //alert(x+" "+y);
            matrix[i][j] = Math.round(Math.sqrt(x*x+y*y));
  
  //          alert(matrix[i][j]);
          }
        }
      }
      
    }
    
    //alert(matrix);
  //  console.log("%o", print_r(matrix));
    return matrix;
  }
  
  
  
  
  this.loadStairs = function() {
    stairs[0] = new Array();
    stairs[1] = new Array();
    // stairs id | floor = node id
    stairs[0][0] = 5;
    stairs[0][1] = 8;
    stairs[0][2] = 11;
    
    stairs[1][0] = 15;
    stairs[1][2] = 13;
  }

  
  
  
  
  
  



// Example //////////////////////////////////////////////////////////////////

// The adjacency matrix defining the graph.
/*var e = [
  [ _, _, 1, _, _, _, _ ],
  [ _, _, 2, _, _, _, _ ],
  [ 1, 2, _, 8, _, _, _ ],
  [ _, _, 8, _, _, 2, _ ],
  [ _, _, _, _, _, 4, _ ],
  [ _, _, _, 2, 4, _, 6 ],
  [ _, _, _, _, _, 6, _ ]
];*/

this.addPoint = function(context, x, y) {
  context.closePath();

  context.beginPath();
  context.arc(x, y, 6, 0, 2 * Math.PI, false);
  context.fillStyle = '#ff0000';
  context.fill();
  context.strokeStyle = '#000';
  context.stroke();
  context.stroke();
  context.closePath();
  
  context.beginPath();
  context.strokeStyle = '#ff0000';
}


this.createCanvas = function(floor, step) {
  //canvas
//   alert(floor);
  var moveTo;
  var canvas = document.getElementById('floor'+floor+'-canvas');
  var context = canvas.getContext('2d');
  context.clearRect (0, 0, 800, 800);
  context.lineWidth = 4;
  context.strokeStyle = '#ff0000';
  context.beginPath();
  
  if(step==0)
    moveTo = startNodeId;
  else
    moveTo = p;
  context.moveTo(vertices[moveTo]["x"], vertices[moveTo]["y"]);
  Map.addPoint(context, vertices[moveTo]["x"],vertices[moveTo]["y"]);
  context.moveTo(vertices[moveTo]["x"], vertices[moveTo]["y"]);
  
  if(startFloor == floor){
    var img = new Image(); //creates a variable for a new image
    img.src = "images/you-are-here-icon.png"; // specifies the location of the image
    
    img.onload = function(){
      context.drawImage(img,vertices[moveTo]["x"]-20,vertices[moveTo]["y"]-40); // draws the image at the specified x and y location
    }
  }
    
  for(var i=step; i<path.length; i++){
    p = path[i];
    for(var j=0; j< stairs.length; j++){
      if(vertices[p]["id"] == stairs[j][floor]){
        for(var k=0; k< stairs[j].length; k++){ //for all floors stairs which stairs go
          if(path[i+1]!=null && stairs[j][k] == vertices[path[i+1]]["id"]){ //are we meeting stairs?
            context.lineTo(vertices[p]["x"], vertices[p]["y"]);
            context.stroke();
            Map.addPoint(context, vertices[p]["x"],vertices[p]["y"]);
            Map.createCanvas(k, i);
  
            return 1;
          }
        }
      }      
    }
      //alert(n[p]['x']+", "+n[p]['y']);
    context.lineTo(vertices[p]["x"], vertices[p]["y"]);

    //  context.strokeRect(n[p]["x"]-2,n[p]["y"]-2,4,4);
    context.stroke();

  }
  Map.addPoint(context, vertices[p]["x"],vertices[p]["y"]);


}






this.floorsCanvasClean = function() {
  for(var floor=0; floor < numberFloors; floor++){
    var canvas = document.getElementById('floor'+floor+'-canvas');
    var context = canvas.getContext('2d');
    context.clearRect (0, 0, 800, 800);
  }
}

this.mainControl = function(finalNode) {

var data = {"vertices":[{"id":3,"value":"","x":118,"y":285},{"id":4,"value":"","x":141,"y":290},{"id":5,"value":"","x":168,"y":315},{"id":6,"value":"","x":454,"y":336},{"id":7,"value":"","x":453,"y":356},{"id":8,"value":"","x":180,"y":309},{"id":9,"value":"","x":216,"y":313},{"id":10,"value":"","x":214,"y":348},{"id":11,"value":"","x":180,"y":323},{"id":12,"value":"","x":337,"y":330},{"id":13,"value":"","x":344,"y":289},{"id":14,"value":"","x":353,"y":268},{"id":15,"value":"","x":329,"y":280},{"id":16,"value":"","x":489,"y":286},{"id":17,"value":"","x":466,"y":330},{"id":18,"value":"","x":490,"y":344}],"edges":[{"id":11,"value":"","from":3,"to":4,"directed":false},{"id":12,"value":"","from":4,"to":5,"directed":false},{"id":13,"value":"","from":5,"to":6,"directed":false},{"id":14,"value":"","from":6,"to":7,"directed":false},{"id":15,"value":"","from":5,"to":5,"directed":false},{"id":16,"value":"","from":5,"to":8,"directed":false},{"id":17,"value":"","from":8,"to":9,"directed":false},{"id":18,"value":"","from":9,"to":10,"directed":false},{"id":19,"value":"","from":5,"to":11,"directed":false},{"id":20,"value":"","from":11,"to":12,"directed":false},{"id":21,"value":"","from":12,"to":13,"directed":false},{"id":22,"value":"","from":13,"to":14,"directed":false},{"id":23,"value":"","from":8,"to":11,"directed":false},{"id":24,"value":"","from":4,"to":15,"directed":false},{"id":25,"value":"","from":15,"to":13,"directed":false},{"id":26,"value":"","from":16,"to":13,"directed":false},{"id":27,"value":"","from":16,"to":17,"directed":false},{"id":28,"value":"","from":17,"to":12,"directed":false},{"id":29,"value":"","from":17,"to":18,"directed":false}],"x":0,"y":0};

//3 floors
//var data = {"vertices":[{"id":3,"value":"","x":118,"y":285},{"id":4,"value":"","x":141,"y":290},{"id":5,"value":"","x":168,"y":315},{"id":6,"value":"","x":454,"y":336},{"id":7,"value":"","x":453,"y":356},{"id":8,"value":"","x":180,"y":309},{"id":9,"value":"","x":216,"y":313},{"id":10,"value":"","x":214,"y":348},{"id":11,"value":"","x":180,"y":323},{"id":12,"value":"","x":337,"y":330},{"id":13,"value":"","x":344,"y":289},{"id":14,"value":"","x":353,"y":268}],"edges":[{"id":11,"value":"","from":3,"to":4,"directed":false},{"id":12,"value":"","from":4,"to":5,"directed":false},{"id":13,"value":"","from":5,"to":6,"directed":false},{"id":14,"value":"","from":6,"to":7,"directed":false},{"id":15,"value":"","from":5,"to":5,"directed":false},{"id":16,"value":"","from":5,"to":8,"directed":false},{"id":17,"value":"","from":8,"to":9,"directed":false},{"id":18,"value":"","from":9,"to":10,"directed":false},{"id":19,"value":"","from":5,"to":11,"directed":false},{"id":20,"value":"","from":11,"to":12,"directed":false},{"id":21,"value":"","from":12,"to":13,"directed":false},{"id":22,"value":"","from":13,"to":14,"directed":false},{"id":23,"value":"","from":8,"to":11,"directed":false}],"x":0,"y":0}


//  var data = {"vertices":[{"id":1,"value":1,"x":141,"y":290},{"id":3,"value":3,"x":200,"y":282},{"id":4,"value":4,"x":338,"y":284},{"id":103,"value":"","x":203,"y":253},{"id":104,"value":"","x":333,"y":329},{"id":110,"value":"","x":453,"y":285},{"id":111,"value":"","x":454,"y":334},{"id":112,"value":"","x":493,"y":291},{"id":113,"value":"","x":489,"y":333},{"id":114,"value":"","x":457,"y":349},{"id":121,"value":"","x":159,"y":318},{"id":122,"value":"","x":214,"y":343},{"id":123,"value":"","x":175,"y":340},{"id":124,"value":"","x":150,"y":340},{"id":125,"value":"","x":132,"y":312},{"id":108,"value":"","x":215,"y":322},{"id":112,"value":"","x":148,"y":262},{"id":114,"value":"","x":122,"y":266}],"edges":[{"id":7,"value":"","from":1,"to":3,"directed":false},{"id":8,"value":"","from":3,"to":4,"directed":false},{"id":105,"value":"","from":103,"to":3,"directed":false},{"id":106,"value":"","from":104,"to":4,"directed":false},{"id":115,"value":"","from":4,"to":110,"directed":false},{"id":116,"value":"","from":110,"to":111,"directed":false},{"id":117,"value":"","from":112,"to":110,"directed":false},{"id":118,"value":"","from":113,"to":111,"directed":false},{"id":119,"value":"","from":114,"to":111,"directed":false},{"id":120,"value":"","from":111,"to":104,"directed":false},{"id":103,"value":"","from":121,"to":1,"directed":false},{"id":104,"value":"","from":121,"to":123,"directed":false},{"id":105,"value":"","from":121,"to":124,"directed":false},{"id":106,"value":"","from":1,"to":125,"directed":false},{"id":109,"value":"","from":121,"to":108,"directed":false},{"id":110,"value":"","from":108,"to":104,"directed":false},{"id":111,"value":"","from":122,"to":108,"directed":false},{"id":113,"value":"","from":1,"to":112,"directed":false},{"id":115,"value":"","from":1,"to":114,"directed":false}],"x":0,"y":0}
  
  
  
  numberFloors = $('.floor').length;
  numNodes = data["vertices"].length;
  edges = Map.loadGraph(data);
  vertices = data["vertices"];
  Map.loadStairs();

  console.log("%o", Map.print_r(data["edges"]));

  
//  console.log("%o", Map.print_r(edges));
  
  console.log("%o", Map.print_r(vertices));
  /*var n = {
    0: {"x": [50], "y": [50]},
    1: {"x": [100], "y": [0]},
    2: {"x": [100], "y": [50]},
    3: {"x": [150], "y": [50]},
    4: {"x": [100], "y": [100]},
    5: {"x": [150], "y": [100]},
    6: {"x": [200], "y": [100]},
  };*/
  
  
  
  
  
  
  
  

  
  //conversion to node id from array id

  for(var i = 0; i < data["vertices"].length; i++) {
    if(data["vertices"][i]["id"] == finalNode)
      finalNodeId = i;
    if(data["vertices"][i]["id"] == startNode)
      startNodeId = i;
  }
  if(finalNodeId == -1){
    alert("node neexistuje");
    finalNodeId = startNodeId;
  }


  // Compute the shortest paths from vertex number 1 to each other vertex
  // in the graph.
  var shortestPathInfo = Map.shortestPath(edges, numNodes, startNodeId);


  // Get the shortest path from vertex 1 to vertex 6.
  path = Map.constructPath(shortestPathInfo, finalNodeId);
  //alert(path);
  //2356
  
  
  
  Map.floorsCanvasClean();
  Map.createCanvas(startFloor, 0);


}





}


function initMap() {
  Map = new Map();
  $('#finalNodeButton').click(function (){
    var finalNode = $('#finalNode').val();
    
    Map.mainControl(finalNode);
    
        
  });
}