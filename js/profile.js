document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to the checkboxes
  document.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
    checkbox.addEventListener("click", calculateAndDisplayProfileValue);
  });

  // Add event listeners to the text fields
  document.querySelectorAll("input[type='text']").forEach(function (textField) {
    textField.addEventListener("input", calculateAndDisplayProfileValue);
  });
});

function calculateAndDisplayProfileValue() {
  // Recalculate the profile value whenever a checkbox or text field changes
  var profileValue = calculateProfileValue();
  
  // Get the values from the text fields
  var incomeStability = parseFloat(document.getElementById("incomestability").value) || 0;
  var incomeGrowth = parseFloat(document.getElementById("incomegrowth").value) || 0;
  var investmentHorizon = parseFloat(document.getElementById("investmentHorizon").value) || 0;
  var expectedReturn = parseFloat(document.getElementById("expectedreturn").value) || 0;
  var experience = parseFloat(document.getElementById("experience").value) || 0;
  var knowledge = parseFloat(document.getElementById("knowledge").value) || 0;
  
  // Calculate the total value based on text field inputs
  var totalValue = profileValue * incomeStability * incomeGrowth * investmentHorizon * expectedReturn * experience * knowledge;
  
  // Update the label with the calculated total value
  document.getElementById("calculatedValue").textContent = totalValue.toFixed(2);
}

function calculateProfileValue() {
  // Initialize the profile value to 15
  var profileValue = 15;
  
  // Get the selected options for each question
  var question1Option1 = document.getElementById("question1Option1").checked;
  var question1Option2 = document.getElementById("question1Option2").checked;
  var question1Option3 = document.getElementById("question1Option3").checked;
  var question2Option1 = document.getElementById("question2Option1").checked;
  var question2Option2 = document.getElementById("question2Option2").checked;
  var question2Option3 = document.getElementById("question2Option3").checked;
  var question3Option1 = document.getElementById("question3Option1").checked;
  var question3Option2 = document.getElementById("question3Option2").checked;
  var question3Option3 = document.getElementById("question3Option3").checked;
  var question4Option1 = document.getElementById("question4Option1").checked;
  var question4Option2 = document.getElementById("question4Option2").checked;
  var question4Option3 = document.getElementById("question4Option3").checked;
  var question5Option1 = document.getElementById("question5Option1").checked;
  var question5Option2 = document.getElementById("question5Option2").checked;
  var question5Option3 = document.getElementById("question5Option3").checked;
  var question5Option4 = document.getElementById("question5Option4").checked;
  
  // Adjust the profile value based on the selected options
  if (question1Option3) {
    profileValue *= 1.1; // Go as scheduled option
  } else if (question1Option2) {
    profileValue *= 1.05; // Take a much more modest vacation option
  } else if (question1Option1) {
    profileValue *= 1; // Cancel the vacation option (no change)
  }
  
  if (question2Option3) {
    profileValue *= 1.05; // Invest in stocks or stock mutual funds option
  } else if (question2Option1) {
    profileValue *= 1.1; // Deposit it in a bank account, money market account, or an insured CD option
  } else if (question2Option2) {
    profileValue *= 1.05; // Invest it in safe high-quality bonds or bond mutual funds option
  }
  
  if (question3Option3) {
    profileValue *= 1.1; // Very comfortable option
  } else if (question3Option2) {
    profileValue *= 1.05; // Somewhat comfortable option
  } else if (question3Option1) {
    profileValue *= 1; // Not at all comfortable option
  }
  
  if (question4Option1) {
    profileValue *= 1.1; // Option 1
  } else if (question4Option2) {
    profileValue *= 1.05; // Option 2
  } else if (question4Option3) {
    profileValue *= 1.05; // Option 3
  }
  
  if (question5Option1) {
    profileValue *= 1.1; // Option 1
  } else if (question5Option2) {
    profileValue *= 1.05; // Option 2
  } else if (question5Option3) {
    profileValue *= 1.05; // Option 3
  } else if (question5Option4) {
    profileValue *= 1.1; // Option 4
  }
  
  // Return the calculated profile value
  return profileValue;
}


