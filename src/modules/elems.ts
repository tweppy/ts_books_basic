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

export { overlayElem }