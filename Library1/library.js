// Get references to elements
const $bookForm = $("#bookForm");
const $borrowerForm = $("#borrowerForm");
const $transactionForm = $("#transactionForm");

const $booksList = $("#booksList");
const $borrowersList = $("#borrowersList");
const $transactionsList = $("#transactionsList");

const $transactionBorrower = $("#transactionBorrower");
const $transactionBook = $("#transactionBook");

// Load data from localStorage
function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  displayBooks(books);
}

function loadBorrowers() {
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  displayBorrowers(borrowers);
}

function loadTransactions() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  displayTransactions(transactions);
}

// Display Books
function displayBooks(books) {
  $booksList.empty();
  books.forEach((book, index) => {
    const status = book.isAvailable ? "Available" : "Borrowed";
    $booksList.append(`
      <tr>
        <td>${index + 1}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.year}</td>
        <td>${status}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-book" data-index="${index}">Edit</button>
          <button class="btn btn-danger btn-sm delete-book" data-index="${index}">Delete</button>
        </td>
      </tr>
    `);
  });
}

// Display Borrowers
function displayBorrowers(borrowers) {
  $borrowersList.empty();
  $transactionBorrower.empty().append('<option value="">Select Borrower</option>');
  borrowers.forEach((borrower, index) => {
    $borrowersList.append(`
      <tr>
        <td>${index + 1}</td>
        <td>${borrower.name}</td>
        <td>${borrower.email}</td>
        <td>${borrower.phone}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-borrower" data-index="${index}">Edit</button>
          <button class="btn btn-danger btn-sm delete-borrower" data-index="${index}">Delete</button>
        </td>
      </tr>
    `);
    $transactionBorrower.append(`<option value="${index}">${borrower.name}</option>`);
  });
}

// Display Transactions
function displayTransactions(transactions) {
  $transactionsList.empty();
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  transactions.forEach((transaction, index) => {
    const borrowerName = borrowers[transaction.borrower]?.name || "Unknown";
    const bookTitle = books[transaction.book]?.title || "Unknown";
    $transactionsList.append(`
      <tr>
        <td>${index + 1}</td>
        <td>${borrowerName}</td>
        <td>${bookTitle}</td>
        <td>${transaction.date}</td>
        <td>
          <button class="btn btn-danger btn-sm delete-transaction" data-index="${index}">Return</button>
        </td>
      </tr>
    `);
  });
}

// Add or Update Book
$bookForm.on("submit", function (event) {
  event.preventDefault();
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const bookIndex = $("#bookIndex").val();
  const newBook = {
    title: $("#bookTitle").val(),
    author: $("#bookAuthor").val(),
    genre: $("#bookGenre").val(),
    year: $("#bookYear").val(),
    isAvailable: true,
  };

  if (bookIndex) {
    books[bookIndex] = newBook;
  } else {
    books.push(newBook);
  }

  localStorage.setItem("books", JSON.stringify(books));
  $("#bookForm")[0].reset();
  $("#bookIndex").val("");
  loadBooks();
});

// Add or Update Borrower
$borrowerForm.on("submit", function (event) {
  event.preventDefault();
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  const borrowerIndex = $("#borrowerIndex").val();
  const newBorrower = {
    name: $("#borrowerName").val(),
    email: $("#borrowerEmail").val(),
    phone: $("#borrowerPhone").val(),
  };

  if (borrowerIndex) {
    borrowers[borrowerIndex] = newBorrower;
  } else {
    borrowers.push(newBorrower);
  }

  localStorage.setItem("borrowers", JSON.stringify(borrowers));
  $("#borrowerForm")[0].reset();
  $("#borrowerIndex").val("");
  loadBorrowers();
});

// Add Transaction
$transactionForm.on("submit", function (event) {
  event.preventDefault();
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const borrowerIndex = $("#transactionBorrower").val();
  const bookIndex = $("#transactionBook").val();

  if (!borrowerIndex || !bookIndex) return;

  books[bookIndex].isAvailable = false;
  transactions.push({
    borrower: borrowerIndex,
    book: bookIndex,
    date: new Date().toLocaleDateString(),
  });

  localStorage.setItem("books", JSON.stringify(books));
  localStorage.setItem("transactions", JSON.stringify(transactions));
  loadBooks();
  loadTransactions();
});

// Delete or Return Book
$booksList.on("click", ".delete-book", function () {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const index = $(this).data("index");
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  loadBooks();
});

$transactionsList.on("click", ".delete-transaction", function () {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const index = $(this).data("index");
  const bookIndex = transactions[index].book;

  books[bookIndex].isAvailable = true;
  transactions.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  localStorage.setItem("transactions", JSON.stringify(transactions));
  loadBooks();
  loadTransactions();
});

// Initial Load
$(document).ready(function () {
  loadBooks();
  loadBorrowers();
  loadTransactions();
});
