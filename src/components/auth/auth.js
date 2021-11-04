import axios from "axios";
const server = process.env.SERVER_URL || "https://twetterclone.herokuapp.com"
const headers = {
    
}
export function signUp(name, email, password, toggleLoading) {
    toggleLoading()
    axios.put(`${server}/auth/signup`, {
        username: name,
        email: email,
        password: password
    }, headers).then((response) => {
        toggleLoading()
    }).catch(err => {
        console.log(err.response)
        toggleLoading()
    });

}

export function login(email, password, context, setState) {
    setState()
    axios.post(`${server}/auth/login`, {
        email: email,
        password: password
    }, headers).then(res => {
        setState()
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("currentUser", JSON.stringify(res.data))
        context.setUser(res.data)
        
    }).catch(err => {
        setState()
        
    })
}

export function logout(context){
    context.setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("currentUser")
}
