// Simple Calendar app
// moment.js
// DOM manipulation / traversal

$('#currentDay').append(moment().format('MMMM Do YYYY')); 

var myCalendar = $("#myCalendar");

class calData {
    constructor(timeslot, appt) {
        this.timeslot = timeslot;
        this.appt = appt; 
    }
}

class Store {
    static getCalData() {
        var myCalData = [];
        if(localStorage.getItem('calData') === null) {
            console.log("local storage is not populated");
            let myCalData = [
                {timeslot: "9am",
                 appt: ""},
                {timeslot: "10am",
                 appt: ""},
                {timeslot: "11am",
                 appt: ""},
                {timeslot: "12pm",
                 appt: ""},
                {timeslot: "1pm",
                 appt: ""},
                {timeslot: "2pm",
                 appt: ""},
                {timeslot: "3pm",
                 appt: ""},
                {timeslot: "4pm",
                 appt: ""},
                {timeslot: "5pm",
                 appt: ""},
            ];
            console.log("so i save a template to localStorage", myCalData); // returns an array
            localStorage.setItem('calData', JSON.stringify(myCalData)); // inspection in browser - yes
            console.log("template loaded");
            console.log("fun fact here is what myCalData is now ",myCalData); // returns an array

        } else {
          console.log("there's something in there so let load that ");
            myCalData = JSON.parse(localStorage.getItem('calData'));
            console.log ("in the else, myCalData ",myCalData); // returns an array
        }
        console.log ("just finished the if then else - myCalData ",myCalData); // returns UNDEFINED on first load, but if you REFRESH the browser it's populated
        myCalData = JSON.parse(localStorage.getItem('calData'));
        console.log ("just loaded that fucker from localStorage ",myCalData); // returns an array

        return myCalData;
    }

    static setCalData(calData) {
        // const calData = Store.getcalData();
        // update the appointment with the text
        console.log("did someone say load some data into local storage?");
        localStorage.setItem('calData', JSON.stringify(calData));
    }

    
        // when called we're expecting the timeSlice from the text area 9AM, 10AM etc
        // and we need the data from the text area so we can find this in the 
        // calData localStorage array and update that
    
    static updateWhatChanged(apptTime,apptText) {
        const myCalData = Store.getCalData();
        myCalData.forEach((calEvent, index) => {
            if (calEvent.timeslot == apptTime) {
                calEvent.appt=apptText;
            }
            localStorage.setItem('calData', JSON.stringify(myCalData));
         });
    }

}

class UI {
    static displayCal () {

        const myCalData = Store.getCalData();

        myCalData.forEach((calEvent, index) => {

            var timeToCheck=index+9; // kinda being lazy - this array represetns time that starts at 9am
            var row = $("<div>");
            row.addClass("row");

            // build the individual cell divs

            var cellOne = $("<div>");
            cellOne.addClass("col-1 border pt-2 pb-2");
            cellOne.text(calEvent.timeslot);

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
            cellTwoInput.attr({type: "text", id: "calText", value: calEvent.appt});
            
            // lets colarize the calendar view based on the current time
            
            var currentHour=moment().format("H");
            
            if (currentHour > timeToCheck) {
                cellTwo.addClass("bg-secondary");
                cellTwoInput.addClass("bg-secondary text-white");
            }
            if (currentHour == timeToCheck) {
                cellTwo.addClass("bg-danger");
                cellTwoInput.addClass("bg-danger text-white");
            }
            if (currentHour < timeToCheck) {
                cellTwo.addClass("bg-success");
                cellTwoInput.addClass("bg-success text-white");
            }
            cellTwo.append(cellTwoInput);
        
            var cellThree = $("<div>");
            cellThree.addClass("col-1 border pt-2 pb-2 btn btn-sm saveBtn");
            cellThree.text("save"); // use font awesome here

            // put these cell divs into the row div

            row.append(cellOne, cellTwo, cellThree);
            
            // append the whole row div into the myCalendar div
            
            myCalendar.append(row);

        });
    }

    static locateWhatChanged(event) {
        if(event.target.classList.contains('saveBtn')) {  // lets be sure the click is on the save area
        
            // DOM traversial is so much fun.  
            // I heart DOM traversial
            
            var apptText = (event.target.previousSibling.childNodes[0].value); 
            
            var apptTime = (event.target.previousSibling.previousSibling.textContent);
            console.log ("i need to update "+apptTime+" and "+apptText);
            Store.updateWhatChanged(apptTime,apptText);
        
        }
    }

    // console.log ("i need to update "+apptTime+" and "+apptText);
}
// end UI Class defination

document.querySelector('#myCalendar').addEventListener('click', (event) => {
    
    UI.locateWhatChanged(event);

});

UI.displayCal ();