window.onload = function() {
  document.getElementById('name').focus();
};

const colorSelect = document.getElementById('color');
const jobSelect = document.getElementById('title');
const colorDiv = document.querySelector('div#colors-js-puns');
const designSelect = document.getElementById('design');

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
  selectThemeText.value = 'selecttheme';
  selectThemeText.selected = true;
  colorSelect.appendChild(selectThemeText);
});

// hide the "Other Job Role" input field at the beginning
const otherJobInput = document.getElementById('other-title') ;
if (otherJobInput) {
  otherJobInput.style.display = 'none';
}

function chooseColor(type) {
  for(let i = 0; i < colorSelect.length; i +=1) {
    let option = colorSelect[i].text;
    if (option.includes(type)) {
      colorSelect[i].style.display = "inherit";
      colorSelect[i].classList = "show-color";
    } else {
      colorSelect[i].style.display = "none";
      colorSelect[i].classList = "hide-color";
    }
  }
}

jobSelect.addEventListener('change', (event) => {
  if (event.target.value === "other") {
    otherJobInput.style.display = 'inherit';
  } else {
    otherJobInput.style.display = 'none';
  }
});

designSelect.addEventListener('change', (event) => {
  if (event.target.value === "js puns") {
    colorDiv.style.display = "inherit";
    chooseColor("JS Puns");
  } else if (event.target.value === "heart js") {
    colorDiv.style.display = "inherit";
    chooseColor("JS shirt");
  } else {
    colorDiv.style.display = "none";
  }
});
