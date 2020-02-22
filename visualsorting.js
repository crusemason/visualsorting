//global array holding Bar objects
var gBars = [];


//used in bubble sort
//current max index
var gMax = 0;

var oldGame = false;

//# of ele in sorted list
var gFinished = 0;

//used in findmin for selection sort
//current min index
var minIndex = 0;

//# of ele to sort
var N = 25;

//Delay
var SPEED = 500;


function Bar(index, height){
    this.index = index;
    this.height = height;
    this.isIndex = false;
    this.isSorted = false;
    this.isMin = false;

    this.getIndex = function(){
        console.log(this.index);
    };

    this.getHeight = function(){
        console.log(this.height);
    };

    this.getStats = function(){
        console.log(this.index + ' ' + this.height);
    }

    this.setHeight = function(h){
        this.height = h;
    }

    this.setIndex = function(i){
        this.index = i;
    }
}

function insertAfter(newNode, referenceNode){
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function setHeight(i, h){
    document.getElementById(i).style.height = h + 'em';
}

function addBar(i, h){
    //first bar
    if(i === 0){
        var currentDiv = document.getElementById("root");
        d = document.createElement('div');
        d.setAttribute("id", 'block'+i);
        d.setAttribute("class", 'block');
        gBars[i] = new Bar(i, h);
        currentDiv.appendChild(d);
        setHeight('block'+i,h);
    }
    else {
        let last = i-1;
        var currentDiv = document.getElementById('block'+last);
        d = document.createElement('div');
        d.setAttribute("id", 'block'+i);
        d.setAttribute("class", 'block');
        gBars[i] = new Bar(i, h);
        insertAfter(d, currentDiv);
        setHeight('block'+i,h);
    }
}


function selectionsort(index) {
    let min = gBars[0].height;
    let i = index;
    min = setTimeout(findMin(i, min), SPEED);
    return;

    
}

function findMin(i, min) {
  console.log("Next loop: " + i);

    if(i == gFinished){

    var last = document.getElementById('block'+N);
    last.style.backgroundColor = 'grey';
    }
    if(i > 0){
        if(gBars[i-1].isMin == false && gBars[i-1].isSorted == false){

            var oldSelected = document.getElementById('block'+(i-1));
            oldSelected.style.backgroundColor = 'grey';
        }
        if(gBars[i].isMin == false && gBars[i-1].isSorted == false){
            var indexSelected = document.getElementById('block'+i);
            indexSelected.style.backgroundColor = 'yellow';
        }
    }
  if(min > gBars[i].height) {

      gBars[minIndex].isMin = false;
      var oldMinIndex = document.getElementById('block'+minIndex);
      oldMinIndex.style.backgroundColor = 'grey';
      min = gBars[i].height;
      minIndex = i;
      var selected = document.getElementById('block'+i);
      selected.style.backgroundColor = "#4c8bf5";
      gBars[i].isMin = true;
      console.log('new min ' + min);
      var finishedSelected = document.getElementById('block'+gFinished);
      finishedSelected.style.backgroundColor = 'red';
  }
  i++;
  if (i == (N+1)) {
    let start1 = document.getElementById('block'+gFinished);
           start1.style.backgroundColor = '#32cd32';
              

    if(min == gBars[gFinished].height){
       gBars[gFinished].isSorted = true;
       gFinished++;
       if(gFinished == (N+1)){
        return;
       }

       min = gBars[gFinished].height;
    return findMin(gFinished, min);
    }
    console.log("End");
    let selected1 = document.getElementById('block'+minIndex);
    let tempstyleheight = gBars[gFinished].height + 'em';
    start1.style.height = gBars[minIndex].height + 'em';
    selected1.style.height = tempstyleheight;
    let temp = gBars[minIndex].height;
    gBars[minIndex].height = gBars[gFinished].height;
    gBars[gFinished].height = temp;
    selected1.style.backgroundColor = 'grey';
    start1.style.backgroundColor = '#32cd32';
    gBars[gFinished].isSorted = true;

    gFinished++;
    min = gBars[gFinished].height;
    return findMin(gFinished, min);
  } else {
    setTimeout(function(){
      return findMin(i, min);
    },SPEED)
  }
}



function bub(index) {
    let min = gBars[0].height;
    var delay = 500;
    let i = index;
    min = setTimeout(bubbletime(i, min), delay);
    return min;
}


function bubbletime(i, min) {
  console.log("Next loop: " + i);
  var firstEle = document.getElementById('block'+0);
  firstEle.style.backgroundColor = 'grey';
  var selected = document.getElementById('block'+i);
  var selected1 = document.getElementById('block'+(i+1));
  if(gBars[i].height > gBars[i+1].height) {
    if(gMax == 0){
        gMax = i+1;
         if(!gBars[gMax].isSorted){
             let maxSelected = document.getElementById('block'+gMax);
             maxSelected.style.backgroundColor = 'blue';
      }
    }
    else{
      if(!gBars[gMax].isSorted){
         let oldMaxSelected = document.getElementById('block'+gMax);
         oldMaxSelected.style.backgroundColor = 'grey';
      }
   
      gMax = i+1;
      if(!gBars[gMax].isSorted){
             let maxSelected = document.getElementById('block'+gMax);
             maxSelected.style.backgroundColor = 'blue';
      }
    }
      //swap
      selected1.style.height = gBars[i].height + 'em';
      selected.style.height = gBars[i+1].height + 'em'
      let temp = gBars[i].height;
      gBars[i].height = gBars[i+1].height;
      gBars[i+1].height = temp;
  }
  else{
    if(gMax == 0){
         gMax = i;
         if(!gBars[gMax].isSorted){
             let maxSelected = document.getElementById('block'+gMax);
             maxSelected.style.backgroundColor = 'blue';
      }

    }
    else{
       if(!gBars[gMax].isSorted){
         let oldMaxSelected = document.getElementById('block'+gMax);
         oldMaxSelected.style.backgroundColor = 'grey';
      }
      gMax = i;
       if(!gBars[gMax].isSorted){
             let maxSelected = document.getElementById('block'+gMax);
             maxSelected.style.backgroundColor = 'blue';
      }
    }
  }
  i++;
  if (i == N) {
      console.log("End");
      gFinished++;
      var finished = document.getElementById('block'+N);
      gBars[N].isSorted = true;
      finished.style.backgroundColor = 'green';
      N--;
      if(N==0){
        let last = document.getElementById('block'+0);
        last.style.backgroundColor = 'green';
        return;
      }

      i = 0;
      return bubbletime(i, min);
  } else {
      setTimeout(function(){
        return bubbletime(i, min);
      },SPEED)
  }
}


//reloads page and deletes old graph
function reset(){
   for(let i=0; i<N; i++){
  delete gBars[i];
 }
  location.reload();
return false;
}

//returns sorting algorithm
function whatAlgorithm(){
   var selsort = document.getElementById("selectionsort");
   var bubsort = document.getElementById("bubblesort");
   if(selsort.checked){
        sort = selectionsort(0);
    }
    else if(bubsort.checked){
        sort = bub(0);
    }else{
	//default selectionsort
	sort = selectionsort(0);
    }
    return sort;
}

function getAllStats(){
   for(let i=0; i<=N; i++){
        gBars[i].getStats();
    }
}

//adds bars to root div
function buildGraph(){
    for(let i=0; i<=N; i++){
        let ran = Math.floor(Math.random() * 35 + 1);
        gBars[i] = new Bar(i,ran);
        addBar(i,ran);
    }
   
}
function init(){
    //clear old graph before starting new graph
    //if reset has not been clicked and new game
    //has started then treat start as reset
    if(oldGame == true){
        oldGame = false;
        reset();
    }
    else{
      oldGame = true;
    }


    buildGraph();
    let sort = whatAlgorithm;
    setTimeout(sort,500);
}


function foo(){
    setTimeout(function(){
    console.log('foo');
for (let i=0; i<=N; i++){
    console.log(' ', gBars[i].height);
}

    }, 10000);
}



