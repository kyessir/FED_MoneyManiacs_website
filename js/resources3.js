 // resource2.js (retrieving API)
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
fetchDataFromApi(); 
