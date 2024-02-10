// Check orientation on page load
window.addEventListener("load", checkOrientation);

// Check orientation on window resize
window.addEventListener("resize", checkOrientation);

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    // If height is greater than width, show warning
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.rotate-warning').style.display = 'block';
  } else {
    // If width is greater than height, show content
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.rotate-warning').style.display = 'none';
  }
}