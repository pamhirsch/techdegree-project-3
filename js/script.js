// set the name input field to be in focus when the page loads
window.onload = function() {
  document.getElementById('name').focus();
};

// set global variables
const colorSelect = document.getElementById('color');
const jobSelect = document.getElementById('title');
const colorDiv = document.querySelector('div#colors-js-puns');
const designSelect = document.getElementById('design');
const totalCostDisplay = document.createElement('h3');
const activitiesList = document.querySelector('fieldset.activities');
const paymentSelect = document.getElementById('payment');
const nameSelect = document.getElementById('name');
let nameErrMsg = null;
let totalCost = 0;

/*
* When the page content is loaded do the following:
* 1. Find the "Select Theme" option in the Design dropdown and hide it.
* 2. Choose the next option in the Design dropdown and make it the default.
* 3. Hide all the options in the Color dropdown.
* 4. Add an option to the Color dropdown that says "Please select a T-shirt theme"
*    and make it the default.
*/

window.addEventListener("DOMContentLoaded", function() {

  // for (let y = 0; y < designSelect.options.length; y += 1) {
  //   if (designSelect.options[y].text === 'Select Theme') {
  //     designSelect.options[y].hidden = true;
  //   } else {
  //     designSelect.options[y].selected = true;
  //     break;
  //   }
  // }

  for (let i = 0; i < colorSelect.options.length; i += 1 ) {
    colorSelect.options[i].hidden = true;
  }

  const selectThemeText = document.createElement('option');
  selectThemeText.innerHTML = 'Please select a T-shirt theme';
  selectThemeText.value = 'pleaseSelect';
  selectThemeText.selected = true;
  colorSelect.appendChild(selectThemeText);
});

// hide the "Other Job Role" input field at the beginning
const otherJobInput = document.getElementById('other-title') ;
if (otherJobInput) {
  otherJobInput.style.display = 'none';
}

// hide the color label and selection upon page load (exceeds)
function hideColorInfo() {
  colorDiv.style.display = 'none';
}
hideColorInfo();

// set all the activities to active by removing any disabled statuses
function clearActivities() {
  const activityList = document.querySelectorAll('input[type=checkbox]');
  for (let i = 0; i < activityList.length; i += 1) {
    activityList[i].disabled = false;
    let activityLabel = activityList[i].parentNode;
    activityLabel.style.color = "#000000";
  }
}

// append the DOM element for the total cost information to the Activities
// section

const activitiesSection = document.querySelector('fieldset.activities');
activitiesSection.appendChild(totalCostDisplay);

const creditCardText = document.querySelector('div.credit-card');
const paypalText = document.querySelector('div.paypal');
const bitcoinText = document.querySelector('div.bitcoin');

function hideSelectPayment() {
// hide the 'select payment option' from the dropdown on page load and reset
  for (let i = 0; i < paymentSelect.length; i += 1) {
    const paymentOption = paymentSelect[i].text;
    if (paymentOption == 'Select Payment Method') {
      paymentSelect[i].hidden = true;
    } else if (paymentOption == 'Credit Card') {
      paymentSelect[i].selected = true;
    }
  }
  creditCardText.style.display = 'inherit';
  paypalText.style.display = 'none';
  bitcoinText.style.display = 'none';
}

hideSelectPayment();

/*
* The chooseColor function accepts a parameter for the type of tshirt
* to show. It loops through all the tshirt color choices and if it
* finds a match on the type, it sets hidden to false (makes it show).
* If there is no match, it sets the color option to hidden. Finally,
* it loops through the options again and as soon as it finds the first
* non-hidden option, it makes it the default and leaves the loop.
*/
function chooseColor(type) {
  for(let i = 0; i < colorSelect.length; i +=1) {
    let option = colorSelect[i].text;
    if (option.includes(type)) {
      colorSelect[i].hidden = false;
    } else {
      colorSelect[i].hidden = true;
    }
  }

  for(let i = 0; i < colorSelect.length; i +=1) {
    if (colorSelect[i].hidden === false) {
      colorSelect[i].selected = true;
      break;
    }
  }
}

/*
* The runValid function runs all the individual validation functions
* and returns either true (all validations passed) of false if at
* least 1 validation fails.
*/

function runValidation() {
  const nameTest = validateName();
  const emailTest = validateEmail();
  const activitiesTest = validateActivities();
  const paymentChoices = document.getElementById('payment');
  let ccTest = true;
  for (let i = 0; i < paymentChoices.length; i += 1) {
    let paymentChoice = paymentChoices[i].text;
    if (paymentChoice == 'Credit Card' && paymentChoices[i].selected) {
      const ccNumbTest = validateCreditCard();
      const zipTest = validateZipCode();
      const cvvTest = validateCVV();
      if (ccNumbTest != true || zipTest != true || cvvTest != true) {
        ccTest = false;
      }
    }
  }
  if (nameTest != true || emailTest != true || activitiesTest != true || ccTest != true) {
    return false;
  } else {
    return true;
  }
}

