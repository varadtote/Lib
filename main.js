var bookStore = [];
Book.nextBookId = 1;
function Book(Title, Author, Pages, Status) {
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Status = Status;
    this.Id = Book.nextBookId++;
}

let addBook = document.querySelector('.addBook');
addBook.addEventListener('click', Storebook)

function Storebook(event) {
    event.preventDefault();

    let bookTitleInput = document.getElementById('bookTitle');
    let bookAuthorInput = document.getElementById('bookAuthor');
    let bookPagesInput = document.getElementById('bookPages');
    let bookStatusInput = document.getElementById('bookStatus');

    let bookTitle = bookTitleInput.value;
    let bookAuthor = bookAuthorInput.value;
    let bookPages = bookPagesInput.value;
    let bookStatus = bookStatusInput.value;

    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    bookStore.push(newBook);

    // Reset the form inputs to empty strings or initial values
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookPagesInput.value = "";
    bookStatusInput.value = "Completed";

    addBookToScreen();

    console.log(bookStore);
}

const deleteBtn = document.createElement('button')
deleteBtn.setAttribute('class', 'deleteBtn')
deleteBtn.innerText = "Delete"
deleteBtn.addEventListener('click', () => { deleteBook(Book.Id) })

const updateStatusBtn = document.createElement('button')
updateStatusBtn.setAttribute('class', 'updateStatusBtn')
updateStatusBtn.innerText = "Update Status"
updateStatusBtn.addEventListener('click', () => { updateStatus() })



function addBookToScreen() {
    let libraryStore = document.querySelector('.libraryStore');
    libraryStore.innerHTML = '';
    bookStore.forEach(book => {
        let bookCard = document.createElement('div');
        bookCard.setAttribute('class', 'bookCard');
        let title = document.createElement('h1');
        let author = document.createElement('h3');
        let pages = document.createElement('p');
        let status = document.createElement('h4');

        title.innerText = book.Title;
        author.innerText = book.Author;
        pages.innerText = book.Pages;
        status.innerText = book.Status;

        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'deleteBtn');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteBook(book.Id); // Pass the book's Id
        });

        let updateStatusBtn = document.createElement('button');
        updateStatusBtn.setAttribute('class', 'updateStatusBtn');
        updateStatusBtn.innerText = 'Update Status';
        updateStatusBtn.addEventListener('click', () => {
            updateStatus(book);
        });

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(status);
        bookCard.appendChild(deleteBtn);
        bookCard.appendChild(updateStatusBtn);
        libraryStore.appendChild(bookCard);
    });
}

function deleteBook(Id) {

    bookStore = bookStore.filter((book) => book.Id !== Id);
    addBookToScreen();

    function updateStatus(book) {
        if (book.Status === "Reading") {
            book.Status = "Completed";
            addBookToScreen();
        }
        else if (book.Status === "Not Yet Started") {
            book.Status = "Reading";
            addBookToScreen();
        }
        else if (book.Status === "Completed") {
            book.Status = "Not Yet Started";
            addBookToScreen();
        }
    }
}

