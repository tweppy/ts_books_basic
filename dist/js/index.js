"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const libraryContainer = document.querySelector('.landing-page__library');
const landingPage = document.querySelector('.landing-page');
const overlay = document.querySelector('.book-page');
const closeBtn = document.querySelector('#header__close-btn');
const overlayElem = {
    bookCover: document.querySelector('.book-info__cover'),
    coverTitle: document.querySelector('.cover__title'),
    coverAuthor: document.querySelector('.cover__author'),
    bookTitle: document.querySelector('.details__title'),
    bookAuthor: document.querySelector('.details__author'),
    bookPlot: document.querySelector('.details__plot'),
    statsAudience: document.querySelector('.stats__audience'),
    statsPages: document.querySelector('.stats__pages'),
    statsYear: document.querySelector('.stats__year'),
    statsPublisher: document.querySelector('.stats__publisher')
};
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
        try {
            const response = yield fetch(BASE_URL);
            if (response.status === 200) {
                const data = yield response.json();
                renderLibrary(data);
            }
            else {
                throw Error('error');
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function renderLibrary(data) {
    for (let i = 0; i < data.length; i++) {
        let bookElem = data[i];
        let book = document.createElement('article');
        book.classList.add('library__book-cover');
        libraryContainer.appendChild(book);
        book.innerHTML =
            `<h2>${bookElem.title}</h2>
        <h4>${bookElem.author}</h4>`;
        book.style.backgroundColor = bookElem.color;
        book.style.borderColor = bookElem.color;
        book.addEventListener('click', () => {
            renderBook(bookElem);
            toggleOverlay();
        });
    }
}
function renderBook(bookElem) {
    if (bookElem.pages === null) {
        overlayElem.statsPages.textContent = '64';
    }
    else {
        overlayElem.statsPages.textContent = bookElem.pages.toString();
    }
    overlayElem.bookTitle.textContent = bookElem.title;
    overlayElem.bookAuthor.textContent = bookElem.author;
    overlayElem.bookPlot.textContent = bookElem.plot;
    overlayElem.statsAudience.textContent = bookElem.audience;
    overlayElem.statsYear.textContent = bookElem.year.toString();
    overlayElem.statsPublisher.textContent = bookElem.publisher;
    overlayElem.bookCover.style.backgroundColor = bookElem.color;
    overlayElem.bookCover.style.borderColor = bookElem.color;
    overlayElem.coverAuthor.textContent = bookElem.author;
    overlayElem.coverTitle.textContent = bookElem.title;
}
function toggleOverlay() {
    overlay.classList.toggle('overlayshow');
    landingPage.classList.toggle('hide');
}
closeBtn.addEventListener('click', toggleOverlay);
getData();
