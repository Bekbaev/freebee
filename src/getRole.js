import jwtDecode from "jwt-decode"

const getRole = () => {
    if (localStorage.access_token) {
        const tokenData = jwtDecode(localStorage.access_token)
        return tokenData.role
    }
    return null
}

export default getRole
