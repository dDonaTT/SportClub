let slideIndex = 0;
const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slide');

function showSlides() {
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

document.querySelector('.next').addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slideImages.length;
    showSlides();
});

document.querySelector('.prev').addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slideImages.length) % slideImages.length;
    showSlides();
});

showSlides();
