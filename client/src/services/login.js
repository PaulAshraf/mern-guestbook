
const loginUser = (token, data) => {
    localStorage.setItem('userToken', token)
    localStorage.setItem('userData', JSON.stringify(data))
} 

const logoutUser = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
}

const getCurrUserToken = () => {
    return localStorage.getItem('userToken')
}

const getCurrUserData = () => {
    return JSON.parse(localStorage.getItem('userData'))
}

export default {
    loginUser,
    logoutUser,
    getCurrUserData,
    getCurrUserToken
}