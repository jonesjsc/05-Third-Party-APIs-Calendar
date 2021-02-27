$('#currentDay').append(moment().format('MMMM Do YYYY')); 

const calStartHour = 9;
const calEndHour = 17;
var timeText;
var myCalendar = $("#myCalendar");

var currentHour=moment().format("H");

class Store {
    static getAppointments() {
        let appointments;
        if(localStorage.getItem('appointments') === null) {
            appointments = [];
        } else {
            appointments = JSON.parse(localStorage.getItem('appointments'));
        }
        return appointments;
    }

    static setAppointment(appointment) {
        const appointments = Store.getAppointments();
        // update the appointment with the text
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }

    
}
class UI {
    static displayCal () {

    // As we print the calender we need to use moment to figure 
    // the current hour.  We class the rows using the following rules:
    // if row hour < current hour it's a grey
    // if row hour is the current hour, it's a red
    // if row hour is > current hour, it's green

    // iterate from 9 to 17 which is 9am to 5pm military time

    for (var i = 9; i <= 17; i++) {  
    
        // there's probably a more eligant way to accomplish this, but
        // we're just formatting the time here.  9 10 11 get AM appended
        // 12 gets PM appended, and then 13 thru 17 gets PM appended also 
        // and are converted from 24HR to 12HR notation
    
        if (i < 12) {
            timeText=i+"AM";
        } 
        if (i == 12) {
            timeText="12PM";
        } 
        if (i > 12) { // i > 12
            timeText=(i-12)+"PM";
        }

        // build the row and class it
    
        var row = $("<div>");
        row.addClass("row");

       
        

        // build the individual cell divs

        var cellOne = $("<div>");
        cellOne.addClass("col-1 border pt-2 pb-2");
        cellOne.text(timeText);

        // cellTwo has to be a FORM
        //
        // <form>
        //    <input type="text"
        //    id="calText">
        // 
        // var cellTwo = $("<div>");

        var cellTwo = $("<form>");
        cellTwo.addClass("col-10 border pt-2 pb-2");
        
        // var cellTwoDiv = $("<div>");
        
        var cellTwoInput = $("<input>");
        cellTwoInput.addClass("form-control");
        cellTwoInput.attr({type: "text", id: "calText"});
        currentHour=12;
        if (currentHour > i) {
            cellTwo.addClass("bg-secondary");
            cellTwoInput.addClass("bg-secondary text-white");
        }
        if (currentHour == i) {
            cellTwo.addClass("bg-danger");
            cellTwoInput.addClass("bg-danger text-white");
        }
        if (currentHour < i) {
            cellTwo.addClass("bg-success");
            cellTwoInput.addClass("bg-success text-white");
        }
        cellTwo.append(cellTwoInput);

                
        var cellThree = $("<div>");
        cellThree.addClass("col-1 border pt-2 pb-2");
        cellThree.text("save");

        // put these cell divs into the row div

        row.append(cellOne, cellTwo, cellThree);
        
        // append the whole row div into the myCalendar div
        
        myCalendar.append(row);
        
        // repeat until we're done!
        }
    }
}

UI.displayCal ();
console.log("shazam");