/*
* The validateName function is part of the original (not exceeds) code.
* If checks the name input to make sure that only letter, spaces or
* periods are entered. Returns true for pass and false for fail.
*/

function validateName() {
  event.preventDefault();
  const nameRegex = /^[A-Za-z\.\s]+$/;
  const nameValue = document.getElementById('name').value;
  const nameResultPass = nameRegex.test(nameValue);
  nameErrMsg = document.querySelector('p.name-error-msg');
  if (nameErrMsg != null) {
    nameErrMsg.parentNode.removeChild(nameErrMsg);
  }
  if (nameResultPass == false) {
    const errMsg = document.createElement('p');
    const errMsgPlacement = document.getElementById('name');
    errMsg.classList = 'name-error-msg err-msg';
    errMsg.innerHTML = '***Name cannot be blank.***';
    errMsgPlacement.before(errMsg);
    return false;
  } else {
    return true;
  }

}

/*
* The isValidUsername function tests that any content entered in
* the name field is either a letter, spaces or
* periods. Returns true for pass and false for fail.
*/
function isValidUsername(name) {
  return /^[A-Za-z\.\s]+$/.test(name);
}

/*
* The ishowOrRemoveTip function is an Exceeds Expectations bit of
* code. It is called by the createListener function to display
* tooltip messages and the viewer enters data in the Name input
* field. It accepts 3 parameters - show, message and element.
* Show will be true if the data does not pass validation, message
* is the specific message to show, and element is the field being
* valdiated. The original code for this came from the Team Treehouse
* class - Regular Expressions in JavaScript - Validating a Username.
* If show is true and a message has not already been displayed, a
* new message will be displayed. If show is false (meaning the input
* field has been validated) and there is an existing message, the
* message will be removed.
*/

function showOrRemoveTip(show, message, element) {
  if (nameErrMsg != null) {
    nameErrMsg.parentNode.removeChild(nameErrMsg);
  }
  const tipMessage = document.createElement('p');
  tipMessage.classList = 'tooltip';
  const tipErrMsg = document.querySelector("p.tooltip");
  if (show && tipErrMsg == null) {
    tipMessage.innerHTML = message;
    element.before(tipMessage);
  } else if( show == false && tipErrMsg != null) {
    tipErrMsg.parentNode.removeChild(tipErrMsg);
  }
}

function createListener(validator) {
  return e => {
    const inputElement = e.target;
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const toolTipMsg = `Please enter only letters, spaces, and periods.`;
    showOrRemoveTip(showTip, toolTipMsg, inputElement);
  };
}

// event listener for data input into the name input field
nameSelect.addEventListener("input", createListener(isValidUsername));

/*
* The validateEmail function validates the content entered into the
* email field. It must be any number of letters (upper and lower case
* allowed), followed by an '@', followed by any number of letters
* (upper and lower case allowed), followed by a period and then
* letters, etc. If an error message has already been displayed for
* the field, it will be removed. If the validation has not passed
* a new error message will be displayed and false indicating a failure
* is passed to the calling function. Otherwis no error message is displayed
* and true for pass is returned.
*/

function validateEmail() {
  event.preventDefault();
  const emailRegex = /^[A-Za-z0-9]*[@][A-Za-z0-9]*\.\w+$/;
  const emailValue = document.getElementById('mail').value;
  const emailResultPass = emailRegex.test(emailValue);
  const emailErrMsg = document.querySelector('p.email-error-msg');
  if (emailErrMsg != null) {
    emailErrMsg.parentNode.removeChild(emailErrMsg);
  }
  if (emailResultPass == false) {
    const errMsg = document.createElement('p');
    const errMsgPlacement = document.getElementById('mail');
    errMsg.classList = 'email-error-msg err-msg';
    errMsg.innerHTML = '***Please enter a valid email address.***';
    errMsgPlacement.before(errMsg);
    return false;
  } else {
    return true;
  }

}

/*
* The validateActivities function checks to make sure that at least
* one activity has been chosen to pass. If an error message has already
* been displayed for the selection, it will be removed.
* If the validation has not passed
* a new error message will be displayed and false indicating a failure
* is passed to the calling function. Otherwise no error message is displayed
* and true for pass is returned.
*/

