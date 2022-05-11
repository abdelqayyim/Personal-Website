let oneBtn = document.querySelector(".one-btn");
let oneBox = document.querySelector(".one");

let twoBox = document.querySelector(".two");

let boxes = document.querySelectorAll(".trial-div");
boxes.forEach((box, index) => {
    console.log(`${box.innerText}-${index}`);
    box.style.transform = `translateY(${(index * 100)}%)`;
    if (index !== 0) {
        box.classList.add("hidden");
    }
    else {
        box.classList.add("active");
    }
})
oneBtn.addEventListener("click", () => {
    console.log("Hello");
    oneBox.classList.add("go");
    oneBox.addEventListener("animationend", (e) => {
        console.log("ANIMATION HAS ENDED");
        oneBox.classList.remove("go");
        oneBox.style.transform = `translateY(-${((0 * 100) + 100)}%)`;
    })
    twoBox.classList.add("goUp");
})