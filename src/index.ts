import { Book } from "./modules/interface.js";
import { overlayElem } from "./modules/elems.js";

const libraryContainer = document.querySelector('.landing-page__library') as HTMLElement;
const bookTemplate = document.querySelector('[data-book-template]')  as HTMLTemplateElement;
const searchInput = document.querySelector('#search-input') as HTMLInputElement;
const closeBtn = document.querySelector('#header__close-btn') as HTMLElement;
const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';

let library: any[] = [];

async function getData() {
    fetch(BASE_URL)
    .then(response => response.json())
    .then((data: Book[]) => {
        library = data.map((book: Book) => {
            const bookElem = (<Element> bookTemplate.content.cloneNode(true)).children[0];
            libraryContainer.append(bookElem);
            renderLibrary(bookElem, book);
            return { title: book.title, author: book.author, element: bookElem } //returns this when searching
        });
    });
}

function renderLibrary(bookElem: Element, book: Book): void {
    const cover = bookElem.querySelector('.template-cover') as HTMLElement;
    const title = bookElem.querySelector('.template-title') as HTMLElement;
    const author = bookElem.querySelector('.template-author') as HTMLElement;
    cover.style.backgroundColor = book.color;
    cover.style.borderColor = book.color;
    title.textContent = book.title;
    author.textContent = book.author;

    bookElem.addEventListener('click', () => {
        renderOverlayBook(book);
        toggleOverlay();
    })
}

function renderOverlayBook(book: Book): void {
    if (book.pages === null) {
        overlayElem.statsPages.textContent = '64';
    } else {
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

function toggleOverlay(): void {
    const landingPage = document.querySelector('.landing-page') as HTMLElement;
    const overlay = document.querySelector('.book-page') as HTMLElement;
    overlay.classList.toggle('overlayshow');
    landingPage.classList.toggle('hide');
}

searchInput.addEventListener('input', () => {
    let value = searchInput.value;
    library.forEach((book: Book) => {
        const showBook: boolean = book.title.toLowerCase().includes(value) || book.author.toLowerCase().includes(value);
        book.element.classList.toggle('hide', !showBook);
    });
})

closeBtn.addEventListener('click', toggleOverlay);

getData();