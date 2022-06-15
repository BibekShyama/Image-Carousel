const carouselContainer = document.querySelector(".carousel");
const carouselImages = document.querySelector(".carousel__images");
const carouselButtons = document.querySelectorAll(".carousel__button");

let images = document.querySelectorAll(".carousel__images img");
const interval = 3000;

let imageIndex = 1;
let slideId;

// Adding previous and next button
let prevButton = document.createElement("button");
prevButton.classList.add("carousel__button", "previous");
prevButton.setAttribute("id", "previous");
prevButton.innerHTML = "&#8656;";
carouselContainer.appendChild(prevButton);

let nextButton = document.createElement("button");
nextButton.classList.add("carousel__button", "next");
nextButton.setAttribute("id", "next");
nextButton.innerHTML = "&#8658;";
carouselContainer.appendChild(nextButton);

// cloning first and last images for infinite loop
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";
carouselImages.append(firstClone);
carouselImages.prepend(lastClone);

const slideWidth = images[imageIndex].clientWidth;
carouselImages.style.transform = `translateX(${-slideWidth * imageIndex}px)`;

const startSlide = () => {
  slideId = setInterval(() => {
    imageIndex++;
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll(".carousel__images img");
carouselImages.addEventListener("transitionend", () => {
  images = getSlides();
  if (images[imageIndex].id === firstClone.id) {
    carouselImages.style.transition = "none";
    imageIndex = 1;
    carouselImages.style.transform = `translateX(${
      -slideWidth * imageIndex
    }px)`;
  }
  if (images[imageIndex].id === lastClone.id) {
    carouselImages.style.transition = "none";
    imageIndex = images.length - 2;
    carouselImages.style.transform = `translateX(${
      -slideWidth * imageIndex
    }px)`;
  }
});

const moveToNextSlide = () => {
  images = getSlides();
  if (imageIndex >= images.length - 1) return;
  imageIndex++;
  carouselImages.style.transform = `translateX(${-slideWidth * imageIndex}px)`;
  carouselImages.style.transition = ".7s";
};
const moveToPreviousSlide = () => {
  if (imageIndex <= 0) return;
  imageIndex--;
  carouselImages.style.transform = `translateX(${-slideWidth * imageIndex}px)`;
  carouselImages.style.transition = ".7s";
};

carouselContainer.addEventListener("mouseenter", () => {
  clearInterval(slideId);
});
carouselContainer.addEventListener("mouseleave", startSlide);

nextButton.addEventListener("click", moveToNextSlide);
prevButton.addEventListener("click", moveToPreviousSlide);

startSlide();

// let translateX = 0;
// console.log(images);
// const numberOfImages = images.length;
// console.log(numberOfImages);

// carouselButtons.forEach((button) => {
//   button.addEventListener("click", (event) => {
//     // console.log(imageIndex);
//     if (event.target.id === "previous") {
//       if (imageIndex !== 1) {
//         imageIndex--;
//         translateX += 640;
//       }

//       if (imageIndex == 1) {
//         imageIndex = numberOfImages;
//         // console.log(imageIndex);
//         translateX = -((numberOfImages - 1) * 640);
//         // console.log(translateX);
//       }
//     } else {
//       if (imageIndex !== numberOfImages) {
//         translateX -= 640;
//         // console.log(translateX);
//       }
//       //   console.log("next:", imageIndex);
//       imageIndex++;
//       //   console.log(imageIndex);
//       if (imageIndex > numberOfImages) {
//         imageIndex = 1;
//         translateX = 0;
//         // console.log(translateX);
//       }
//     }
//     carouselImages.style.transform = `translateX(${translateX}px)`;
//   });
// });
// slideContainer=carouselContainer
// slide=carouselImages
// slides=images
