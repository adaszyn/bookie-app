import Axios from "axios";

const API_BASE = "https://api.adaszyn.site/bookie";
export async function authenticate(email, password) {
    var bodyFormData = new FormData();
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
    var bodyFormData = new FormData();
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