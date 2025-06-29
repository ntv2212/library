const library = [];

const dialogAddNewBook = document.getElementById("new-book-dialog");
const buttonOpenAddNewBook = document.getElementById("add-new-book");
const buttonCloseAddNewBook = document.getElementById("close-new-book-diaglog");
const formAddNewBook = document.getElementById("form-add-new-book");

function Book(title, author, pages, read, des) {
  if (!new.target) {
    throw Error("Constructor must be called with 'new'");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read || false;
  this.des = des || "No description available";

  this.info = function () {
    return this.des;
  };
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(params) {
  const newBook = new Book(
    params.title,
    params.author,
    params.pages,
    params.read,
    params.des
  );

  library.push(newBook);
}

const deleteBook = (id) => {
  const index = library.findIndex((book) => book.id === id);
  if (index !== -1) {
    library.splice(index, 1);
    displayAllBook();
  }
};

const toggleReadStatus = (book) => {
  book.toggleReadStatus();
  displayAllBook();
};

function displayAllBook() {
  const bookList = document.getElementById("book-list");

  bookList.innerHTML = "";

  library.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-card";
    bookItem.id = book.id;
    bookItem.innerHTML = `
        <h3 class="book-title">${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Description: ${book.des}</p>
        <button class="delete-book-btn btn btn-danger">Delete book</button>
        <button class="btn toggle-read-btn">${
          book.read ? "Mark as Unread" : "Mark as Read"
        }</button>
      `;

    const deleteBtn = bookItem.querySelector(".delete-book-btn");
    const toggleReadBtn = bookItem.querySelector(".toggle-read-btn");

    toggleReadBtn.addEventListener("click", () => toggleReadStatus(book));

    deleteBtn.addEventListener("click", () => deleteBook(book.id));

    bookList.appendChild(bookItem);
  });
}

function openNewBookDialog() {
  dialogAddNewBook.showModal();
}

function closeNewBookDialog() {
  formAddNewBook.reset();
  dialogAddNewBook.close();
}

function addNewBook(e) {
  e.preventDefault();
  console.log(e.target.title.value);
  const newBook = new Book(
    e.target.title.value,
    e.target.author.value,
    e.target.pages.value,
    e.target.read.checked,
    e.target.des.value
  );
  library.push(newBook);
  displayAllBook();
  closeNewBookDialog();
}

document.addEventListener("DOMContentLoaded", () => {
  buttonOpenAddNewBook.addEventListener("click", openNewBookDialog);
  buttonCloseAddNewBook.addEventListener("click", closeNewBookDialog);
  formAddNewBook.addEventListener("submit", addNewBook);
  displayAllBook();
});
