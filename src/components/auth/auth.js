import axios from "axios";
export async function signUp(username, email, password) {
   let response = axios.put(`https://twetterclone.herokuapp.com/auth/signup`, {username, email, password})
   return response

}

export async function login(email, password) {
    let response = axios.post(`https://twetterclone.herokuapp.com/auth/login`, {email, password})

   return response
}

export function logout(context){
    context.setUser(null)
    localStorage.removeItem("currentUser")
}
