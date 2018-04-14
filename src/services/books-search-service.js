import axios from "axios";

const LIMIT = 5;

export async function searchGoogleBooks(searchPhrase) {
  try {
    const phraseEscaped = searchPhrase.split(" ").join("+");
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${phraseEscaped}&key=AIzaSyDVy9lkJzUvrg6DFTgsO9q51uapMeuvfGA`
    );

    return result.data.items.slice(0,LIMIT).map(result => ({
      isbn10: ((result) => {
        var isbn10 = result.volumeInfo.industryIdentifiers.find(identifier => identifier.type === "ISBN_10")
        if(typeof isbn10 === 'undefined') return "";
        else return isbn10;
      })(result), 
      isbn13: ((result) => {
        var isbn13 = result.volumeInfo.industryIdentifiers.find(identifier => identifier.type === "ISBN_13")
        if(typeof isbn13 === 'undefined') return "";
        else return isbn13;
      })(result), 
      title: result.volumeInfo.title,
      description: ((result) => {
        if(typeof result.volumeInfo.description === 'undefined') return "";
        return result.volumeInfo.description.substring(0, 20) + " ...";
      })(result),
      image: ((result) => {
        if(result.volumeInfo.imageLinks){
          return result.volumeInfo.imageLinks.thumbnail;
        } else return "";
      })(result), 
      price: ((result) => {
        var saleInfo = result.saleInfo;
        if(typeof saleInfo !== 'undefined' && typeof saleInfo.retailPrice !== 'undefined'){
          return saleInfo.retailPrice.amount + "," + saleInfo.retailPrice.currencyCode;
        } else {
          return "";
        }
      })(result)
    }));
  } catch(exception){
      console.log(exception);
      return Promise.reject("Search exception", exception);
  }
}
