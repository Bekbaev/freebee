import jwtDecode from "jwt-decode"

const getCompanyId = () => {
    if (localStorage.access_token) {
        const tokenData = jwtDecode(localStorage.access_token);
        return tokenData.company_id;
    }
    return null
}

export default getCompanyId