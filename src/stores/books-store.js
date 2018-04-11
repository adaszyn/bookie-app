import { action, observable} from "mobx"

export class BooksStore {
    @observable header = "Hello";
    @observable books = new Map([
        ["123", {name: "hello world"}]
    ]);
    @action addBook (book) {
        this.books.set(book.id, book);
    }
    @action setHeader (header) {
        this.header = header;
    }
}