function sliders({ container, slide, nextArrow, prevArrow,
    totalCounter, currentCounter, wrapper, field }) {
    //Sliders
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function addZeroToNum() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else { current.textContent = slideIndex; }

    };

    function showActiveDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    function toNum(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == toNum(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += toNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`
        if (slideIndex == slides.length) {
            slideIndex = 1
        } else { slideIndex++; };

        addZeroToNum();
        showActiveDot();
    });
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = toNum(width) * (slides.length - 1);
        } else {
            offset -= toNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`
        if (slideIndex == 1) {
            slideIndex = slides.length
        } else { slideIndex--; }

        addZeroToNum();
        showActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = toNum(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            addZeroToNum();
            showActiveDot();
        });
    });
}
export default sliders;
