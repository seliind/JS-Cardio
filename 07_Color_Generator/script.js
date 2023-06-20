const colorInputs = document.querySelectorAll(".colors input");
const gradientBox = document.querySelector(".gradient-box");
const selectMenu = document.querySelector(".select-box select");
const textarea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy")

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateGradient = (isRandom) => {
  if (isRandom) {
    colorInputs[0].value = getRandomColor();
    colorInputs[1].value = getRandomColor();
  }
  const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value}, ${colorInputs[1].value})`;
  gradientBox.style.background = gradient;
  textarea.value = `background: ${gradient};`;
};

const copyCode = () => {
    navigator.clipboard.writeText(textarea.value);
    copyBtn.innerText = "Code copied!";
    setTimeout(() => copyBtn.innerText = "Copy Code", 1600);
}

colorInputs.forEach((input) => {
  input.addEventListener("input", () => generateGradient(false));
});

selectMenu.addEventListener("change", () => generateGradient(false));
refreshBtn.addEventListener("click", () => generateGradient(true));
copyBtn.addEventListener("click", copyCode);
