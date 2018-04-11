import axios from "axios";

export async function searchBooks(searchPhrase) {
  try {
    const phraseEscaped = searchPhrase.split(" ").join("+");
    const result = await axios.get(
      `http://openlibrary.org/search.json?q=${phraseEscaped}`
    );
    console.log(result)
    return result.data.docs.slice(0, 5).map(result => ({
        title: result.title,
        description: result.type,
        image: result.isbn && `http://covers.openlibrary.org/b/ISBN/${result.isbn[0]}-S.jpg`,
        price: result.title
      }));;
  } catch (exception) {
    return Promise.reject("Search exception", exception);
  }
}
