/*overlay opening*/
function openOverlay1() {
    document.getElementById('overlay1').style.display = 'flex';
}
function closeOverlay1() {
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

function recordExpense() {
  // Retrieve input values
  const purpose = document.querySelector('.spendingPurpose').value;
  const isNeed = document.getElementById('flexRadioDefault1').checked ? 'Need' : 'Want';
  const amount = parseFloat(document.querySelector('.amountSpent').value);

  // Create JavaScript object
  const expense = {
      purpose: purpose,
      type: isNeed,
      amount: amount
  };

  // Convert JavaScript object to JSON string
  const expenseJSON = JSON.stringify(expense);

  // Append JSON string to a JSON file (assuming you're using Node.js)
  const fs = require('fs');
  fs.appendFile('records.json', expenseJSON, 'utf8', function(err) {
      if (err) {
          console.log('Error appending to file:', err);
      } else {
          console.log('Expense recorded successfully.');
      }
  });
}