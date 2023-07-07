const image = document.querySelector(".container");
const heartIcon = document.querySelector(".heart");
import { hello } from "./hello.js"
image.addEventListener("dblclick", (e) => {

    let xValue = e.clientX - e.target.offsetLeft;
    let yValue = e.clientY - e.target.offsetTop;
    heartIcon.style.left= `${xValue}px`
    heartIcon.style.top= `${yValue}px`

  heartIcon.classList.add("active");

  setTimeout(() => {
    heartIcon.classList.remove("active");
  }, 3000);
});

hello()
