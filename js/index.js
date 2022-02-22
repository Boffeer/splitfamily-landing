const pricingSliderClass = ".pricing-slider";
const pricingSliderSettings = {
  breakpoints: {
    // when window width is >= 992px
    // init: false,
    992: {
      // init: true,
      autoHeight: true,
      spaceBetween: 30,
      slidesPerView: 3,
      edgeSwipeThreshold: 0,
      navigation: {
        nextEl: ".pricing-slider__button-next",
        prevEl: ".pricing-slider__button-prev",
      },
      allowSlideNext: false,
      allowSlidePrev: false,
    },
  },
};
if (
  document
    .querySelector(pricingSliderClass)
    .classList.value.includes("swiper") &&
  window.innerWidth < 993
) {
  const slider = document.querySelector(pricingSliderClass);
  slider.classList.remove("swiper");
  slider
    .querySelector(".pricing-slider__inner")
    .classList.remove("swiper-wrapper");
} else {
  const slider = document.querySelector(pricingSliderClass);
  slider.classList.add("swiper");
  slider
    .querySelector(".pricing-slider__inner")
    .classList.add("swiper-wrapper");
  let pricingSlider = new Swiper(pricingSliderClass, pricingSliderSettings);
  const pricingNext = pricingSlider.el.querySelector(
    ".pricing-slider__button-next"
  );
  pricingNext.addEventListener("click", () => {
    pricingSlider.allowSlideNext = true;
    pricingSlider.slideNext();
    pricingSlider.allowSlideNext = false;
  });

  const pricingPrev = pricingSlider.el.querySelector(
    ".pricing-slider__button-prev"
  );
  pricingPrev.addEventListener("click", () => {
    pricingSlider.allowSlidePrev = true;
    pricingSlider.slidePrev();
    pricingSlider.allowSlidePrev = false;
  });
}

const reviewsSlider = new Swiper(".reviews-slider", {
  loop: true,
  grabCursor: true,
  slidesPerView: 3,
  spaceBetween: 40,
  navigation: {
    nextEl: ".reviews-slider__button-next",
    prevEl: ".reviews-slider__button-prev",
  },
  centeredSlides: true,
  slidesPerView: "auto",
  effect: "creative",
  creativeEffect: {
    prev: {
      translate: ["-105%", 0, 0],
      opacity: 0.3,
    },
    next: {
      translate: ["105%", 0, 0],
      opacity: 0.3,
    },
    limitProgress: 2,
  },
});

let reviewsSliderHeights = [];
reviewsSlider.el
  .querySelectorAll(".reviews-slider-slide")
  .forEach((element, index) => {
    let review = getComputedStyle(element);
    reviewsSliderHeights.push(parseInt(review.getPropertyValue("height")));
  });

let reviewsMaxHeight = Math.max(...reviewsSliderHeights);

function setMaxSlidesHeight(slider, slideClass, maxHeight) {
  slider.el.querySelectorAll(slideClass).forEach((element, index) => {
    element.style.height = `${maxHeight}px`;
  });
}

reviewsSlider.on(
  "slideChange",
  setMaxSlidesHeight(reviewsSlider, ".reviews-slider-slide", reviewsMaxHeight)
);

/**
 * @accordions
 */
const accordions = [...document.querySelectorAll(".accordion")];
const dropdownOpenedClass = "accordion--opened";

function toggleDropdown(
  dropdownTop,
  dropdownBottom,
  dropdownOpenedClass,
  dropdownBottomHeight
) {
  if (dropdownTop.parentElement.classList.value.includes(dropdownOpenedClass)) {
    dropdownBottom.style.maxHeight = "0";
    dropdownTop.parentElement.classList.remove(dropdownOpenedClass);
  } else {
    let heightModifier = 20;
    if (window.innerWidth < 575) heightModifier = 70;

    dropdownBottom.style.maxHeight = `${
      dropdownBottomHeight + heightModifier
    }px`;
    dropdownTop.parentElement.classList.add(dropdownOpenedClass);
  }
}

accordions.forEach((accordion, index) => {
  const currentTop = accordion.querySelector(".accordion__top");
  const currentBottom = accordion.querySelector(".accordion__bottom");
  const currentBottomHeight = currentBottom.clientHeight;
  currentTop.addEventListener("click", function () {
    toggleDropdown(
      currentTop,
      currentBottom,
      dropdownOpenedClass,
      currentBottomHeight
    );
  });

  setTimeout(() => {
    currentTop.click();
    if (index > 0) {
      toggleDropdown(
        currentTop,
        currentBottom,
        dropdownOpenedClass,
        currentBottomHeight
      );
    }
  }, 200);
});

