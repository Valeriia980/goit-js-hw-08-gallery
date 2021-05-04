import galleryImages from './gallery-items.js';
import refs from './refs.js';
import makeGalleryCardMarkup from './make-gallery-cards-markup.js';

const cards = makeGalleryCardMarkup(galleryImages);

refs.galleryContainer.insertAdjacentHTML('afterbegin', cards);

refs.galleryContainer.addEventListener('click', onImageClick);

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