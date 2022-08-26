window.addEventListener('load', (event) => {
var colorArr = [];
var p = document.getElementById("cont");
var colorBox = document.getElementById("colorBox");
var colorLabel = document.getElementById("colorLabel");
var max = 255; //max element in meter
//create items
for (var i = 1; i <= max; i++)
{
  var child = document.createElement("div");
  child.innerHTML = i;
  child.style.top = ((i * 30) -30)+ "px";
  child.setAttribute('id', i);
  p.appendChild(child);

}
//add listeners to buttons
document.getElementById('start').addEventListener('click', spin);
document.getElementById('select').addEventListener('click', select);
// document.getElementById('stop').addEventListener('click', select);
document.getElementById('reset').addEventListener('click', resetColor);
//set up interval id so that in future timer can be stopped
var intervalId=null,randomNum=null;
var curNum = null;
var spinning = false;
//spin function
function spin() 
{
  if (spinning) {
    return;
  } else {
    spinning = true;

	randomNum=null;
  intervalId=setInterval(function() 
  {
    var temp = 1;
    //decrease top value of each item by 5px; can by any number to make fast or slow
    for (var i = 1; i <= max; i++) 
    {
      var item = document.getElementById("" + i); //get item by its id 0-max
      var itemTop = (parseInt(item.style.top)); //get item top in integer
      item.style.top = (itemTop - 5) + "px"; //update top value
      itemTop = (parseInt(item.style.top));//get updated value
      if (itemTop < -30) //place element at last if below -30px
      {
        item.style.top = ((max - temp) * 30) + "px";
        temp++;
      }
      // If 60px from top, then it's the selected value
      if(itemTop==60) {
        curNum = i;
      }
    }
  }, 1);
  }
}

function select()
{  
  clearInterval(intervalId);
  spinning = false;
  console.log(curNum);
  colorArr.push(curNum);
  colorLabel.innerHTML = colorArr;
  spin();
  if (colorArr.length == 3) {
    clearInterval(intervalId);
    spinning = false;
    colorBox.style.backgroundColor = "rgb("+colorArr[0]+","+colorArr[1]+","+colorArr[2]+")";
  }

}

function resetColor()
{
  clearInterval(intervalId);
  spinning = false;
  colorArr = [];
  colorLabel.innerHTML = "";
  colorBox.style.backgroundColor = "rgb(255,255,255)";
}

});