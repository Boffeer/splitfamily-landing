let pricingSlider = new Swiper(".pricing-slider", {
  grabCursor: true,
  slidesPerView: 3,
  spaceBetween: 30,
  autoHeight: true,
  navigation: {
    nextEl: ".pricing-slider__button-next",
    prevEl: ".pricing-slider__button-prev",
  },
});

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
      // will set `translateZ(-400px)` on previous slides
      translate: ["-105%", 0, 0],
      opacity: 0.3,
    },
    next: {
      // will set `translateX(100%)` on next slides
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
