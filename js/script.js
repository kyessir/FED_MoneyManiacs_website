/*const container = document.getElementById('my-lottie-container');
const player = new dotlottiePlayer({
  src: "https://lottie.host/0787b29e-4c94-47fb-a28f-4656fab0e1fc/5l7L8h62nW.json",
  background: 'transparent',
  speed: 1,
  loop: true,
  autoplay: true,
});
container.appendChild(player);
const p = document.getElementById('lottie-player');
p.addEventListener('click', openSidebar);
*/
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
