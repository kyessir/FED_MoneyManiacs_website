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

/*gamestart.html-----------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
    // What kind of interface we want at the start
    const APIKEY = "65ae853b7d9e500806a56045";
    const username = localStorage.getItem("username");
    getGame();
    document.getElementById("header-container").style.display = "none";
    document.getElementById("add-update-msg").style.display = "none";
  
    //[STEP 1]: Create the HTML structure for the overlay
    const overlay1 = document.createElement("div");
    overlay1.id = "overlay1";
    overlay1.className = "overlay";
    overlay1.innerHTML = `
        <div id="overlay-content">
            <button type="button" class="btn-close" aria-label="Close" onclick="closeOverlay1()"></button>
            <h3>Today</h3>
            <p>What did you spend on?</p>
            <input type="text" min="1" step="any" class='spendingPurpose'/>
            <form>
                <input type="radio" id="needs" name="record_cat" value="needs">
                <label for="needs">Needs</label><br>
                <input type="radio" id="wants" name="record_cat" value="wants">
                <label for="wants">Wants</label><br>
            </form>
            <hr>
            <p>How much did you spend?</p>
            <span>$ </span>
            <input type="number" min="1" step="any" class='amountSpent'/>
            <br><br>
            <button onclick="closeOverlay1(); recordExpense()">Record</button>
        </div>
    `;
    document.body.appendChild(overlay1);
  
    //[STEP 2]: Add event listeners for closing the overlay and recording expenses
    window.closeOverlay1 = function() {
        overlay1.style.display = "none";
    };
  
    window.recordExpense = function() {
        let spendingPurpose = document.querySelector(".spendingPurpose").value;
        let amountSpent = document.querySelector(".amountSpent").value;
        let recordCategory = document.querySelector("input[name='record_cat']:checked").value;
  
        //[STEP 3]: Get form values when the user clicks on send
        // Adapted from restdb API
        let jsondata = {
            name: username, // Use the retrieved username
            spendingPurpose: spendingPurpose,
            amountSpent: amountSpent,
            recordCategory: recordCategory
        };
  
        //[STEP 4]: Create our AJAX settings. Take note of API key
        let settings = {
            method: "POST", //[cher] we will use post to send info
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify(jsondata),
            beforeSend: function() {
                //@TODO use loading bar instead
                // Clear our form using the form ID and triggering its reset feature
                document.getElementById("add-contact-form").reset();
            },
        };
  
        //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
        fetch("https://fedassg2-b5f5.restdb.io/rest/game", settings)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                document.getElementById("add-update-msg").style.display = "block";
                setTimeout(function() {
                    document.getElementById("add-update-msg").style.display = "none";
                }, 3000);
                // Update our table
                getGame(); // Updated function name
            });
    };
  
    // Rest of the code remains unchanged
});

//[STEP] 6
    // Let's create a function to allow you to retrieve all the information in your games
    // By default, we only retrieve 10 results
    function getGame(limit = 20, all = true) {
        //[STEP 7]: Create our AJAX settings
        let settings = {
          method: "GET", //[cher] we will use GET to retrieve info
          headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
          },
        };
    
        //[STEP 8]: Make our AJAX calls
        // Once we get the response, we modify our table content by creating the content internally. We run a loop to continuously add on data
        // RESTDb/NoSql always adds in a unique id for each data; we tap on it to have our data and place it into our links
        fetch("https://fedassg2-b5f5.restdb.io/rest/game", settings)
          .then((response) => response.json())
          .then((response) => {
            let content = "";
    
            for (var i = 0; i < response.length && i < limit; i++) {
              //console.log(response[i]);
              //[METHOD 1]
              // Let's run our loop and slowly append content
              // We can use the normal string append += method
              /*
              content += "<tr><td>" + response[i].name + "</td>" +
                "<td>" + response[i].email + "</td>" +
                "<td>" + response[i].message + "</td>
                "<td>Del</td><td>Update</td</tr>";
              */
    
              //[METHOD 2]
              // Using our template literal method using backticks
              // Take note that we can't use += for template literal strings
              // We use ${content} because -> content += content
              // We want to add on previous content at the same time
              content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
              <td>${response[i].email}</td>
              <td>${response[i].message}</td>
              <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}'>Update</a></td></tr>`;
            }
    
            //[STEP 9]: Update our HTML content
            // Let's dump the content into our table body
            document
              .getElementById("contact-list")
              .getElementsByTagName("tbody")[0].innerHTML = content;
    
            document.getElementById("total-contacts").innerHTML = response.length;
          });
      }
    
      //[STEP 10]: Create our update listener
      // Here we tap onto our previous table when we click on update
      // This is a delegation feature of jQuery
      // Because our content is dynamic in nature, we listen in on the main container which is "#contact-list". For each row, we have a class .update to help us
      document
        .getElementById("contact-list")
        .addEventListener("click", function(e) {
          if (e.target.classList.contains("update")) {
            e.preventDefault();
            // Update our update form values
            let contactName = e.target.getAttribute("data-name");
            let contactEmail = e.target.getAttribute("data-email");
            let contactMsg = e.target.getAttribute("data-msg");
            let contactId = e.target.getAttribute("data-id");
            console.log(e.target.getAttribute("data-msg"));
    
            //[STEP 11]: Load in our data from the selected row and add it to our update contact form
            document.getElementById("update-contact-name").value = contactName;
            document.getElementById("update-contact-email").value = contactEmail;
            document.getElementById("update-contact-msg").value = contactMsg;
            document.getElementById("update-contact-id").value = contactId;
            document.getElementById("update-contact-container").style.display =
              "block";
          } else if (e.target.classList.contains("delete")) {
            e.preventDefault();
            let contactId = e.target.getAttribute("data-id");
            deleteForm(contactId);
        }
      }); //end contact-list listener for update function
  
    //[STEP 12]: Here we load in our contact form data
    // Update form listener
    document
      .getElementById("update-contact-submit")
      .addEventListener("click", function(e) {
        e.preventDefault();
        // Retrieve all my update form values
        let contactName = document.getElementById("update-contact-name").value;
        let contactEmail = document.getElementById("update-contact-email").value;
        let contactMsg = document.getElementById("update-contact-msg").value;
        let contactId = document.getElementById("update-contact-id").value;
  
        console.log(document.getElementById("update-contact-msg").value);
        console.log(contactMsg);
  
        //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
        updateForm(contactId, contactName, contactEmail, contactMsg);
      }); //end updatecontactform listener
  
    //[STEP 13]: Function that makes an AJAX call and processes it
    // UPDATE Based on the ID chosen
    function updateForm(id, contactName, contactEmail, contactMsg) {
      //@TODO create validation methods for id etc.
  
      var jsondata = {
        name: contactName,
        email: contactEmail,
        message: contactMsg,
      };
      var settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(jsondata),
      };
  
      //[STEP 13a]: Send our AJAX request and hide the update contact form
      fetch("https://fedassg2-b5f5.restdb.io/rest/game/${id}", settings)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          document.getElementById("update-contact-container").style.display =
            "none";
          // Update our contacts table
          getContacts();
        });
    }
  
    // Function to delete a contact record
    function deleteForm(id) {
      //@TODO create validation methods for id etc.
  
      let settings = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
      };
      //[STEP 13a]: Send our AJAX request and hide the update contact form
      fetch("https://fedassg2-b5f5.restdb.io/rest/game/${id}", settings)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          getContacts();
        });
    } //end deleteForm function