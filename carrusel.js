let slideIndex = 0;

// Función para mostrar la diapositiva actual
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-images img');
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

// Función para cambiar de diapositiva manualmente
function changeSlide(n) {
    const slides = document.querySelectorAll('.carousel-images img');
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(slideIndex);
}

// Cambia la imagen automáticamente cada 3 segundos
setInterval(() => {
    changeSlide(1);
}, 3000);

// Muestra la primera imagen al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showSlide(slideIndex);
});
