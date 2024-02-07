/*get form input from login.html*/
function getUsername() {
    let username = document.getElementById('username').value;
    console.log('Username: ', username);
}

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


/*get form input from gamestart.html*/
function recordExpense() {
    // Get values from HTML elements
    let spendingPurpose = document.getElementById('spendingPurpose').value;
    let category = document.querySelector('input[name="record_cat"]:checked').value;
    let amountSpent = document.getElementById('amountSpent').value;
    // Get the current date
    const currentDate = new Date();
    // Format the date
    const formattedDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2); 

    // Log values for demonstration (you can do further processing here)
    console.log('Spending Purpose:', spendingPurpose);
    console.log('Category:', category);
    console.log('Amount Spent:', amountSpent);
    console.log('Date recorded: ', formattedDate);

    // Add your logic to handle the values (e.g., send to server, update UI, etc.)
    postExpenseToRestDB(spendingPurpose, category, amountSpent, formattedDate);
};

// Function to post expense data to restdb.io
function postExpenseToRestDB(username, spendingPurpose, category, amountSpent, formattedDate) {
    const APIKEY = "Y65ae853b7d9e500806a56045";
    
    // Customize the endpoint based on your restdb.io collection
    const endpoint = "https://fedassg2-b5f5.restdb.io/rest/game";

    // Create JSON data
    let jsondata = {
        spendingPurpose: spendingPurpose,
        category: category,
        amountSpent: amountSpent,
        dateRecorded: formattedDate
    };

    // AJAX settings
    let settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify(jsondata),
        beforeSend: function () {
            // Add loading logic if needed
        },
    };
    

    // Send AJAX request
    fetch(endpoint, settings)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Handle response, update UI, etc.
            // Example: Show success message to the user
            alert("Expense recorded successfully!");
        })
        .catch((error) => {
            console.error('Error posting expense:', error);
            // Handle error, show error message, etc.
            // Example: Show error message to the user
            alert("Error posting expense. Please try again later.");
        });
    }