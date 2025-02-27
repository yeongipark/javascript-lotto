import domRefs from "./dom.js";

domRefs.$modalCloseButton.addEventListener("click", () => {
  domRefs.modal.close();
});
