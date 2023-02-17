import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");

const galleryTags = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", galleryTags);

const onGalleryImgClick = (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }

  const selectedImgOriginalSrc = e.target.dataset.source;
  const originalImg = basicLightbox.create(`
    <img src="${selectedImgOriginalSrc}" width="800" height="600">
    `);

  originalImg.show(document.addEventListener("keydown", closeWithEscape));

  function closeWithEscape({ code }) {
    if (code === "Escape") {
      originalImg.close(
        document.removeEventListener("keydown", closeWithEscape)
      );
    }
  }
};

gallery.addEventListener("click", onGalleryImgClick);
