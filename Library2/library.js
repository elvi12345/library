<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
// Get references to the elements on each page
const $bookForm = $("#bookForm");
const $borrowerForm = $("#borrowerForm");
const $transactionForm = $("#transactionForm");


function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const $booksList = $("#booksList");

  $booksList.empty(); // Clear existing rows
  if (books.length === 0) {
    $booksList.append(`<tr><td colspan="7">No books available.</td></tr>`);
  } else {
    books.forEach((book, index) => {
      const $row = $(`
        <tr>
          <td>${index + 1}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
          <td>${book.year}</td>
          <td>${book.status}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-book" data-id="${book.id}">Edit</button>
            <button class="btn btn-danger btn-sm delete-book" data-id="${book.id}">Delete</button>
          </td>
        </tr>
      `);
      $booksList.append($row);
    });
  }
}
function loadBorrowers() {
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  const $borrowersList = $("#borrowersList");

  $borrowersList.empty(); // Clear existing rows
  if (borrowers.length === 0) {
    $borrowersList.append(`<tr><td colspan="5">No borrowers available.</td></tr>`);
  } else {
    borrowers.forEach((borrower, index) => {
      const $row = $(`
        <tr>
          <td>${index + 1}</td>
          <td>${borrower.name}</td>
          <td>${borrower.email}</td>
          <td>${borrower.phone}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-borrower" data-id="${borrower.id}">Edit</button>
            <button class="btn btn-danger btn-sm delete-borrower" data-id="${borrower.id}">Delete</button>
          </td>
        </tr>
      `);
      $borrowersList.append($row);
    });
  }
}
function saveBook(event) {
  event.preventDefault();
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const id = $("#bookIndex").val() || Math.random().toString(36).substring(2, 15); // Generate unique ID
  const book = {
    id,
    title: $("#bookTitle").val(),
    author: $("#bookAuthor").val(),
    genre: $("#bookGenre").val(),
    year: $("#bookYear").val(),
    status: "Available" // Default status for new books
  };

  if ($("#bookIndex").val()) {
    const bookIndex = books.findIndex((b) => b.id === id);
    books[bookIndex] = book; // Update existing book
  } else {
    books.push(book); // Add new book
  }

  localStorage.setItem("books", JSON.stringify(books)); // Save to localStorage
  loadBooks(); // Reload list
  resetBookForm();
}
function saveBorrower(event) {
  event.preventDefault();
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  const id = $("#borrowerIndex").val() || Math.random().toString(36).substring(2, 15); // Generate unique ID
  const borrower = {
    id,
    name: $("#borrowerName").val(),
    email: $("#borrowerEmail").val(),
    phone: $("#borrowerPhone").val()
  };

  if ($("#borrowerIndex").val()) {
    const borrowerIndex = borrowers.findIndex((b) => b.id === id);
    borrowers[borrowerIndex] = borrower; // Update existing borrower
  } else {
    borrowers.push(borrower); // Add new borrower
  }

  localStorage.setItem("borrowers", JSON.stringify(borrowers)); // Save to localStorage
  loadBorrowers(); // Reload list
  resetBorrowerForm();
}

// Books management
function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const $booksList = $("#booksList");
  $booksList.empty();

  books.forEach((book, index) => {
    const $row = $(`
      <tr>
        <td>${index + 1}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.year}</td>
        <td>${book.status}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-book" data-id="${book.id}">Edit</button>
          <button class="btn btn-danger btn-sm delete-book" data-id="${book.id}">Delete</button>
        </td>
      </tr>
    `);
    $booksList.append($row);
  });
}

// Save or update book
function saveBook(event) {
  event.preventDefault();
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const id = $("#bookIndex").val() || Math.random().toString(36).substring(2, 15);
  const book = {
    id,
    title: $("#bookTitle").val(),
    author: $("#bookAuthor").val(),
    genre: $("#bookGenre").val(),
    year: $("#bookYear").val(),
    status: "Available"  // Default status
  };

  if ($("#bookIndex").val()) {
    // Update existing book
    const bookIndex = books.findIndex((b) => b.id === id);
    books[bookIndex] = book;
  } else {
    // Add new book
    books.push(book);
  }

  localStorage.setItem("books", JSON.stringify(books));
  loadBooks();
  resetBookForm();
}

// Edit book
function editBook(id) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book = books.find((b) => b.id === id);
  if (book) {
    $("#bookTitle").val(book.title);
    $("#bookAuthor").val(book.author);
    $("#bookGenre").val(book.genre);
    $("#bookYear").val(book.year);
    $("#bookIndex").val(id);
  }
}

