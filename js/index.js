const pricingSliderClass = ".pricing-slider";
if (
  document
    .querySelector(pricingSliderClass)
    .classList.value.includes("swiper") &&
  window.innerWidth < 993
) {
  const slider = document.querySelector(pricingSliderClass);
  slider.classList.remove("swiper");
  slider.querySelector(".swiper-wrapper").classList.add("no-swiper-wrapper");
  slider.querySelector(".swiper-wrapper").classList.remove("swiper-wrapper");
} else {
  let pricingSlider = new Swiper(pricingSliderClass, {
    breakpoints: {
      // when window width is >= 992px
      init: false,
      1111: {
        init: true,
        spaceBetween: 30,
        slidesPerView: 3,
        edgeSwipeThreshold: 0,
        autoHeight: true,
        navigation: {
          nextEl: ".pricing-slider__button-next",
          prevEl: ".pricing-slider__button-prev",
        },
        allowSlideNext: false,
        allowSlidePrev: false,
      },
    },
  });
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
  clickTrigger: [
    ".header__button",
    ".timer-counter__button",
    ".footer__callback",
  ],
  onOpen() {},
});

const headerCallback = document.querySelector(".header__button");
const timerCounterButton = document.querySelector(".timer-counter__button");
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
timerCounterButton.addEventListener("click", (event) => {
  handlePoppaButtonClick(
    event.target,
    document.querySelector(".pop-form__callback")
  );
});
timerCounterButton.addEventListener("click", (event) => {
  handlePoppaButtonClick(
    event.target,
    document.querySelector(".pop-form__callback")
  );
});

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
