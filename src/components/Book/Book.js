import React, { useState, useEffect } from "react";
import "./Book.css";
import noImage from "../../images/noImage.png";

// This component expects to get props such as:
// authors(array), imgSrc(string), title(string), firstPublish(string)
const Book = (props) => {
  const [authors, setAuthors] = useState("");

  const printAuthors = () => {
    // This function goes over the array of authors and creates and sets a string containing the name of the author(s)
    // in case of no author sets the state to unkown
    let authorslist = "";
    props.authors === undefined
      ? (authorslist = "Unknown")
      : props.authors.map(
          (author) => (authorslist = authorslist + " " + author)
        );
    setAuthors(authorslist);
  };

  useEffect(() => {
    printAuthors();
  }, []);

  return (
    <div className="book__container">
      <div className="book__img__container">
        <img
          src={
            //This ternary expression diesplays a default image when no image is provided 
            props.imgSrc === undefined
              ? noImage
              : `http://covers.openlibrary.org/b/olid/${props.imgSrc}-M.jpg`
          }
        />
      </div>
      <div className="book__info__container">
        <p className="book__title">{props.title}</p>
        <p className="book__author">by {authors}.</p>
        <p className="book__publish">
          First publish{" "}
          {props.firstPublish === undefined ? "Unknown" : props.firstPublish}
        </p>
      </div>
    </div>
  );
};

export default Book;
