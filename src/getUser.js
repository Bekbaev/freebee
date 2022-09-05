import jwtDecode from "jwt-decode";

export default function getUser() {
    if (localStorage.access_token) {
        return jwtDecode(localStorage.access_token);
    }
    return {}
}
