var acrd = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acrd.length; i++) {
  acrd[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
var d=new Date();
var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();

var nhour=d.getHours(),nmin=d.getMinutes();
if(nmin<=9) nmin="0"+nmin

document.getElementById('clockbox').innerHTML=""+tmonth[nmonth]+" "+ndate+", "+nyear+"<br> "+nhour+":"+nmin+"";
}

window.onload=function(){
GetClock();
setInterval(GetClock,1000);
}
