document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to the radio buttons
  document.querySelectorAll("input[type='radio']").forEach(function (radio) {
    radio.addEventListener("change", calculateAndDisplayProfileValue);
  });
});

function calculateAndDisplayProfileValue() {
  // Recalculate the profile value whenever a radio button changes
  var profileValue = calculateProfileValue();

  // Update the label with the calculated total value
  document.getElementById("calculatedValue").textContent = profileValue.toFixed(2);

  
}

function calculateProfileValue() {
  // Initialize the profile value
  var profileValue = 0;

  // Define scoring for quiz options from the first section
  var question1Options = {
    "question1Option1": 1,
    "question1Option2": 2,
    "question1Option3": 3
  };

  var question2Options = {
    "question2Option1": 1,
    "question2Option2": 2,
    "question2Option3": 3
  };

  var question3Options = {
    "question3Option1": 1,
    "question3Option2": 2,
    "question3Option3": 3
  };

  var question4Options = {
    "question4Option1": 1,
    "question4Option2": 2,
    "question4Option3": 3
  };

  var question5Options = {
    "question5Option1": 1,
    "question5Option2": 2,
    "question5Option3": 3,
    "question5Option4": 4
  };

  // Sum up the values of selected options from the first section
  Object.keys(question1Options).forEach(function(option) {
    if (document.getElementById(option).checked) {
      profileValue += question1Options[option];
    }
  });

  Object.keys(question2Options).forEach(function(option) {
    if (document.getElementById(option).checked) {
      profileValue += question2Options[option];
    }
  });

  Object.keys(question3Options).forEach(function(option) {
    if (document.getElementById(option).checked) {
      profileValue += question3Options[option];
    }
  });

  Object.keys(question4Options).forEach(function(option) {
    if (document.getElementById(option).checked) {
      profileValue += question4Options[option];
    }
  });

  Object.keys(question5Options).forEach(function(option) {
    if (document.getElementById(option).checked) {
      profileValue += question5Options[option];
    }
  });

  // Get the selected options for each question from the second section
  var incomeStability = parseFloat(document.querySelector("input[name='incomeStability']:checked").id.replace("incomeStability", ""));
  var investmentHorizon = parseFloat(document.querySelector("input[name='investmentHorizon']:checked").id.replace("investmentHorizon", ""));
  var expectedReturn = parseFloat(document.querySelector("input[name='expectedReturn']:checked").id.replace("expectedReturn", ""));
  var experience = parseFloat(document.querySelector("input[name='experience']:checked").id.replace("experience", ""));
  var knowledge = parseFloat(document.querySelector("input[name='knowledge']:checked").id.replace("knowledge", ""));

  // Assign weights to the factors from the second section as needed
  var weightIncomeStability = 2;
  var weightInvestmentHorizon = 2;
  var weightExpectedReturn = 2;
  var weightExperience = 2;
  var weightKnowledge = 2;

  // Combine the values from both sections, applying weights if necessary
  profileValue += incomeStability * weightIncomeStability;
  profileValue += investmentHorizon * weightInvestmentHorizon;
  profileValue += expectedReturn * weightExpectedReturn;
  profileValue += experience * weightExperience;
  profileValue += knowledge * weightKnowledge;

  // Return the calculated profile value
  return profileValue;
}






