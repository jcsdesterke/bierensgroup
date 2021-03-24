const CTA = document.querySelector(".c_chatbot-cta");

CTA.addEventListener("click", () => {
  CTA.classList.toggle("c_chatbot-cta-active");
});

setTimeout(() => {
  CTA.classList.add("c_chatbot-cta-active");
}, 5000);
