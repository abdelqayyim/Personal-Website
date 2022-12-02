let container = document.querySelector(".main-div");
let pagesUp = document.querySelectorAll("[data-up]");
let pagesDown = document.querySelectorAll("[data-down]");
let currentPage = 0;
let scrolling = false;


const createScrollHandler = () => {
  let allowed = true;
  return (event) => {
    event.preventDefault();
    if (allowed) {
      let direction = (event.deltaY > 0) ? "down" : "up";
      
      if (currentPage <= pagesDown.length - 1 && direction === 'down') {
        currentPage = currentPage + 1;
        let pageDown = pagesDown[currentPage - 1];
        if(pageDown.classList.contains("hidden")){
          pageDown.classList.remove("hidden");
        };
        let pageUp = pagesUp[currentPage - 1];
        
            pageDown.classList.add("flip-down-animation");
            container.classList.add("zoom-out");
            // pagesUp[currentPage].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            
            setTimeout(() => {
              pageDown.classList.remove("flip-down-animation");
              pageUp.classList.remove("hidden");
              console.log(pageUp);
              pageUp.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

              container.classList.remove("zoom-out");
            }, 1800);
              // currentPage = currentPage + 1;
          }
          else if (currentPage >= 1 && direction === 'up') {
            // let nextView = document.querySelector(`.section-${currentPage-1}`);
            //   nextView.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            //   currentPage = currentPage - 1;
          }

      console.log("called");
        
        
      allowed = false;
      setTimeout(() => {
        allowed = true;
      }, 1000);
    }
  };
};
const hidePages = () => {
  pagesDown.forEach((pages, index) => {
    if(index !== 0){
      pages.classList.add("hidden");
    };
  })
  pagesUp.forEach((pages, index) => {
    pages.classList.add("hidden");
  })
}

const scrollEventHandler = createScrollHandler();
container.addEventListener("wheel", scrollEventHandler);

// var event = document.createEvent("MouseEvents");
// event.initEvent('wheel', true, true); 
// event.deltaY = +4;
// container.dispatchEvent(event);
// nextView.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
hidePages();