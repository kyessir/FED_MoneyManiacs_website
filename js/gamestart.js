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
function openOverlay3(){
    document.getElementById('overlay3').style.display = 'flex';
}
function closeOverlay3() {
    document.getElementById('overlay3').style.display = 'none';
}

/*get form input*/
function recordExpense() {
    // Get values from HTML elements
    var spendingPurpose = document.getElementById('spendingPurpose').value;
    var category = document.querySelector('input[name="record_cat"]:checked').value;
    var amountSpent = document.getElementById('amountSpent').value;
    const currentDate = new Date(); // Get the current date
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // Log values for demonstration (you can do further processing here)
    console.log('Spending Purpose:', spendingPurpose);
    console.log('Category:', category);
    console.log('Amount Spent:', amountSpent); 
    console.log('Date recorded: ', formattedDate);


    // Add your logic to handle the values (e.g., send to server, update UI, etc.)
    
}