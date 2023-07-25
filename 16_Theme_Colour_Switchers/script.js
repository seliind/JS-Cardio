let colorIcons = document.querySelector(".color-icon");
const icons = document.querySelector(".color-icon .icons");
let buttons = document.querySelectorAll(".btn");

for (var button of buttons) {
  button.addEventListener("click", (e) => {
    let target = e.target;

    let open = document.querySelector(".open");
    if (open) open.classList.remove("open");

    document.querySelector(".active").classList.remove("active");
    target.classList.add("active");

    let root = document.querySelector(":root");
    dataColor = target.getAttribute("data-color");
    color = dataColor.split(" ");

    root.style.setProperty("--white", color[0]);
    root.style.setProperty("--black", color[1]);
    root.style.setProperty("--nav-main", color[2]);
    root.style.setProperty("--switchers-main", color[3]);

    let iconName = target.className.split(" ")[2];

    if (target.classList.contains("fa-moon")) {
      target.classList.replace(iconName, "fa-sun");
      colorIcons.style.display = "none";
    } else if (target.classList.contains("fa-sun")) {
      target.classList.replace("fa-sun", "fa-moon");
      colorIcons.style.display = "block";
      document.querySelector(".btn.blue").click();
    }
  });
}

icons.addEventListener("click", () => {
  colorIcons.classList.toggle("open");
});
