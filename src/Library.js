import styles from "./Library.module.css";
import { LoadingIcon, UpButton, DownButton } from "./Icons";
import React, { useEffect, useState } from "react";

const Book = ({ title, author, publicationYear }) => {
  return (
    <div className={styles.book}>
      <h2 className={styles.bookTitle}>{title}</h2>
      <p className={styles.bookDescription}>
        Published by <strong>{author}</strong> in <em>{publicationYear}</em>
      </p>
    </div>
  );
};

const Library = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("http://localhost:3000/books.json")
        .then((response) => response.json())
        .then((data) => setBooks(data.books))
        .then(setIsLoading(false));
    }, 1000);
  }, []);

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.sort}>
          <span className={styles.sortLabel}>Sort by publication year</span>
          <span>
            <UpButton
              className={styles.arrow}
              onClick={() => setSort("desc")}
            />
            <DownButton
              className={styles.arrow}
              onClick={() => setSort("asc")}
            />
          </span>
        </div>

        <input
          type="search"
          id="search"
          placeholder="Search books..."
          className={styles.search}
          onChange={handleOnChange}
        />
      </header>
      <main>
        <h1>Book library</h1>
        {isLoading ? <LoadingIcon /> : <div></div>}
        {filteredBooks
          .sort((a, b) => {
            if (sort === "asc") {
              return a.publicationYear - b.publicationYear;
            }
            if (sort === "desc") {
              return b.publicationYear - a.publicationYear;
            }
          })
          .map((book, i) => {
            return (
              <Book
                key={i}
                title={book.title}
                author={book.author}
                publicationYear={book.publicationYear}
              />
            );
          })}
      </main>
    </div>
  );
};

export default Library;
