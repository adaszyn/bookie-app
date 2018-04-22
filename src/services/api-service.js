import Axios from "axios";

const API_BASE = "https://api.adaszyn.site/bookie";
export async function authenticate(email, password) {
    const bodyFormData = new FormData();
    bodyFormData.set('email', email);
    bodyFormData.set('password', password);
    return Axios( {
        method: 'post',
        url: `${API_BASE}/login`,
        data: bodyFormData,
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
}
export async function register(email, password) {
    const bodyFormData = new FormData();
    bodyFormData.set('email', email);
    bodyFormData.set('password', password);
    return Axios( {
        method: 'post',
        url: `${API_BASE}/register`,
        data: bodyFormData,
        withCredentials: true,        
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
}
export function logOut () {
    return Axios( {
        method: 'get',
        url: `${API_BASE}/logout`,
        withCredentials: true,        
    })
}
export async function getNotes(token) {
    return Axios( {
        method: 'get',
        url: `${API_BASE}/notes/`,
        withCredentials: true,
    })
}

export async function getNote(token, id) {
    return Axios( {
        method: 'get',
        url: `${API_BASE}/notes/${id}`,
        withCredentials: true,
    })
}

export async function getNotesByBookId(id) {
    return Axios( {
        method: 'get',
        url: `${API_BASE}/book/${id}`,
        withCredentials: true,
    })
}
export async function createNote (bookId, content, isFav) {
    const data = new FormData();
    data.set('bookId', bookId);
    data.set('content', content);
    data.set('isFav', isFav);
    return Axios({
        method: "post",
        data: data,
        url: `${API_BASE}/notes/`,
        withCredentials: true,        
    })
}

export async function updateNote (noteId, bookId, content, isFav) {
    const data = new FormData();
    data.set('bookId', bookId);
    data.set('content', content);
    data.set('isFav', isFav);
    return Axios({
        method: "put",
        data: data,
        url: `${API_BASE}/notes/${noteId}`,
        withCredentials: true,        
    })
}


