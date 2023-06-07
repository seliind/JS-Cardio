const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowButtons = document.querySelectorAll(".wrapper i");
const firstCardWiidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWiidth);

//Insert copies of the last few cards to beginning of carousel for infinite scrolliing
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

//Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft +=
      btn.id === "left" ? -firstCardWiidth : firstCardWiidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // is is Dragging is false return from here
  //Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 900) return; // Return if window is smaller than 800
  //Autoplay the carousel every 2500ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWiidth), 1000);
};
autoPlay();

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
    console.log("You've reached to the left end!");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    // If the carousel is at the end, scroll to the beginning
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    console.log("You've reached to the right end!");
    carousel.classList.remove("no-transition");
  }

  //Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

carousel.addEventListener("touchend", dragStart);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("touchstart", dragStop);
