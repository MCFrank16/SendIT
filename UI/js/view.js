// Get the modal
const modall = document.getElementById('ViewM');

// Get the button that opens the modal
const btnn = document.getElementById('btn1');

// Get the <span> element that closes the modal
const spann = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn1.onclick = function () {
  modall.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
spann.onclick = function () {
  modall.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modall) {
    modall.style.display = 'none';
  }
};
