import axios from "axios";


export const api = axios.create({
    baseURL: "https://api-myedu.herokuapp.com/",
});

export const createSession = async (email, password) => {
    return api.post("/admin/login", {
        email,
        password
    });

}
