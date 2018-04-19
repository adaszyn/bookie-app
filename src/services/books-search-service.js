import axios from "axios";
import { findWhere } from "underscore";
const LIMIT = 5;
const TOKEN = "AIzaSyDVy9lkJzUvrg6DFTgsO9q51uapMeuvfGA";

const trimText = (text = "", maxLength) => {
  if (text.length > maxLength) return text.slice(0, maxLength) + "...";
  return text;
};
const getIdentifier = identifier => result => {
  const code = findWhere(result.volumeInfo.industryIdentifiers, {
    type: identifier
  });
  return code && code.identifier;
};
const getISBN10 = getIdentifier("ISBN_10");
const getISBN13 = getIdentifier("ISBN_13");

function formatBookResponse(result) {
  return {
    id: result.id,
    isbn10: getISBN10(result),
    isbn13: getISBN13(result),
    title: result.volumeInfo.title,
    description: trimText(result.volumeInfo.description, 20),
    fullDescription: result.volumeInfo.description,
    image:
      result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.thumbnail
  };
}
export async function searchGoogleBooks(searchPhrase) {
  try {
    const phraseEscaped = searchPhrase.split(" ").join("+");
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${phraseEscaped}&key=${TOKEN}`
    );

    return result.data.items
      .map(formatBookResponse)
      .filter(book => book.isbn10)
      .slice(0, LIMIT);
  } catch (exception) {
    console.log(exception);
    return Promise.reject("Search exception", exception);
  }
}

export async function searchBookByID(id) {
  try {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${id}&key=${TOKEN}`
    );
    const book = result.data.items[0];
    return book && formatBookResponse(book);
  } catch (exception) {
    console.log(exception);
    return Promise.reject("Search exception", exception);
  }
}
