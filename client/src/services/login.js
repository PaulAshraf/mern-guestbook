
const loginUser = (token, data) => {
    localStorage.setItem('userToken', token)
    localStorage.setItem('userData', JSON.stringify(data))
} 

const logoutUser = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
}

const getCurrUserToken = () => {
    localStorage.getItem('userToken')
}

const getCurrUserData = () => {
    JSON.parse(localStorage.getItem('userData'))
}

export default {
    loginUser,
    logoutUser,
    getCurrUserData,
    getCurrUserToken
}