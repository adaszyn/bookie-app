import axios from "axios";
import { findWhere } from "underscore";
import {clearSpecialCharacters} from "../util/string.util";
import qs from "simple-query-string";

const LIMIT = 5;
const TOKEN = "AIzaSyDu4kB0pi3srmAoCUIUfKg8j0kBzI_jFH0";

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
const getOther = getIdentifier("OTHER");

function formatBookResponse(result) {
  return {
    id: result.id,
    isbn10: getISBN10(result),
    isbn13: getISBN13(result),
    otherIdentifier: getOther(result),
    title: result.volumeInfo.title,
    authors: result.volumeInfo.authors,
    rating: result.volumeInfo.averageRating,
    description: trimText(result.volumeInfo.description, 25),
    fullDescription: result.volumeInfo.description,
    image:
      result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.thumbnail
  };
}
export async function searchGoogleBooks(searchPhrase, options = {}) {
  try {
    const phraseEscaped = clearSpecialCharacters(searchPhrase).split(" ").join("+");
    if (phraseEscaped === "") {
        return Promise.resolve([]);
    }
    options.maxResults = options.maxResults || LIMIT;
    options.langRestrict = options.langRestrict || "en";
    const params = qs.stringify({
      q: phraseEscaped,
      key: TOKEN,
      ...options,
    })
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?${params}`
    );

    return result.data.items
      .map(formatBookResponse)
      .filter(book => book.isbn10 || book.isbn13 || book.otherIdentifier)
  } catch (exception) {
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
    return Promise.reject("Search exception", exception);
  }
}
