export const getToken = async () => {
    const user = await JSON.parse(window.localStorage.getItem("user"))
    return user ? user.token : ''
}

export const removeToken = async () => {
    return  window.localStorage.removeItem("user");
   
}