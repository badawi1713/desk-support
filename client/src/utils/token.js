export const getToken = async () => {
    const user = await JSON.parse(window.localStorage.getItem("user"))
    return user ? user.token : null
}

export const removeToken = async () => {
    return  window.localStorage.removeItem("user");
   
}