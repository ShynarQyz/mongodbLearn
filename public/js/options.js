function nextPage() {
  window.location.href = "./new";
  }   
  function EditProd() {
  window.location.href = "./edit";
  }   
function  showModal() {
  window.location.href = "./cheirs";
}

let more = document.getElementsByClassName("more");
more = Array.from(more);
for (let i = 0; i < more.length; i++) {
  more[i].addEventListener("click", function () {
    console.log(i);
    openMore(this);
  });
}
function openMore(element) {
  const dot = element.nextElementSibling;
  console.log(dot);
  dot.classList.toggle("open");
}




