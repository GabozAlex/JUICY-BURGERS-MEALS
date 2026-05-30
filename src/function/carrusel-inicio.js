document.addEventListener('DOMContentLoaded', function() {
    const carruselSlide = document.querySelector('.carrusel-slide');
    const images = document.querySelectorAll('.carrusel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let counter = 0;
    let size = 0;

    function updateSize() {
        size = images[0].offsetWidth || 1;
        carruselSlide.style.transition = 'none';
        carruselSlide.style.transform = `translateX(${-size * counter}px)`;
    }

    function goTo(index) {
        counter = index;
        carruselSlide.style.transition = 'transform 0.5s ease-in-out';
        carruselSlide.style.transform = `translateX(${-size * counter}px)`;
    }

    if (document.readyState === 'complete') {
        updateSize();
    } else {
        window.addEventListener('load', updateSize);
    }
    window.addEventListener('resize', updateSize);

    nextBtn.addEventListener('click', () => {
        goTo(counter >= images.length - 1 ? 0 : counter + 1);
    });

    prevBtn.addEventListener('click', () => {
        goTo(counter <= 0 ? images.length - 1 : counter - 1);
    });

    setInterval(() => {
        goTo(counter >= images.length - 1 ? 0 : counter + 1);
    }, 5000);
});
