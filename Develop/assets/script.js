$('#currentDay').append(moment().format('MMMM Do YYYY')); 

const calStartHour = 9;
const calEndHour = 17;
var timeText;
var myCalendar = $("#myCalendar");

class UI {
    static displayCal () {

// iterate from 9 to 17 which is 9am to 5pm military time

    for (var i = 9; i <= 17; i++) {  
    
        // there's probably a more eligant way to accomplish this, but
        // we're just formatting the time here.  9 10 11 get AM appended
        // 12 gets PM appended, and then 13 thru 17 gets PM appended also
    
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

        var cellTwo = $("<div>");
        cellTwo.addClass("col-10 border pt-2 pb-2");
        cellTwo.text("imma edit you eventually");

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

// const $tableID = $('#table');
//  const $BTN = $('#export-btn');
//  const $EXPORT = $('#export');

//  const newTr = `
// <tr class="hide">
//   <td class="pt-3-half" contenteditable="true">Example</td>
//   <td class="pt-3-half" contenteditable="true">Example</td>
//   <td class="pt-3-half" contenteditable="true">Example</td>
//   <td class="pt-3-half" contenteditable="true">Example</td>
//   <td class="pt-3-half" contenteditable="true">Example</td>
//   <td class="pt-3-half">
//     <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
//     <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
//   </td>
//   <td>
//     <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
//   </td>
// </tr>`;

//  $('.table-add').on('click', 'i', () => {

//    const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

//    if ($tableID.find('tbody tr').length === 0) {

//      $('tbody').append(newTr);
//    }

//    $tableID.find('table').append($clone);
//  });

//  $tableID.on('click', '.table-remove', function () {

//    $(this).parents('tr').detach();
//  });

//  $tableID.on('click', '.table-up', function () {

//    const $row = $(this).parents('tr');

//    if ($row.index() === 0) {
//      return;
//    }

//    $row.prev().before($row.get(0));
//  });

//  $tableID.on('click', '.table-down', function () {

//    const $row = $(this).parents('tr');
//    $row.next().after($row.get(0));
//  });

//  // A few jQuery helpers for exporting only
//  jQuery.fn.pop = [].pop;
//  jQuery.fn.shift = [].shift;

//  $BTN.on('click', () => {

//    const $rows = $tableID.find('tr:not(:hidden)');
//    const headers = [];
//    const data = [];

//    // Get the headers (add special header logic here)
//    $($rows.shift()).find('th:not(:empty)').each(function () {

//      headers.push($(this).text().toLowerCase());
//    });

//    // Turn all existing rows into a loopable array
//    $rows.each(function () {
//      const $td = $(this).find('td');
//      const h = {};

//      // Use the headers from earlier to name our hash keys
//      headers.forEach((header, i) => {

//        h[header] = $td.eq(i).text();
//      });

//      data.push(h);
//    });

//    // Output the result
//    $EXPORT.text(JSON.stringify(data));
//  });