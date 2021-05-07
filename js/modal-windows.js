import galleryImages from './gallery-items.js';
import refs from './refs.js';
import makeGalleryCardMarkup from './make-gallery-cards-markup.js';
const lightboxNew = document.querySelector(".lightbox")
const cards = makeGalleryCardMarkup(galleryImages);
const lightboxOverlay = document.querySelector(".lightbox__overlay")
const lightImg = document.querySelector(".lightbox__image");
refs.galleryContainer.insertAdjacentHTML('afterbegin', cards);

refs.galleryContainer.addEventListener('click', onImageClick);
lightboxOverlay.addEventListener("click", onCloseModal);
refs.closeBtn.addEventListener('click', onCloseModal);

const arrayOfImageLinks = makeArrayOfImageLinks(galleryImages);

const arrayOfImageDescriptions = makeArrayOfImageDescriptions(galleryImages);

function makeArrayOfImageLinks(galleryContainer) {
    return galleryContainer.map(({ original }) => original);
}

function makeArrayOfImageDescriptions(galleryContainer) {
    return galleryContainer.map(({ description }) => description);
}

function onImageClick(evt) {
    evt.preventDefault();

    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }

    const url = evt.target.dataset.source;
    const description = evt.target.getAttribute("alt");
    
    onOpenModal(url, description);
}

let position = 0;

function onOpenModal(url, description) {
    refs.lightbox.classList.add('is-open');

    setSrcAltAttributes(url, description);

    position = arrayOfImageLinks.indexOf(url);

    return position;
   
}

function setSrcAltAttributes(src, alt) {
    refs.lightboxImage.setAttribute("src", src);
    refs.lightboxImage.setAttribute("alt", alt);
}

function onCloseModal() {
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.removeAttribute("src");
    refs.lightboxImage.removeAttribute("alt");
}
const galleryImg = document.querySelectorAll('.gallery__image');
const newSrc = [];
const modalImg = document.querySelector('.lightbox__image');
galleryImg.forEach(e => {
  newSrc.push(e.getAttribute('data-source'));
});


document.addEventListener('keydown', e => {
  let newIndex = newSrc.indexOf(modalImg.src);
  
    if (newIndex < 0) {
    return;
  }
  if (e.code === 'ArrowLeft') {
    newIndex -= 1;
    if (newIndex === -1) {
      newIndex = newSrc.length - 1;
    }
  } else if (e.code === 'ArrowRight') {
    newIndex += 1;
    if (newIndex === newSrc.length) {
      newIndex = 0;
    }
  }
  modalImg.src = newSrc[newIndex];
});