function validateActivities() {
  event.preventDefault();
  const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
  let checkBoxValidated = false;
  const activityErrMsg = document.querySelector('p.activity-error-msg');
  for (let i = 0; i < checkBoxes.length; i += 1) {
    if (checkBoxes[i].checked) {
      checkBoxValidated = true;

      if (activityErrMsg != null) {
        activityErrMsg.parentNode.removeChild(activityErrMsg);
      }
      return true;
    }
  }

  if (activityErrMsg == null) {
    const errMsg = document.createElement('p');
    const errMsgPlacement = document.querySelector('fieldset.activities legend');
    errMsg.classList = 'activity-error-msg err-msg';
    errMsg.innerHTML = '***Please choose at least one activity.***';
    errMsgPlacement.after(errMsg);
  }
  return false;
}

/*
* The validateCreditCard function validates the content entered into the
* cc field. It must be only numbers and there must be between 13 and 16
* of them to pass. If an error message has already been displayed for
* the field, it will be removed. If the validation has not passed
* a new error message will be displayed and false indicating a failure
* is passed to the calling function. Otherwise no error message is displayed
* and true for pass is returned.
* Additionally, one of two different messages could be displayed based
* on whether the field is empty or not.
*/

function validateCreditCard() {
  event.preventDefault();
  const ccRegex = /^[0-9]{13,16}$/;
  const ccValue = document.getElementById('cc-num').value;
  const ccResultPass = ccRegex.test(ccValue);
  const ccErrMsg = document.querySelector('p.cc-error-msg');
  if (ccErrMsg != null) {
    ccErrMsg.parentNode.removeChild(ccErrMsg);
  }
  if (ccResultPass == false) {
    const errMsg = document.createElement('p');
    const errMsgPlacement = document.querySelector('div.credit-card');
    errMsg.classList = 'cc-error-msg err-msg';
    if (ccValue == '') {
      errMsg.innerHTML = '***Please enter a credit card number.***';
    } else {
      errMsg.innerHTML = '***Credit card number must be between 13 and 16 digits.***';
    }
    errMsgPlacement.before(errMsg);
    return false;
  } else {
    return true;
  }

}

/*
* The validateZipCode function validates the content entered into the
* zip field. It must be only numbers and there must be exactly 5
* of them to pass. If an error message has already been displayed for
* the field, it will be removed. If the validation has not passed
* a new error message will be displayed and false indicating a failure
* is passed to the calling function. Otherwise no error message is displayed
* and true for pass is returned.
*/

function validateZipCode() {
  event.preventDefault();
  const zipRegex = /^[0-9]{5}$/;
  const zipValue = document.getElementById('zip').value;
  const zipResultPass = zipRegex.test(zipValue);
  const zipErrMsg = document.querySelector('p.zip-error-msg');
  if (zipErrMsg != null) {
    zipErrMsg.parentNode.removeChild(zipErrMsg);
  }

  if (zipResultPass == false) {
    const errMsg = document.createElement('p');
    const errMsgPlacement = document.querySelector('div.credit-card');
    errMsg.classList = 'zip-error-msg err-msg';
    errMsg.innerHTML = '***Zip code must be 5 digits.***';
    errMsgPlacement.before(errMsg);
    return false;
  } else {
    return true;
  }

}

/*
* The validateCVV function validates the content entered into the
* CVV field. It must be only numbers and there must be exactly 3
* of them to pass. If an error message has already been displayed for
* the field, it will be removed. If the validation has not passed
* a new error message will be displayed and false indicating a failure
* is passed to the calling function. Otherwise no error message is displayed
* and true for pass is returned.
*/

function validateCVV() {
  event.preventDefault();
  const cvvRegex = /^[0-9]{3}$/;
  const cvvValue = document.getElementById('cvv').value;
  const cvvResultPass = cvvRegex.test(cvvValue);
  const cvvErrMsg = document.querySelector('p.cvv-error-msg');
  if (cvvErrMsg != null) {
    cvvErrMsg.parentNode.removeChild(cvvErrMsg);
  }
  if (cvvResultPass == false) {
    const errMsg = document.createElement('p');
    const errMsgPlacement = document.querySelector('div.credit-card');
    errMsg.classList = 'cvv-error-msg err-msg';
    errMsg.innerHTML = '***CVV code must be 3 digits.***';
    errMsgPlacement.before(errMsg);
    return false;
  } else {
    return true;
  }

}

/*
* Listens for a selection of "Other" in the Job Role field. If "Other"
* is selected, it shows the Other Job Role input field which was hidden
* earlier.
*/

jobSelect.addEventListener('change', (event) => {
  if (event.target.value === "other") {
    otherJobInput.style.display = 'inherit';
  } else {
    otherJobInput.style.display = 'none';
  }
});

/*
* Listens for a change in the Design dropdown box. On change,
* it calls the chooseColor function based on the choice made.
*/

designSelect.addEventListener('change', (event) => {
  colorDiv.style.display = 'inherit';
  if (event.target.value === "js puns") {
    chooseColor("JS Puns");
  } else if (event.target.value === "heart js") {
    chooseColor("JS shirt");
  }
});

