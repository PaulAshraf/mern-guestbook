
const loginUser = (token, data) => {
    localStorage.setItem('userToken', token)
    localStorage.setItem('userData', data)
} 

const logoutUser = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
}

const getCurrUserToken = () => {
    localStorage.getItem('userToken')
}

const getCurrUserData = () => {
    localStorage.getItem('userData')
}

export default {
    loginUser,
    logoutUser,
    getCurrUserData,
    getCurrUserToken
}