poppa({
  pop: ".pop-form__callback",
  clickTrigger: [".header__button", ".footer__callback"],
  onOpen() {},
});

const headerCallback = document.querySelector(".header__button");
const footerCallback = document.querySelector(".footer__callback");

function handlePoppaButtonClick(button, form) {
  const formname = button.getAttribute("data-formname");
  form.querySelector(".input__formname").value = formname;
}

headerCallback.addEventListener("click", (event) => {
  handlePoppaButtonClick(
    event.target,
    document.querySelector(".pop-form__callback")
  );
});

poppa({
  pop: ".timer__form",
  clickTrigger: [".timer-counter__button"],
  onOpen() {},
});
// const timerCounterButton = document.querySelector(".timer-counter__button");
// timerCounterButton.addEventListener("click", (event) => {
//   handlePoppaButtonClick(
//     event.target,
//     document.querySelector(".pop-form__callback")
//   );
// });

/**
 * @pricing
 */

poppa({
  pop: ".pricing__form",
  clickTrigger: [".pricing-bundle__button"],
  onOpen() {},
});

const prisingButtons = document.querySelectorAll(".pricing-bundle__button");

prisingButtons.forEach((element) => {
  element.addEventListener("click", (event) => {
    const bundleForm = document.querySelector(".pricing__form");
    const bundle = event.target.parentElement.parentElement;
    const bundleName = bundle.querySelector(".pricing-bundle__title").innerText;
    const price = bundle.querySelector(".pricing-bundle__price").innerText;

    bundleForm.querySelector(".input__bundle").value = `Тариф: ${bundleName}`;
    bundleForm.querySelector(".input__price").value = `Цена: ${price}`;
  });
});

/**
 * @psycho
 */
poppa({
  pop: ".psycho__form",
  clickTrigger: [".psycho__button"],
  onOpen() {},
});
const psychoCallback = document.querySelector(".psycho__button");
psychoCallback.addEventListener("click", (event) => {
  handlePoppaButtonClick(event.target, document.querySelector(".psycho__form"));
});

/**
 * @timer
 */

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(timerClass, endtime) {
  var clock = document.querySelector(timerClass);
  // var daysSpan = clock.querySelector('.timer-counter__left');
  var hoursSpan = clock.querySelector(".timer-counter__left");
  var minutesSpan = clock.querySelector(".timer-counter__center");
  var secondsSpan = clock.querySelector(".timer-counter__right");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    // daysSpan.innerHTML = t.days;

    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      // clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

const HOURS = 24;
const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;
if (localStorage.getItem("localTimer") == null) {
  localStorage.setItem(
    "localTimer",
    new Date(Date.parse(new Date()) + HOURS * MINUTES * SECONDS * MILLISECONDS)
  );
}

var deadline = localStorage.getItem("localTimer");
// var deadline = new Date(Date.parse(new Date()) + 10 * 1000); // for endless timer
initializeClock(".timer-counter", deadline);

/**
 * @showMore
 */

function showMore(clickTrigger, classesArray, initialShow) {
  const classHidden = "show-more__hidden";
  const elements = document.querySelectorAll(classesArray);
  elements.forEach((item, index) => {
    if (index > initialShow - 1) {
      item.classList.add(classHidden);
    }
  });

  clickTrigger.addEventListener("click", (event) => {
    event.target.style.display = "none";
    elements.forEach((item) => {
      if (item.classList.value.includes(classHidden)) {
        item.classList.remove(classHidden);
      }
    });
  });
}

const casesShowMore = document.querySelector(".cases__button");
showMore(casesShowMore, ".cases-accordion", 2);

const pricingShowMore = document.querySelector(".pricing__show-more");
if (window.innerWidth < 575) {
  showMore(pricingShowMore, ".pricing-slider-slide", 2);
}

poppa({
  pop: ".pop-thanks",
});

const forms = document.querySelectorAll(".form");

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("form send");

    // let response = await fetch("wp-content/themes/c21/send.php", {
    let response = await fetch("send.php", {
      method: "POST",
      body: new URLSearchParams(new FormData(form)),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    let result = await response.json();
    console.log(result);
    openPop(".pop-thanks");
  });
});