/*
* Listens for a click in the Design dropdown box. On click,
* it calls the chooseColor function based on the choice made.
*/

designSelect.addEventListener('click', (event) => {
  colorDiv.style.display = 'inherit'
  if (event.target.value === "js puns") {
    chooseColor("JS Puns");
  } else if (event.target.value === "heart js") {
    chooseColor("JS shirt");
  }
});

/*
* Listens for a click in the Activities checkboxes. On click,
* the arrow function checks to see if clicked element is a checkbox.
* If yes, it gets data about day/time and cost for the clicked
* event. If the event has been clicked on, the total cost field
* is incremented. If clicked off, the total cost field is decremented.
* The function then next checks to see if there are any other events
* that have been chosen already that match the day/time of the newly
* chosen event. If there is, the newly chosen event is selected and
* the matching event is disabled and unchecked.
*/

activitiesSection.addEventListener('click', (event) => {
  let chosenActivityType = event.target.type;
  let chosenActivity = event.target;
  totalCostDisplay.style.display = 'inherit';
  if (chosenActivityType == 'checkbox') {
    let chosenActivityTime = chosenActivity.getAttribute('data-day-and-time');
    let activityCost = parseInt(chosenActivity.getAttribute('data-cost'));
    let activitiesCheckBoxes = activitiesList.getElementsByTagName('input');
    if (chosenActivity.checked == true) {
      totalCost += activityCost;
      for(let i = 0; i < activitiesCheckBoxes.length; i += 1) {
        let activityCheckBox = activitiesCheckBoxes[i];
        let activityTime = activityCheckBox.getAttribute('data-day-and-time');
        if (activityTime == chosenActivityTime && activityCheckBox != chosenActivity) {
          activityCheckBox.disabled = true;
          let activityLabel = activityCheckBox.parentNode;
          activityLabel.style.color = "#666666";
        }
      }
    } else if (chosenActivity.checked == false) {
      totalCost -= activityCost;
      for(let i = 0; i < activitiesCheckBoxes.length; i += 1) {
        let activityCheckBox = activitiesCheckBoxes[i];
        let activityTime = activityCheckBox.getAttribute('data-day-and-time');
        if (activityTime == chosenActivityTime && activityCheckBox != chosenActivity) {
          activityCheckBox.disabled = false;
          let activityLabel = activityCheckBox.parentNode;
          activityLabel.style.color = "#000000";
        }
      }
    }

  totalCostDisplay.innerHTML = `Total $${totalCost}`;
  }
});

/*
* Listens for a click in the Payment dropdown box. If a choice is made
* the listener function checks to see what option was selected. based
* on the selection, it displays the correct payment fields.
*/

paymentSelect.addEventListener('change', (event) => {
  let chosenPaymentType = event.target.value;
  if (chosenPaymentType == 'paypal') {
    creditCardText.style.display = 'none';
    bitcoinText.style.display = 'none';
    paypalText.style.display = 'inherit';
  } else if (chosenPaymentType == 'bitcoin') {
    creditCardText.style.display = 'none';
    bitcoinText.style.display = 'inherit';
    paypalText.style.display = 'none';
  } else if (chosenPaymentType == 'credit card') {
    creditCardText.style.display = 'inherit';
    bitcoinText.style.display = 'none';
    paypalText.style.display = 'none';
  }
});

/*
* Listens for a change in the Payemnt dropdown box. On change,
* if there are any error messages displayed, remove them.
*/

paymentSelect.addEventListener('change', (event) => {
  const ccErrMsg = document.querySelector('p.cc-error-msg');
  const zipErrMsg = document.querySelector('p.zip-error-msg');
  const cvvErrMsg = document.querySelector('p.cvv-error-msg');
  if (ccErrMsg !=null) {
    ccErrMsg.parentNode.removeChild(ccErrMsg);
  }
  if (zipErrMsg !=null) {
    zipErrMsg.parentNode.removeChild(zipErrMsg);
  }
  if (cvvErrMsg !=null) {
    cvvErrMsg.parentNode.removeChild(cvvErrMsg);
  }

});

/*
* Listens for a submit event on the form. The master validation fumction
* is called. If true is returned (all validations pass) the form is
* reset. Otherwise nothing happens.
*/

const formElement = document.querySelector('form');
formElement.addEventListener('submit', (event) => {
  const formValidationTest = runValidation();
  if (formValidationTest) {
    formElement.reset();
    hideSelectPayment();
    hideColorInfo();
    clearActivities();
    totalCostDisplay.style.display = 'none';
    totalCost = 0;
    document.getElementById('name').focus();
  } else {
    event.preventDefault();
  }
});
