
const element1 = document.querySelector(".sidebar-top");
const element2 = document.querySelector(".col-content");

function updateMargin() {
  if(window.getComputedStyle(element1).marginLeft != "0px"){
    element2.style.marginTop = element1.offsetHeight + "px";
  }else{
    element2.style.marginTop="0px"
  }
}
const resizeObserver = new ResizeObserver(updateMargin);
resizeObserver.observe(element1);