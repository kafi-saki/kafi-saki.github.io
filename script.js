// Book data  
const books = [  
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", description: "A powerful story of race, class, justice, and childhood innocence set in a small Southern town during the Depression.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian", description: "A chilling portrait of a totalitarian society where government surveillance, propaganda, and control are absolute.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", description: "The story of wealthy Jay Gatsby and his love for Daisy Buchanan, capturing the essence of the Jazz Age.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 4, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", description: "The first adventure of the young wizard Harry Potter as he discovers his magical heritage and begins his education at Hogwarts.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", description: "The story of Bilbo Baggins, a hobbit who embarks on an unexpected journey to reclaim the treasure guarded by the dragon Smaug.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 6, title: "Dune", author: "Frank Herbert", genre: "Science Fiction", description: "A complex blend of politics, religion, ecology, and human emotion set on the desert planet Arrakis.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 7, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", description: "The story of Elizabeth Bennet, her complicated relationship with Mr. Darcy, and the world of the English landed gentry at the turn of the 19th century.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 8, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", description: "The story of Holden Caulfield, a teenager who recounts his experiences in New York City after being expelled from prep school.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 9, title: "The Hunger Games", author: "Suzanne Collins", genre: "Dystopian", description: "In a dystopian future, teenagers are forced to fight to the death in an annual televised battle called the Hunger Games.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 10, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", genre: "Non-fiction", description: "A thought-provoking exploration of the history of Homo sapiens, from ancient times to the present day.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 11, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", description: "A fable about following your dreams and listening to your heart, centered around a young Andalusian shepherd named Santiago.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 12, title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", description: "An epic high-fantasy story of the quest to destroy the One Ring and defeat the Dark Lord Sauron.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 13, title: "The Da Vinci Code", author: "Dan Brown", genre: "Mystery", description: "A thrilling mystery that follows symbologist Robert Langdon as he investigates a murder in the Louvre Museum.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 14, title: "The Fault in Our Stars", author: "John Green", genre: "Romance", description: "A heart-wrenching love story about two teenagers with cancer who meet at a support group.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 15, title: "The Road", author: "Cormac McCarthy", genre: "Dystopian", description: "A father and son's journey through post-apocalyptic America, fighting for survival in a world devoid of civilization.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 16, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", genre: "Non-fiction", description: "An exploration of the two systems that drive the way we think—System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 17, title: "Foundation", author: "Isaac Asimov", genre: "Science Fiction", description: "Set in the far future, a psychohistorian predicts the fall of the Galactic Empire and sets a plan in motion to minimize the dark age that will follow.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 18, title: "Meditations", author: "Marcus Aurelius", genre: "Philosophy", description: "A series of personal writings by the Roman Emperor Marcus Aurelius, recording his private notes to himself and ideas on Stoic philosophy.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 19, title: "The Power of Now", author: "Eckhart Tolle", genre: "Self-Help", description: "A guide to spiritual enlightenment, focusing on living in the present moment and avoiding thoughts of the past or future.", cover: "https://via.placeholder.com/400x600", isFavorite: false },  
    { id: 20, title: "Neuromancer", author: "William Gibson", genre: "Science Fiction", description: "A groundbreaking cyberpunk novel that follows a washed-up computer hacker hired for one last job.", cover: "https://via.placeholder.com/400x600", isFavorite: false }  
];

const bookGrid = document.getElementById('book-grid');
const searchInput = document.getElementById('search');
const genreFilter = document.getElementById('genre-filter');
const favoritesToggle = document.getElementById('favorites-toggle');
const themeToggle = document.getElementById('theme-toggle');
const sortSelect = document.getElementById('sort-select');
const paginationContainer = document.getElementById('pagination');

const booksPerPage = 8;
let currentPage = 1;

themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-theme');
    if (isDarkMode) {
        themeToggle.innerHTML = `<i class="fas fa-sun"></i> <span>Light Mode</span>`;
    } else {
        themeToggle.innerHTML = `<i class="fas fa-moon"></i> <span>Dark Mode</span>`;
    }
});

function getFilteredBooks() {
    let filtered = books;

    // Search
    const search = searchInput.value.trim().toLowerCase();
    if (search) {
        filtered = filtered.filter(book =>
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search)
        );
    }

    // Genre filter
    const genre = genreFilter.value;
    if (genre !== 'all') {
        filtered = filtered.filter(book => book.genre === genre);
    }

    // Favorites filter
    if (favoritesToggle.checked) {
        filtered = filtered.filter(book => book.isFavorite);
    }

    // Sorting
    const sortBy = sortSelect.value;
    filtered = filtered.slice().sort((a, b) => {
        if (sortBy === "title") {
            return a.title.localeCompare(b.title);
        } else {
            return a.author.localeCompare(b.author);
        }
    });

    return filtered;
}

function renderBooks() {
    const filteredBooks = getFilteredBooks();
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (currentPage > totalPages) currentPage = 1;
    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    const booksToShow = filteredBooks.slice(start, end);

    bookGrid.innerHTML = "";

    if (booksToShow.length === 0) {
        bookGrid.innerHTML = `<div class="no-books">No books found.</div>`;
        paginationContainer.innerHTML = "";
        return;
    }

    booksToShow.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}">
                <button class="favorite-btn${book.isFavorite ? " active" : ""}" data-id="${book.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-genre">${book.genre}</div>
                <div class="book-description">${book.description}</div>
            </div>
        `;
        bookGrid.appendChild(card);
    });

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = Number(this.getAttribute('data-id'));
            const book = books.find(b => b.id === id);
            book.isFavorite = !book.isFavorite;
            renderBooks();
        });
    });

    renderPagination(filteredBooks.length, totalPages);
}

function renderPagination(total, totalPages) {
    paginationContainer.innerHTML = "";
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? "active" : "";
        btn.addEventListener('click', () => {
            currentPage = i;
            renderBooks();
        });
        paginationContainer.appendChild(btn);
    }
}

searchInput.addEventListener('input', () => {
    currentPage = 1;
    renderBooks();
});
genreFilter.addEventListener('change', () => {
    currentPage = 1;
    renderBooks();
});
favoritesToggle.addEventListener('change', () => {
    currentPage = 1;
    renderBooks();
});
sortSelect.addEventListener('change', () => {
    currentPage = 1;
    renderBooks();
});

renderBooks();
