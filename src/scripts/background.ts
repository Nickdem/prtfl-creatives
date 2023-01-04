function makeBackgrounds(body: HTMLBodyElement) {
  const webPImg = new Image();
  webPImg.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  webPImg.onload = webPImg.onerror = function () {
    webPImg.height === 2
      ? body.classList.add("webp-true")
      : body.classList.add("webp-false");
  };
}
