$('#simpleform').on('submit',function(e){
  e.preventDefault();
  $('#submit').click();
});


var bdayContentDiv = $("#bdays");
var colCount = 36;
var rowCount = 30;

var screenwidth = $(window). width(); 
if (screenwidth < 641){
  colCount = 12;
  rowCount = 90;
}
else if (screenwidth > 640 && screenwidth < 1025){
  colCount = 24;
  rowCount = 45;
}
else {
  colCount = 36;
  rowCount = 30;
}
var currentYear = new Date().getFullYear();
var currentMonth = (new Date().getMonth()+1);
var currentDay = new Date().getDate();

$(document).ready(function(e) {
  document.addEventListener("keydown", keyDownTextField, false);
  $(".fullscreen-container").fadeTo(200, 1);
  createCalender(0,30,36);
});

function keyDownTextField(e) {
  var keyCode = e.keyCode;
  if(keyCode==13) {
    $('#simpleform').submit();
  }
}

window.onresize = function(event) {
   var monthvalue = '36';
  var yearvalue = '3';
   var colvalue = '36';
  var rowvalue = '30';
    var screenwidth = $(window). width(); 
  if (screenwidth < 641){
    monthvalue = '12';
    yearvalue = '1';
    colvalue = '12';
    rowvalue = '90';
  }
  else if (screenwidth > 640 && screenwidth < 1025){
    monthvalue = '24';
    yearvalue = '2';
    colvalue = '24';
    rowvalue = '45';
  }
  else {
    monthvalue = '36';
    yearvalue = '3';
     colvalue = '36';
    rowvalue = '30';
  }
  bdayContentDiv.html('');
  var userdate = $('#dtdateofbirth').val();   
  var newuserdate = new Date(userdate);
  var currentDay = new Date();
  var newcurrentDay = new Date(currentDay);
  var totalmonth = monthDiff  (userdate , currentDay);   
  createCalender(totalmonth,colvalue,rowvalue);
  document.getElementById('monthvalue').innerHTML = monthvalue ;
  document.getElementById('yearvalue').innerHTML = yearvalue ;
 
};
function toDate(dateStr){
  var parts = dateStr.split('-');
  return new Date(parts[2], parts[1] - 1, parts[0])
}

$(document).on('click', '#submit', function(e) {
  var userdate = $('#dtdateofbirth').val();  
  var newuserdate =  toDate(userdate);
  var currentDay = new Date();
  var newcurrentDay = new Date(currentDay);
 
  var dateOneNewuser = new Date(newuserdate.getFullYear(), newuserdate.getMonth(), newuserdate.getDate()); //Year, Month, Date    
  var dateTwoCurrent = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()); //Year, Month, Date  
  var totalmonth = monthDiff(dateOneNewuser , dateTwoCurrent);   

  var monthvalue = '36';
  var yearvalue = '3';

   var colvalue = '36';
  var rowvalue = '30';

  var screenwidth = $(window). width(); 
  if (screenwidth < 641){
    monthvalue = '12';
    yearvalue = '1';
     colvalue = '12';
    rowvalue = '90';
  }
  else if (screenwidth > 640 && screenwidth < 1025){
    monthvalue = '24';
    yearvalue = '2';
    colvalue = '24';
    rowvalue = '45';
  }
  else {
    monthvalue = '36';
    yearvalue = '3';
     colvalue = '36';
    rowvalue = '30';
  }
  document.getElementById('monthvalue').innerHTML = monthvalue ;
  document.getElementById('yearvalue').innerHTML = yearvalue ; 
 // debugger;
  var x = document.forms["myForm"]["dtdateofbirth"].value;     
  if (x == "" || x == null) {             
    $(".modal").modal("toggle");   
    document.getElementById("model-body").innerText = "Please enter Date of birth"           
    return false;
  }
  else if( totalmonth > 1080){
    $(".modal").modal("toggle");
    document.getElementById("model-body").innerText = "Date of birth is not valid. Age above 90" 
    return false;
  }          
  else if( dateOneNewuser > dateTwoCurrent ){
    $(".modal").modal("toggle");
   
    document.getElementById("model-body").innerText = "Date of birth is not valid"
    return false;
  }
  else{
    const caldiv = document.getElementById('bdays');
    caldiv.removeAttribute("hidden");
    const caldivHP = document.getElementById('bdays1');
    caldivHP.removeAttribute("hidden");
  }
  bdayContentDiv.html('');
  createCalender(totalmonth,colvalue,rowvalue);
  console.log('visiblity');
});
      
function createCalender(months=0, colCount=36, rowCount=30) {
  // debugger;
  var circleCount = 0;
  var rowStartYear = 1;
  var rowEndYear = 3;
  
  for (let i = 1; i <= rowCount; i++) {
    if (i > 1) {
      rowStartYear = (rowStartYear+3);
      rowEndYear = (rowEndYear+3);
    }
    if (months > 0) {
      let myrow = '<div class="col-sm-12">';
      //To show year range
      myrow += '<div class="yearrange" ></div>';
      for (let j = 1; j <= colCount; j++) {
        circleCount++;
        if (circleCount == months || circleCount < months ) {
          if (months < 348) { //Less then 29Years
            myrow += '<span id='+circleCount+' class="circle circlebg"></span>';  
          } else if (months >= 348 && months < 708) { //Greater then 29 and Less then 59Years
            myrow += '<span id='+circleCount+' class="circle circlebg"></span>';
          } else if (months >= 708 && months < 1080) { //Greater then 59 and Less then 90Years
            myrow += '<span  id='+circleCount+' class="circle circlebg"></span>';
          } else { //Greater then/equal 90
            myrow += '<span  id='+circleCount+' class="circle circlebg"></span>';
          } 
        }              
         else if (months >= 1080 && i == rowCount && j == colCount) { //Greater /equal 90
          myrow += '<span id='+circleCount+' class="circle"></span>';
        } else { //Default
          myrow += '<span id='+circleCount+' class="circle"></span>';
        }
      }
      myrow += '<div class="col-sm-12">';
      bdayContentDiv.append(myrow);
    } else {
      let myrow = '<div class="col-sm-12">';
      //To show year range
      myrow += '<div class="yearrange"></div>';
      for (let j = 1; j <= colCount; j++) {
        circleCount++;
        myrow += '<span id='+circleCount+'  class="circle"></span>';  
      }
      myrow += '<div class="col-sm-12">';
      bdayContentDiv.append(myrow);
    }
  }    
}   

function monthDiff(userDate, currentDate) {
 
var startDate = new Date(userDate );
var endDate   = new Date(currentDate);
    
var endMoment   = moment(endDate);
var startMoment = moment(startDate);

 //[days, years, months, seconds, ...]
  var monthnewv = endMoment.diff(startMoment, 'months'); // calcDate(currentDate,userDate)
  return monthnewv <= 0 ? 0 : monthnewv;
}   

$(document).ready(function(){
  var date_input=$('input[name="date"]'); //our date input has the name "date"
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  date_input.datepicker({
    format: 'dd-mm-yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  });
});