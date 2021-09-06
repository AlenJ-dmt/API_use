import React, { useState, useEffect } from "react";
import OpenLibraryServices from "../../services";
import "./Search.css";
import Book from "../Book/Book";
import ReactLoading from "react-loading";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchForBooks = () => {
    // this function makes the API Call looking for books and set the response in the state

    setIsLoading(true);
    OpenLibraryServices.searchBook(book)
      .then((response) => setBooks(response.data.docs))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Everytime the user type and click for a new search it displays a loading-component, so that the user knows the app is working
    // Once loading is complete show results and dismounts loading-component
    populateResults();
    setIsLoading(false);
  }, [books]);

  const populateResults = () => {
    // This funciton takes the API response and displays the the most usefull information to the user

    if (books !== []) {
      return books.map((book, idx) => (
        <Book
          key={idx}
          imgSrc={book.cover_edition_key}
          title={book.title}
          authors={book.author_name}
          firstPublish={book.first_publish_year}
        />
      ));
    }
    return;
  };

  return (
    <div className="search__container">
      <div className="header__container">
        <input onChange={(ev) => setBook(ev.target.value)}></input>
        <button onClick={() => searchForBooks()}>Search</button>
      </div>
      {isLoading ? (
        <div className="loading__container">
          <ReactLoading type={"spin"} />
        </div>
      ) : (
        <div className="results__container">{populateResults()}</div>
      )}
    </div>
  );
};

export default Search;
