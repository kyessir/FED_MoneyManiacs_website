function displayAchievementMessage() {
    // Retrieve existing records from localStorage
    var records = JSON.parse(localStorage.getItem('spendingRecords'));

    // Check if records exist
    if (!records || !Array.isArray(records) || records.length === 0) {
        return; // No records found, so no achievements to display
    }

    // Check if each achievement condition is met
    var recordOnceInBook = true;
    var didNotSpendOnWants = true; 
    var completedGame = true;
    var lastDayRecordExists = true;

    // Retrieve the selected day from the dropdown
    var daySelect = document.getElementById('daySelect');
    var selectedDay = daySelect.value;

    // Check if there is a record for the previous day
    var previousDay = "day" + (parseInt(selectedDay.slice(-1)) - 1);
    records.forEach(function(record) {
        if (record.day === previousDay) {
            lastDayRecordExists = true;
        }
    });

    // If there is no record for the previous day, set didNotSpendOnWants to false
    if (!lastDayRecordExists) {
        didNotSpendOnWants = false;
    }

    // Check if the user has achieved each milestone based on the current day's records
    records.forEach(function(record) {
        if (record.purpose === "Record once in the book.") {
            recordOnceInBook = true;
        } else if (record.purpose === "Did not spend on wants for one day.") {
            didNotSpendOnWants = true; // User spent on wants, so this achievement is not met
        } else if (record.purpose === "Shout it out, game's completed!") {
            completedGame = true;
        }
    });

    // Display achievement messages based on conditions
    var message = "";
    if (recordOnceInBook) {
        message += "Congratulations on making a record!\n";
    }
    if (didNotSpendOnWants) {
        message += "Completed all 5 days without spending on wants.\n";
    }
    if (completedGame) {
        message += "Shout out! The game is completed!\n";
    }

    // Display the message
    alert(message);
}

function openOverlay1() {
    document.getElementById('overlay1').style.display = 'flex';
}


function openOverlay1() {
    document.getElementById('overlay1').style.display = 'flex';
}

function recordExpense() {
    var daySelect = document.getElementById('daySelect');
    var selectedDay = daySelect.value; // Retrieve the selected day from the dropdown

    var spendingPurposeInput = document.querySelector('.spendingPurpose');
    var needRadio = document.getElementById('flexRadioDefault1');
    var amountSpentInput = document.querySelector('.amountSpent');
    var weeklyAllowanceInput = document.querySelector('.weeklyAllowance');

    var spendingPurpose = spendingPurposeInput.value;
    var isNeed = needRadio.checked ? 'Need' : 'Want';
    var amountSpent = parseFloat(amountSpentInput.value) || 0;
    var weeklyAllowance = parseFloat(weeklyAllowanceInput.value) || 0;

    var record = {
        day: selectedDay, // Store the selected day in the record
        purpose: spendingPurpose,
        type: isNeed,
        amount: amountSpent,
        weeklyAllowance: weeklyAllowance
    };

    // Retrieve existing records from localStorage
    var records = JSON.parse(localStorage.getItem('spendingRecords')) || [];

    // Add the new record to the array of records
    records.push(record);

    // Limit the number of records to 35
    if (records.length > 35) {
        records = records.slice(records.length - 35);
    }

    // Store the updated records back to localStorage
    localStorage.setItem('spendingRecords', JSON.stringify(records));

    // Close the overlay after recording the expense
    closeOverlay1(); // Call closeOverlay1 function instead of directly setting display to none
}

function closeOverlay1() {
    document.getElementById('overlay1').style.display = 'none';
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


