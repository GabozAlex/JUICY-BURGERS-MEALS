document.addEventListener('DOMContentLoaded', function() {
    const carruselSlide = document.querySelector('.carrusel-slide');
    const images = document.querySelectorAll('.carrusel-slide img');

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let counter = 0;
    const size = images[0].clientWidth; // Ancho de cada imagen

    // Configura el carrusel para que la primera imagen sea visible
    carruselSlide.style.transform = `translateX(${-size * counter}px)`;

    // Botón siguiente
    nextBtn.addEventListener('click', () => {
        if (counter >= images.length - 1) return; // Evita que se desplace más allá de la última imagen
        counter++;
        carruselSlide.style.transition = "transform 0.5s ease-in-out";
        carruselSlide.style.transform = `translateX(${-size * counter}px)`;
    });

    // Botón anterior
    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return; // Evita que se desplace más allá de la primera imagen
        counter--;
        carruselSlide.style.transition = "transform 0.5s ease-in-out";
        carruselSlide.style.transform = `translateX(${-size * counter}px)`;
    });

    // Cambio automático de imágenes cada 5 segundos
    setInterval(() => {
        if (counter >= images.length - 1) {
            counter = 0; // Vuelve a la primera imagen
        } else {
            counter++;
        }
        carruselSlide.style.transition = "transform 0.5s ease-in-out";
        carruselSlide.style.transform = `translateX(${-size * counter}px)`;
    }, 5000); // Cambia la imagen cada 5 segundos
});