// Delete book
function deleteBook(id) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const updatedBooks = books.filter((book) => book.id !== id);
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  loadBooks();
}

// Borrowers management
function loadBorrowers() {
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  const $borrowersList = $("#borrowersList");
  $borrowersList.empty();

  borrowers.forEach((borrower, index) => {
    const $row = $(`
      <tr>
        <td>${index + 1}</td>
        <td>${borrower.name}</td>
        <td>${borrower.email}</td>
        <td>${borrower.phone}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-borrower" data-id="${borrower.id}">Edit</button>
          <button class="btn btn-danger btn-sm delete-borrower" data-id="${borrower.id}">Delete</button>
        </td>
      </tr>
    `);
    $borrowersList.append($row);
  });
}

// Save or update borrower
function saveBorrower(event) {
  event.preventDefault();
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  const id = $("#borrowerIndex").val() || Math.random().toString(36).substring(2, 15);
  const borrower = {
    id,
    name: $("#borrowerName").val(),
    email: $("#borrowerEmail").val(),
    phone: $("#borrowerPhone").val()
  };

  if ($("#borrowerIndex").val()) {
    // Update existing borrower
    const borrowerIndex = borrowers.findIndex((b) => b.id === id);
    borrowers[borrowerIndex] = borrower;
  } else {
    // Add new borrower
    borrowers.push(borrower);
  }

  localStorage.setItem("borrowers", JSON.stringify(borrowers));
  loadBorrowers();
  resetBorrowerForm();
}

// Edit borrower
function editBorrower(id) {
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  const borrower = borrowers.find((b) => b.id === id);
  if (borrower) {
    $("#borrowerName").val(borrower.name);
    $("#borrowerEmail").val(borrower.email);
    $("#borrowerPhone").val(borrower.phone);
    $("#borrowerIndex").val(id);
  }
}

// Delete borrower
function deleteBorrower(id) {
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  const updatedBorrowers = borrowers.filter((borrower) => borrower.id !== id);
  localStorage.setItem("borrowers", JSON.stringify(updatedBorrowers));
  loadBorrowers();
}

// Transactions management
function loadTransactions() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const $transactionsList = $("#transactionsList");
  $transactionsList.empty();

  transactions.forEach((transaction, index) => {
    const $row = $(`
      <tr>
        <td>${index + 1}</td>
        <td>${transaction.borrowerName}</td>
        <td>${transaction.bookTitle}</td>
        <td>${new Date(transaction.date).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-danger btn-sm delete-transaction" data-id="${transaction.id}">Delete</button>
        </td>
      </tr>
    `);
    $transactionsList.append($row);
  });
}

// Record a transaction
function recordTransaction(event) {
  event.preventDefault();
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const transaction = {
    id: Math.random().toString(36).substring(2, 15),
    borrowerName: $("#transactionBorrower").val(),
    bookTitle: $("#transactionBook").val(),
    date: new Date().toISOString()
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  loadTransactions();
}

// Reset forms after saving
function resetBookForm() {
  $("#bookForm")[0].reset();
  $("#bookIndex").val("");
}

function resetBorrowerForm() {
  $("#borrowerForm")[0].reset();
  $("#borrowerIndex").val("");
}

// Event listeners
$bookForm.on("submit", saveBook);
$borrowerForm.on("submit", saveBorrower);
$transactionForm.on("submit", recordTransaction);

// Event delegation for dynamically created buttons
$("#booksList").on("click", ".edit-book", function () {
  const id = $(this).data("id");
  editBook(id);
});

$("#booksList").on("click", ".delete-book", function () {
  const id = $(this).data("id");
  deleteBook(id);
});

$("#borrowersList").on("click", ".edit-borrower", function () {
  const id = $(this).data("id");
  editBorrower(id);
});

$("#borrowersList").on("click", ".delete-borrower", function () {
  const id = $(this).data("id");
  deleteBorrower(id);
});

$("#transactionsList").on("click", ".delete-transaction", function () {
  const id = $(this).data("id");
  deleteTransaction(id);
});

// Load data when page loads
$(document).ready(function () {
  loadBooks();
  loadBorrowers();
  loadTransactions();

  // Populate dropdowns for transactions
  const borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];
  const books = JSON.parse(localStorage.getItem("books")) || [];

  borrowers.forEach((borrower) => {
    $("#transactionBorrower").append(new Option(borrower.name, borrower.id));
  });

  books.forEach((book) => {
    $("#transactionBook").append(new Option(book.title, book.id));
  });
});
