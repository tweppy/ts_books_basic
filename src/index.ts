const libraryContainer = document.querySelector('.landing-page__library') as HTMLElement;
const landingPage = document.querySelector('.landing-page') as HTMLElement;
const overlay = document.querySelector('.book-page') as HTMLElement;
const closeBtn = document.querySelector('#header__close-btn') as HTMLElement;

interface Book {
    audience: string;
    author: string;
    color: string;
    id: number;
    pages: number;
    plot: string;
    publisher: string;
    title: string;
    year: number;
}

const overlayElem = {
    bookCover: document.querySelector('.book-info__cover') as HTMLElement,
    coverTitle: document.querySelector('.cover__title') as HTMLElement,
    coverAuthor: document.querySelector('.cover__author') as HTMLElement,
    bookTitle: document.querySelector('.details__title') as HTMLElement,
    bookAuthor: document.querySelector('.details__author') as HTMLElement,
    bookPlot: document.querySelector('.details__plot') as HTMLElement,
    statsAudience: document.querySelector('.stats__audience') as HTMLElement,
    statsPages: document.querySelector('.stats__pages') as HTMLElement,
    statsYear: document.querySelector('.stats__year') as HTMLElement,
    statsPublisher: document.querySelector('.stats__publisher') as HTMLElement
}

async function getData() {
    const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
    try {
        const response = await fetch(BASE_URL);
        if (response.status === 200) {
            const data: Book[] = await response.json();
            renderLibrary(data);
        } else {
            throw Error('error');
        }
    } catch (error) {
        console.log(error);
    }
}

function renderLibrary(data: Book[]) {
    for (let i = 0; i < data.length; i++) {
        let bookElem = data[i];
        let book = document.createElement('article') as HTMLElement;
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
        })
    }
}

function renderBook(bookElem: Book) {
    if (bookElem.pages === null) {
        overlayElem.statsPages.textContent = '64';
    } else {
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

function toggleOverlay(): void {
    overlay.classList.toggle('overlayshow');
    landingPage.classList.toggle('hide');
}

closeBtn.addEventListener('click', toggleOverlay);

getData();