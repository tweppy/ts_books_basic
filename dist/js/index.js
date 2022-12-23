var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { overlayElem } from "./modules/elems.js";
const libraryContainer = document.querySelector('.landing-page__library');
const bookTemplate = document.querySelector('[data-book-template]');
const searchInput = document.querySelector('#search-input');
const closeBtn = document.querySelector('#header__close-btn');
const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
let library = [];
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => {
            const fullData = [...data];
            console.log(fullData);
            library = data.map((book) => {
                const bookElem = bookTemplate.content.cloneNode(true).children[0];
                libraryContainer.append(bookElem);
                renderLibrary(bookElem, book);
                return { title: book.title, author: book.author, element: bookElem }; //returns this when searching
            });
        });
    });
}
function renderLibrary(bookElem, book) {
    const cover = bookElem.querySelector('.template-cover');
    const title = bookElem.querySelector('.template-title');
    const author = bookElem.querySelector('.template-author');
    cover.style.backgroundColor = book.color;
    cover.style.borderColor = book.color;
    title.textContent = book.title;
    author.textContent = book.author;
    bookElem.addEventListener('click', () => {
        renderOverlayBook(book);
        toggleOverlay();
    });
}
function renderOverlayBook(book) {
    if (book.pages === null) {
        overlayElem.statsPages.textContent = '64';
    }
    else {
        overlayElem.statsPages.textContent = book.pages.toString();
    }
    overlayElem.bookTitle.textContent = book.title;
    overlayElem.bookAuthor.textContent = book.author;
    overlayElem.bookPlot.textContent = book.plot;
    overlayElem.statsAudience.textContent = book.audience;
    overlayElem.statsYear.textContent = book.year.toString();
    overlayElem.statsPublisher.textContent = book.publisher;
    overlayElem.bookCover.style.backgroundColor = book.color;
    overlayElem.bookCover.style.borderColor = book.color;
    overlayElem.coverAuthor.textContent = book.author;
    overlayElem.coverTitle.textContent = book.title;
}
function toggleOverlay() {
    const landingPage = document.querySelector('.landing-page');
    const overlay = document.querySelector('.book-page');
    overlay.classList.toggle('overlayshow');
    landingPage.classList.toggle('hide');
}
searchInput.addEventListener('input', () => {
    let value = searchInput.value;
    library.forEach((book) => {
        const showBook = book.title.toLowerCase().includes(value) || book.author.toLowerCase().includes(value);
        book.element.classList.toggle('hide', !showBook);
    });
});
closeBtn.addEventListener('click', toggleOverlay);
getData();
