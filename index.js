let container = document.querySelector(".main-div");
let staticPages = document.querySelectorAll("[data-static]");
let pagesDown = document.querySelectorAll("[data-down]");
let arrowUp = document.querySelector(".arrow-up");
let arrowDown = document.querySelector(".arrow-down");
let circles = document.querySelectorAll(".button-circle");
let currentPage = 0;
let scrolling = false;

const hidePages = () => {
  pagesDown.forEach((pages, index) => {
    if (index !== 0) {
      pages.classList.add("hidden");
      staticPages[index].classList.add("hidden");
    }
  });
};
const animatePage = (page) => {
  if (page === 1) {
    let sections = document.querySelectorAll(" .page-1 > .section");
    let lines = document.querySelectorAll(".horizontal-line");
    sections.forEach((section, index) => {
      section.classList.remove("up");
      section.classList.add("down");
    });
    lines.forEach((line, index) => {
      if (index <= 2) {
        line.classList.add("animate-horizontalLine");
      }
    });
  }
};

const movePage = (direction) => {
  if (direction === "down") {
    arrowUp.classList.remove("hidden");
    let current = pagesDown[currentPage-1];
    let next = pagesDown[currentPage];
    let nextStatic = staticPages[currentPage];
    
    if (current.classList.contains("hidden")) {
      current.classList.remove("hidden");
    }
    if (!next.classList.contains("hidden")) {
      // if the bottom page is already visible no need for flip animatio
      next.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      return;
    }
    arrowDown.classList.add("hidden");
    arrowUp.classList.add("hidden");
    setTimeout(() => {
      if(currentPage !== pagesDown.length - 1){
        arrowDown.classList.remove("hidden");
      }
      if(currentPage !== 0){
        arrowUp.classList.remove("hidden");
      };
    }, 2700);
    if (currentPage == 1) {
      setTimeout(() => {
        animatePage(currentPage);
      }, 2400);
    }
    if (currentPage == 2) {
      console.log("HERE");
    }
    current.classList.add("flip-down-animation");
    container.classList.add("zoom-out");

    setTimeout(() => {
      current.classList.remove("flip-down-animation");
      container.classList.remove("zoom-out");
      next.classList.remove("hidden");
      nextStatic.classList.remove("hidden");
      next.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 2000);
  } else if (direction === "up") {
    arrowUp.classList.add("hidden");
    setTimeout(() => {
      if(currentPage !== 0){
        arrowUp.classList.remove("hidden");
      };
    }, 2700);
    let next = staticPages[currentPage];
    next.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
};
container.addEventListener("wheel", (event) => {
  event.preventDefault();
});
arrowDown.addEventListener("click", () => {
  currentPage = (currentPage <= pagesDown.length - 1) ? currentPage + 1 : currentPage;
  movePage("down");
  if (currentPage === pagesDown.length - 1) {
    arrowDown.classList.add("hidden");
  }
  circles.forEach((circle) => {
    if (circle.classList.contains("selected")) {
      circle.classList.remove("selected");
    }
  });
  circles[currentPage].classList.add("selected");
  circles[currentPage].classList.add("visible");
});
arrowUp.addEventListener("click", () => {
  currentPage = (currentPage >= 0)?currentPage - 1:currentPage;
  movePage("up");
  if (currentPage === 0) {
    arrowUp.classList.add("hidden");
    circles.forEach((circle) => {
      if (circle.classList.contains("selected")) {
        circle.classList.remove("selected");
      }
    });
    circles[currentPage].classList.add("selected");
  } else {
    arrowUp.classList.remove("hidden");
    circles.forEach((circle) => {
      if (circle.classList.contains("selected")) {
        circle.classList.remove("selected");
      }
    });
    circles[currentPage].classList.add("selected");
  }
  if (currentPage === pagesDown.length - 2) {
    arrowDown.classList.remove("hidden");
  }
});

const highlightCircle = (index) => {
  arrowUp.classList.remove("hidden");
  circles.forEach((circle) => {
    if (circle.classList.contains("selected")) {
      circle.classList.remove("selected");
    }
  });
  circles[index].classList.add("selected");
};

hidePages();
arrowUp.classList.add("hidden");
staticPages[0].scrollIntoView({
  behavior: "smooth",
  block: "end",
  inline: "nearest",
});
circles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    let direction = index - currentPage;
    currentPage = index;
    if(direction < 0){
      movePage('up');
      highlightCircle(index);
      console.log(circles[index]);
    }
    else if (direction > 0) {
      console.log('down');
      movePage('down');
      highlightCircle(index);
      console.log(circles[index]);
    }
    else {
      movePage('up');
      highlightCircle(index);
      console.log(circles[index]);
    }


  });
});
// window.addEventListener("keydown", (event) => {
//   console.log(event.key);
//   if(event.key === "ArrowDown"){
//     arrowDown.click();
//   }
//   else if (event.key === "ArrowUp") {
//     arrowUp.click();
//   }
// })
circles[currentPage].classList.add("selected")
circles[currentPage].classList.add("visible")
// TODO: On the last page on first load the down button should disappear
