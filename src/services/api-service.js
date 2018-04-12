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
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
}