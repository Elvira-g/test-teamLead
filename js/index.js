const menuBtn = document.querySelector('.nav__btn');
const menuBlock = document.querySelector('.nav__menu');
const menuItem = document.querySelectorAll('.menu__link');

const sections = document.querySelectorAll('section');

const contactBtns = document.querySelectorAll('.call');
const contactForm = document.querySelector('.form')

//mobile menu

menuBtn.addEventListener('click', function () {
    if(this.classList.contains('is-active')){
        closeMenuBtn(this);
    } else {
        openMenuBtn(this);
    }
})

menuItem.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        if (screen.width <= 812) {
            if(menuBtn.classList.contains('is-active')){
                closeMenuBtn(menuBtn);
            } else {
                openMenuBtn(menuBtn);
            }  
        }
    })
})

function closeMenuBtn(btn) {
    btn.classList.remove('is-active');
    menuBlock.classList.remove('open')
}

function openMenuBtn(btn) {
    btn.classList.add('is-active');
    menuBlock.classList.add('open')
    
}

//scroll to contacts

contactBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
       scrollToBlock(contactForm); 
    })
})

function scrollToBlock(block) {
    const height = block.offsetTop;
    window.scroll(0, height);
}

//slider

const slides = document.querySelector('.slider__wrapper');
const slideArray = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

const slider = document.querySelector('.slider')

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

slideArray.forEach((slide, index) => {
    const slideImage = slide.querySelector('img');

    if (slideImage) {
        slideImage.addEventListener('dragstart', (e) => e.preventDefault());
    }
   
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        setPositionByIndex();
        updateDots();
    });
});

window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

function touchStart(index) {
    return function (event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
    };
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slideArray.length - 1) {
        currentIndex += 1;
    }

    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
    }

    setPositionByIndex();
    updateDots();
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slides.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -(slider.clientWidth + 20);
    prevTranslate = currentTranslate;
    setSliderPosition();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

updateDots();

//timer

const minutesDisplay = document.querySelector('.min');
const secondsDisplay = document.querySelector('.sec');

let totalSeconds = 30 * 60;

function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');

    if (totalSeconds > 0) {
        totalSeconds--;
    } else {
        clearInterval(timerInterval);
    }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

//form

const nameInput = document.querySelector('.name');
const phoneInput = document.querySelector('.phone');
const nameTooltip = document.querySelector('.name-tooltip');
const phoneTooltip = document.querySelector('.phone-tooltip');

nameInput.addEventListener('focus', () => {
    nameTooltip.style.display = 'block';
});

nameInput.addEventListener('blur', () => {
    nameTooltip.style.display = 'none';
});

phoneInput.addEventListener('focus', () => {
    phoneTooltip.style.display = 'block';
});

phoneInput.addEventListener('blur', () => {
    phoneTooltip.style.display = 'none';
});

phoneInput.addEventListener('input', el => {
    el.target.value = el.target.value.replace(/[^0-9+]/g, ''); 
});