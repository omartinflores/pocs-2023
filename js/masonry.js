 // Parameters -> [ Width PX, Number of Cols]
const MASONRY_SETUP = [
    [1200, 4],
    [1000, 3],
    [600, 2],
    [0, 1]
];
const MASONRY_OBSERVER_SELECTOR = ".masonry-content-items";
const MASONRY_ITEMS_SELECTOR = ".masonry-item"

window.addEventListener("load", masonryInit);
window.addEventListener("resize", masonryInit);

let procesoId;

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        clearTimeout(procesoId);
        procesoId = setTimeout(masonryInit, 0);
    });
});
const config = { childList: true, subtree: true };
observer.observe(document.querySelector(MASONRY_OBSERVER_SELECTOR), config);
function getNextColId(){
    const MasonryCols = document.querySelectorAll(".masonry-col");
    var ArrayHeights = [];
    MasonryCols.forEach((MasonryCol) => {
        var ColHeight = MasonryCol.getBoundingClientRect().height;
        ArrayHeights.push(ColHeight);
    });
    const MinHeight = Math.min(...ArrayHeights);
    return ArrayHeights.indexOf(MinHeight);
}
function masonryInit(){
    const initialScrollPosition = window.scrollY || window.pageYOffset;
    // Delete actual Masonry
    const masonryContainer = document.querySelector(".masonry");
    while (masonryContainer.firstChild) { masonryContainer.removeChild(masonryContainer.firstChild); }
    // Create Masonry Structure
    var colsN = 1;
    MASONRY_SETUP.forEach(function (parameters){
        if (window.innerWidth > parameters[0]){
            colsN = Math.max(parameters[1],colsN);
        }
    });
    for (var i = 0; i < colsN; i++) {
        var colA = document.createElement("div");
        var colB = document.createElement("div");
        colA.classList.add("masonry-col-container");
        colB.classList.add("masonry-col");
        colB.classList.add("col-" + i);
        colA.appendChild(colB)
        masonryContainer.appendChild(colA)
    }
    // Add Elements
    document.querySelectorAll(MASONRY_ITEMS_SELECTOR).forEach((element) => {
        var activeElement = element.cloneNode(true);
        document.querySelector(".masonry-col.col-"+ getNextColId()).appendChild(activeElement);
    });
    window.scrollTo(0, initialScrollPosition);
}

