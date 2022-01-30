// This is where we'll keep 
// the code that builds the HTML table and fills it with data from data.js.
// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
// D3 is a JavaScript library that produces sophisticated and highly dynamic graphics in an HTML webpage
// 1.	Declare a variable, tbody
// 2.	Use d3.select to tell JavaScript to look for the <tbody> tags in the HTML
var tbody = d3.select("tbody");

// function buildTable:
// Looped through each object in the array
// Appended a row to the HTML table
// Added each value from the object into a cell
// 
// reate a blank canvas. This is a standard way to clear data.
function buildTable(data) {
  tbody.html("");

  data.forEach((dataRow) => {
    // tells JavaScript to find the <tbody> tag within the HTML and add a table row ("tr")
    let row = tbody.append("tr");
    // put each sighting onto its own row of data
    Object.values(dataRow).forEach((val) => {
      // create a variable to append data to a table:
      let cell = row.append("td");
      // This is the variable that holds only each value from the object
      // When we chain .text(value) to the variable, we are extracting only the text of the value.
      cell.text(val);
      }
    );
  });
}
// Data-Driven Documents (D3 for short) is a JavaScript library that adds 
// interactive functionality, such as when users click a button to filter 
// a table such as filtering the table by date. 
// It works by "listening" for events, such as a button click, then 
// reacts according to the code 

function handleClick() {
  // select the very first element that matches our selector string: 
  // "#datetime". The selector string is the item we're telling D3.js to look for
  // we're telling D3 to look for the #datetime id in the HTML tags

  // Grab the datetime value from the filter
  let date = d3.select("#datetime").property("value");
  let filteredData = tableData;

   // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date);
  }

   // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);