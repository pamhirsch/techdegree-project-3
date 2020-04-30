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

  for (let y = 0; y < designSelect.options.length; y += 1) {
    if (designSelect.options[y].text === 'Select Theme') {
      designSelect.options[y].hidden = true;
    } else {
      designSelect.options[y].selected = true;
      break;
    }
  }

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

// append the DOM element for the total cost information to the Activities
// section

const activitiesSection = document.querySelector('fieldset.activities');
activitiesSection.appendChild(totalCostDisplay);

// hide the 'select payment option' from the dropdown on page load
for (let i = 0; i < paymentSelect.length; i += 1) {
  const paymentOption = paymentSelect[i].text;
  if (paymentOption == 'Select Payment Method') {
    paymentSelect[i].hidden = true;
  } else if (paymentOption == 'Credit Card') {
    paymentSelect[i].selected = true;
  }
}

/*
* Hide payment info that is not related to the Credit Card payment
* choice (made default above) on page load.
*/

const creditCardText = document.querySelector('div.credit-card');
const paypalText = document.querySelector('div.paypal');
const bitcoinText = document.querySelector('div.bitcoin');
paypalText.style.display = 'none';
bitcoinText.style.display = 'none';

/*
* The chooseColor option accepts a parameter for the type of tshirt
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
  if (event.target.value === "js puns") {
    chooseColor("JS Puns");
  } else if (event.target.value === "heart js") {

    chooseColor("JS shirt");
  }
});

/*
* Listens for a click in the Activities checkboxes. On click,
* add text.
*/

activitiesSection.addEventListener('click', (event) => {
  let chosenActivityType = event.target.type;
  let chosenActivity = event.target;
  if (chosenActivityType == 'checkbox') {
    let chosenActivityTime = chosenActivity.getAttribute('data-day-and-time');
    let activityCost = parseInt(chosenActivity.getAttribute('data-cost'));
    let activitiesCheckBoxes = activitiesList.getElementsByTagName('input');
    if (chosenActivity.checked == true) {
      totalCost += activityCost;
    } else if (chosenActivity.checked == false) {
      totalCost -= activityCost;
    }

  for(let i = 0; i < activitiesCheckBoxes.length; i += 1) {
    let activityCheckBox = activitiesCheckBoxes[i];
    let activityTime = activityCheckBox.getAttribute('data-day-and-time');
    if (activityTime == chosenActivityTime && activityCheckBox != chosenActivity) {
      if (activityCheckBox.checked && chosenActivity.checked) {
        activityCheckBox.checked = false;
        activityCheckBox.disabled = true;
        totalCost -= activityCost;
      } else if (activityCheckBox.disabled && chosenActivity.checked == false) {
        activityCheckBox.disabled = false;
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
