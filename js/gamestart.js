/*overlay opening*/
function openOverlay1() {
    document.getElementById('overlay1').style.display = 'flex';
}
function closeOverlay1() {
    // Retrieve form input values
    var spendingPurpose = document.querySelector('.spendingPurpose').value;
    var isNeed = document.getElementById('flexRadioDefault1').checked ? 'Need' : 'Want';
    var amountSpent = parseFloat(document.querySelector('.amountSpent').value);

    // Construct an object to hold the information
    var record = {
        purpose: spendingPurpose,
        type: isNeed,
        amount: amountSpent
    };

    // Check if there are existing records in the cookie
    var records = [];
    var existingRecords = localStorage.getItem('spendingRecords');
    if (existingRecords) {
        records = JSON.parse(existingRecords);
    }

    // Append the new record to the array
    records.push(record);

    // Ensure the cookie doesn't exceed the storage limit
    if (records.length > 35) {
        records = records.slice(records.length - 35);
    }

    // Convert the array to a JSON string and store it in the cookie
    localStorage.setItem('spendingRecords', JSON.stringify(records));

    document.getElementById('overlay1').style.display = 'none';
}
function openOverlay2() {
    document.getElementById('overlay2').style.display = 'flex';
}
function closeOverlay2() {
    document.getElementById('overlay2').style.display = 'none';
}
function openOverlay3() {
    document.getElementById('overlay3').style.display = 'flex';
}
function closeOverlay3() {
    document.getElementById('overlay3').style.display = 'none';
}

function deleteRecord(index) {
  // Retrieve existing records from local storage
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

  // Store the updated records back to local storage
  localStorage.setItem('spendingRecords', JSON.stringify(records));
}