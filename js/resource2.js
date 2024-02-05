/* // resource2.js (retrieving API)
const apiKey = '4e007ac709c7435:1bwtg46ffp2iaa2';
const apiUrl = 'https://api.tradingeconomics.com/country/thailand';

// Function to update HTML elements with API data
const updatePageWithApiData = (data) => {
  // Modify this part based on your HTML structure
  const tableBody = document.getElementById('data');
  
  // Clear existing table rows
  tableBody.innerHTML = '';

  // Iterate through the API data and create table rows
  data.forEach(entry => {
    const row = document.createElement('tr');

    // Customize the cell content based on your API response structure
    const countryCell = document.createElement('td');
    countryCell.textContent = entry.Country;

    const categoryCell = document.createElement('td');
    categoryCell.textContent = entry.Category;

    const titleCell = document.createElement('td');
    titleCell.textContent = entry.Title;

    const dateCell = document.createElement('td');
    dateCell.textContent = entry.LatestValueDate;

    const valueCell = document.createElement('td');
    valueCell.textContent = entry.LatestValue;

    // Append cells to the row
    row.appendChild(countryCell);
    row.appendChild(categoryCell);
    row.appendChild(titleCell);
    row.appendChild(dateCell);
    row.appendChild(valueCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
};

// Function to fetch data from the API
const fetchDataFromApi = async () => {
  try {
    const response = await fetch(`${apiUrl}?c=${apiKey}`);
    const data = await response.json(); // Assuming the API returns JSON data

    // Update HTML elements with the received data
    updatePageWithApiData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to fetch data when the script is executed
fetchDataFromApi(); */

//resource2.js 
const apiKey = '4e007ac709c7435:1bwtg46ffp2iaa2';
const apiUrl = 'https://api.tradingeconomics.com/news/country/mexico/inflation%20rate';
//const apiUrl = `https://api.tradingeconomics.com/news/country/mexico/inflation%20rate?c=${apiKey}`;

// Function to update HTML elements with API data
const updatePageWithApiData = (data) => {
  // Modify this part based on your HTML structure
  const tableBody = document.getElementById('data');

  // Clear existing table rows
  tableBody.innerHTML = '';

  // Iterate through the API data and create table rows
  data.forEach(entry => {
    const row = document.createElement('tr');

    // Customize the cell content based on your API response structure
    const categoryCell = document.createElement('td');
    categoryCell.textContent = entry.category;  // Use lowercase 'category'

    const dateCell = document.createElement('td');
    dateCell.textContent = entry.date;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = entry.description;

    const idCell = document.createElement('td');
    idCell.textContent = entry.id;

    const titleCell = document.createElement('td');
    titleCell.textContent = entry.title;

    const symbolCell = document.createElement('td');
    symbolCell.textContent = entry.symbol;

    const countryCell = document.createElement('td');
    countryCell.textContent = entry.country;

    // Append cells to the row
    row.appendChild(dateCell);
    row.appendChild(descriptionCell);
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(categoryCell);
    row.appendChild(symbolCell);
    row.appendChild(countryCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
};

const fetchDataFromApi = async () => {
  try {
    const response = await fetch(`${apiUrl}?c=${apiKey}`);
   //const response = await fetch(`${apiUrl}`);
    const data = await response.json(); // Assuming the API returns JSON data
    console.log(data);
    // Update HTML elements with the received data
    updatePageWithApiData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to fetch data when the script is executed
fetchDataFromApi();


// Function to fetch data from the API



/* // Fetch the data from the Trading Economics API
// Replace the API key with your own
fetch('https://api.tradingeconomics.com/historical/country/all/indicator/inflation?c=4e007ac709c7435:1bwtg46ffp2iaa2&format=json')
  .then(response => response.json())
  .then(data => {
    // Parse and format the data
    // For simplicity, we only use the data for China and India
    const chinaData = data.filter(item => item.Country === 'China');
    const indiaData = data.filter(item => item.Country === 'India');
    const labels = chinaData.map(item => item.DateTime.slice(0, 4));
    const chinaValues = chinaData.map(item => item.Value);
    const indiaValues = indiaData.map(item => item.Value);

    // Create a canvas element in the HTML file
    // <canvas id="myChart"></canvas>

    // Get the canvas context in the JavaScript file
    const ctx = document.getElementById('myChart').getContext('2d'); */

/*     // Initialize a new Chart.js instance
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'China Inflation Rate',
          data: chinaValues,
          borderColor: 'red',
          fill: false
        }, {
          label: 'India Inflation Rate',
          data: indiaValues,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Inflation Rate by Country'
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value, index, values) {
                // Format the y-axis values as percentages
                return value + '%';
              }
            }
          }]
        }
      }
    });
  }); */


