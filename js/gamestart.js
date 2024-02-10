

// Update the image based on the selected day
var imageUrl = getImageUrlForDay(selectedDay);
if (imageUrl) {
    document.getElementById('dayImage').src = imageUrl;
} else {
    console.error('Image URL not found for the selected day.');
}

// Display achievement messages and update image based on the selected day
displayAchievementMessage(selectedDay);



// Function to update the background image based on the selected day
function updateBackgroundImage(day) {
    var imageUrl = getImageUrlForDay(day);
    if (imageUrl) {
        document.body.style.backgroundImage = "url('" + imageUrl + "')";
    } else {
        console.error('Image URL not found for the selected day.');
    }
}

// Function to retrieve the image URL for a given day
function getImageUrlForDay(day) {
    var defaultImageUrl = "img/map07.png"; // Default image URL
    var imageFilenames = [
        "img/map01.png",
        "img/map02.png",
        "img/map03.png",
        "img/map04.png",
        "img/map05.png",
        "img/map06.png",
        "img/map07.png"
    ]; // Image URLs for each day

    // Ensure the day is within the valid range
    if (day >= 1 && day <= imageFilenames.length) {
        return imageFilenames[day - 1]; // Subtract 1 because arrays are zero-indexed
    } else {
        return defaultImageUrl; // Return the default image URL if the day is out of range
    }
}

// Set the initial background image when the page loads
window.onload = function() {
    var currentDay = 1; // Set the initial day (replace with your logic)
    updateBackgroundImage(currentDay);

// Update the background image when the selected day changes
document.getElementById('daySelect').addEventListener('change', function() {
    var selectedDay = parseInt(this.value);
    updateBackgroundImage(selectedDay);
});

};

// Function to open overlay
function openOverlay1() {
    document.getElementById('overlay1').style.display = 'flex';
}


function openOverlay1() {
    document.getElementById('overlay1').style.display = 'flex';
}

// Function to record expense
function recordExpense() {
    var daySelect = document.getElementById('daySelect');
    var selectedDay = daySelect.value; // Retrieve the selected day from the dropdown

    // Retrieve other form inputs
    var spendingPurpose = document.querySelector('.spendingPurpose').value;
    var isNeed = document.getElementById('flexRadioDefault1').checked ? 'Need' : 'Want';
    var amountSpent = parseFloat(document.querySelector('.amountSpent').value) || 0;
    var weeklyAllowance = parseFloat(document.querySelector('.weeklyAllowance').value) || 0;

    // Create a record object
    var record = {
        day: selectedDay,
        purpose: spendingPurpose,
        type: isNeed,
        amount: amountSpent,
        weeklyAllowance: weeklyAllowance
    };

    // Retrieve existing records from localStorage or initialize an empty array
    var records = JSON.parse(localStorage.getItem('spendingRecords')) || [];

    // Add the new record to the array of records
    records.push(record);

    // Limit the number of records to 35
    if (records.length > 35) {
        records = records.slice(records.length - 35);
    }

    // Change the background when new highest day is recorded
    var body = document.body;
    var highest = -1;
    if (Math.max(records.day) == 1) {
      body.style.backgroundImage = 'url("img/map01.png")'; // Change URL accordingly
    }
    else if (Math.max(records.day) == 2) {
        body.style.backgroundImage = 'url("img/map02.png")';
    }
    else {
      body.style.backgroundImage = 'url("img/map00.png")'; // Default URL
    }
    console.log(records.day);
    console.log(Math.max(records.day));

    // Store the updated records back to localStorage
    localStorage.setItem('spendingRecords', JSON.stringify(records));

    // Update the background image based on the highest recorded day
    var highestDay = records.reduce((maxDay, record) => Math.max(maxDay, parseInt(record.day)), -1);
    if (highestDay !== -1) {
        updateBackgroundImage(highestDay);
    }

    // Display achievement messages and update image based on the selected day
    displayAchievementMessage(selectedDay);

    // Close the overlay after recording the expense
    closeOverlay1();
}

// Function to close overlay
function closeOverlay1() {
    document.getElementById('overlay1').style.display = 'none';
}

