window.onload = function() {
  document.getElementById('name').focus();
};

const jobSelect = document.getElementById('title');

// hide the "Other Job Role" input field at the beginning
const otherJobInput = document.getElementById('other-title') ;
if (otherJobInput) {
  otherJobInput.style.display = 'none';
}

jobSelect.addEventListener('change', (event) => {
  if (event.target.value === "other") {
    otherJobInput.style.display = 'inherit';
  } else {
    otherJobInput.style.display = 'none';
  }
});
