$('#currentDay').append(moment().format('MMMM Do YYYY')); 

var myCalendar = $("#myCalendar");

class calData {
    constructor(timeslot, appt) {
        this.timeslot = timeslot;
        this.appt = appt; 
    }
}

class Store {
    // note - there is something odd happening probably related to the fact that I am using classes
    // extensive comments and console logs below
    static getCalData() {
        var myCalData = [];
        if(localStorage.getItem('calData') === null) {
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
            localStorage.setItem('calData', JSON.stringify(myCalData)); // inspection in browser - yes
            console.log("fun fact here is what myCalData is now ",myCalData); // returns an array

        } else {
            console.log("Local Storage is defined, so lets load that");
            myCalData = JSON.parse(localStorage.getItem('calData'));
            console.log ("myCalData ",myCalData); // returns an array
        }
        console.log ("just finished the if then else - myCalData ",myCalData); // returns UNDEFINED on first load, but if you REFRESH the browser it's populated
        myCalData = JSON.parse(localStorage.getItem('calData'));
        console.log ("just reload from localStorage ",myCalData); // returns an array

        return myCalData;
    }

    static setCalData(calData) {
        // const calData = Store.getcalData();
        // update the appointment with the text
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

            var timeToCheck=index+9; // kinda being lazy - this array represents time that starts at 9am
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
            
            // here is where we are colorizing the text input box based on time

            if (currentHour > timeToCheck) {
                cellTwo.addClass("past");
                cellTwoInput.addClass("past");
            }
            if (currentHour == timeToCheck) {
                cellTwo.addClass("present");
                cellTwoInput.addClass("present");
            }
            if (currentHour < timeToCheck) {
                cellTwo.addClass("future");
                cellTwoInput.addClass("future");
            }
            cellTwo.append(cellTwoInput);
        
            // cellThree is the save button cell.

            var cellThree = $("<div>");
            cellThree.addClass("col-1 border pt-2 pb-2 btn btn-sm saveBtn");
            cellThree.text("save"); // might could use use a font awesome icon here

            // put these cell divs into the row div

            row.append(cellOne, cellTwo, cellThree);
            
            // append the whole row div into the myCalendar div
            
            myCalendar.append(row);

        });
    }

    static locateWhatChanged(event) {
        if(event.target.classList.contains('saveBtn')) {  // lets be sure the click is on the save area
        
            // where's here because someone clicked on the SAVE button.  Lets pluck out 
            // the text of what's in the input area, and also lets get the time from the DOM too.
            // DOM traversial is so much fun.  
            // I heart DOM traversial
            //
            // To pluck the text
            // we need to get the form.value from the previous siblings children.
            // here's a fun fact: i never weas good at family trees so this part is super fun for me.
            //
            var apptText = (event.target.previousSibling.childNodes[0].value); 
            
            // heck while we're here lets just grab the text out of the DOM we put there for the time.
        
            var apptTime = (event.target.previousSibling.previousSibling.textContent);
            Store.updateWhatChanged(apptTime,apptText);
        
        }
    }

}
// end UI Class defination

document.querySelector('#myCalendar').addEventListener('click', (event) => {
    
    UI.locateWhatChanged(event);

});

UI.displayCal ();