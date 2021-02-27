$('#currentDay').append(moment().format('MMMM Do YYYY')); 

const calStartHour = 9;
const calEndHour = 17;
var timeText;
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
                 appt: "some appt"},
                {timeslot: "1pm",
                 appt: ""},
                {timeslot: "2pm",
                 appt: ""},
                {timeslot: "3pm",
                 appt: "a different appt"},
                {timeslot: "4pm",
                 appt: ""},
                {timeslot: "5pm",
                 appt: ""},
            ];
            console.log("so im save a template to localStorage", myCalData);
            localStorage.setItem('calData', JSON.stringify(myCalData));
            console.log("template loaded");
            console.log("fun fact here is what myCalData is now ",myCalData);

        } else {
          console.log("there's something in there so let load that ");
            myCalData = JSON.parse(localStorage.getItem('calData'));
            console.log ("in the else, myCalData ",myCalData);
        }
        console.log ("just finished the if then else - myCalData ",myCalData);
        myCalData = JSON.parse(localStorage.getItem('calData'));
        console.log ("just loaded that fucker from localStorage ",myCalData);

        return myCalData;
    }

    static setCalData(calData) {
        // const calData = Store.getcalData();
        // update the appointment with the text
        console.log("did someone say load some data into local storage?");
        localStorage.setItem('calData', JSON.stringify(calData));
    }

}



class UI {
    static displayCal () {

    const myCalData = Store.getCalData();
    console.log ("this is UI.displayCal here and this is myCalData ",myCalData);

    myCalData.forEach((calEvent, index) => {

        var timeToCheck=index+9;
        
        console.log (calEvent.timeslot, calEvent.appt);
    
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
        currentHour=12;

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
        cellThree.addClass("col-1 border pt-2 pb-2");
        cellThree.text("save");

        // put these cell divs into the row div

        row.append(cellOne, cellTwo, cellThree);
        
        // append the whole row div into the myCalendar div
        
        myCalendar.append(row);

    });
    }
}

UI.displayCal ();