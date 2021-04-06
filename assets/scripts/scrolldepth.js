const pageHeight = document.body.scrollHeight - document.body.clientHeight;

window.addEventListener("scroll", (event) => {
  let scroll = Math.ceil(window.scrollY);
  const percentage = Math.ceil((scroll / pageHeight) * 100);
});