function displayAchievementMessage(selectedDay) {
    var records = JSON.parse(localStorage.getItem('spendingRecords'));

    if (!records || !Array.isArray(records) || records.length === 0) {
        return; // No records found
    }

    var recordsForDay = records.filter(record => record.day === ("day" + selectedDay));

    var recordOnceInBook = recordsForDay.some(record => record.purpose === "Record once in the book.");
    var didNotSpendOnWants = recordsForDay.every(record => record.type === "Need");
    var completedGame = recordsForDay.some(record => record.purpose === "Shout it out, game's completed!");

    var message = "";

    // Check each condition separately and concatenate appropriate messages
    if (recordOnceInBook) {
        message += "Congratulations on making a record!\n";
    }
    if (didNotSpendOnWants) {
        message += "Congratulations on making a record!\n";
        message += "Completed all 5 days without spending on wants.\n";
        message += "Shout out! The game is completed!\n";
    }
    if (completedGame) {
        message += "Shout out! The game is completed!\n";
    }

    // Display the concatenated message
    alert(message);
}


function deleteRecord(index) {
    // Retrieve existing records from localStorage
    var records = JSON.parse(localStorage.getItem('spendingRecords'));

    // Check if records exist
    if (!records || !Array.isArray(records)) {
        console.error('No records found or invalid format.');
        return;
    }

    // Check if the index is valid
    if (index < 0 || index >= records.length) {
        console.error('Invalid index.');
        return;
    }

    // Remove the record at the specified index
    records.splice(index, 1);

    // Store the updated records back to localStorage
    localStorage.setItem('spendingRecords', JSON.stringify(records));

    // Reload records in the overlay
    displayRecords();
}

function editRecord(index) {
    // Retrieve existing records from localStorage
    var records = JSON.parse(localStorage.getItem('spendingRecords'));

    // Check if records exist
    if (!records || !Array.isArray(records)) {
        console.error('No records found or invalid format.');
        return;
    }

    // Check if the index is valid
    if (index < 0 || index >= records.length) {
        console.error('Invalid index.');
        return;
    }

    // Retrieve the record to edit
    var recordToEdit = records[index];

    // Update the input fields with the values of the record
    document.getElementById('daySelect').value = recordToEdit.day; // Set the selected day in the dropdown
    document.querySelector('.spendingPurpose').value = recordToEdit.purpose;
    document.getElementById('flexRadioDefault1').checked = recordToEdit.type === 'Need';
    document.getElementById('flexRadioDefault2').checked = recordToEdit.type === 'Want';
    document.querySelector('.amountSpent').value = recordToEdit.amount;
    document.querySelector('.weeklyAllowance').value = recordToEdit.weeklyAllowance;

    // Display the overlay for editing
    openOverlay1();

    // Delete the old record
    deleteRecord(index);
}

function displayRecords(dateTime, weeklyAllowance) {
    // Retrieve existing records from localStorage
    var records = JSON.parse(localStorage.getItem('spendingRecords'));

    // Check if records exist
    if (!records || !Array.isArray(records) || records.length === 0) {
        document.getElementById('recordList').innerHTML = '<p>No records found.</p>';
        return;
    }

    // Create HTML for displaying records in a table
    var html = '<table>';
    html += '<tr><th>Day</th><th>Purpose</th><th>Type</th><th>Amount</th><th>Weekly Allowance</th><th>Action</th></tr>';
    records.forEach(function(record, index) {
        html += '<tr>';
        html += '<td>' + record.day + '</td>'; // Day
        html += '<td>' + record.purpose + '</td>'; // Purpose
        html += '<td>' + record.type + '</td>'; // Type
        html += '<td>$' + record.amount.toFixed(2) + '</td>'; // Amount
        html += '<td>$' + record.weeklyAllowance.toFixed(2) + '</td>'; // Weekly Allowance
        html += '<td><button onclick="deleteRecord(' + index + ')">Delete</button>';
        html += '<button onclick="editRecord(' + index + ')">Edit</button></td>';
        html += '</tr>';
    });
    html += '</table>';

    // Display records in the overlay
    document.getElementById('recordList').innerHTML = html;
}

function openOverlay2() {
    // Display the overlay
    document.getElementById('overlay2').style.display = 'flex';

    // Retrieve datetime and weekly allowance values from localStorage
    var dateTime = localStorage.getItem('dateTime');
    var weeklyAllowance = parseFloat(localStorage.getItem('weeklyAllowance'));

    // Load and display records along with datetime and weekly allowance
    displayRecords(dateTime, weeklyAllowance);
}

function closeOverlay2() {
    // Hide the overlay
    document.getElementById('overlay2').style.display = 'none';
}

// Function to open overlay3 and display achievements
function openOverlay3() {
    // Display overlay3
    document.getElementById('overlay3').style.display = 'flex';

    // Call displayAchievementMessage to show achievements
    displayAchievementMessage();
}

// Function to close overlay3
function closeOverlay3() {
    // Hide overlay3
    document.getElementById('overlay3').style.display = 'none';
}


