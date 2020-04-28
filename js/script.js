window.onload = function() {
  document.getElementById('name').focus();
};

// hide the "Other Job Role" input field at the beginning
const otherJobInput = document.getElementById('other-title') ;

if (otherJobInput) {
  otherJobInput.style.display = 'none';
}
