import axios from "axios";
import { token } from "./saveData.js";
import { useEffect, useState } from "react";

const host = "https://wedev-api.sky.pro/api/v2/igr-shaba";
const authToken = "https://wedev-api.sky.pro/api/user";

const useComments = () => {
    const [comments, setComments] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        async function getComments() {
            try {
                setLoader(true);

                axios.get(host + '/comments', {
                    headers: { Authorization: `Bearer ${token}` },
                }).then(response => setComments(response.data.comments))
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
        getComments();
    }, [])

    function getComments() {
            try {
                setLoader(true);

                axios.get(host + '/comments', {
                    headers: { Authorization: `Bearer ${token}` },
                }).then(response => setComments(response.data.comments))
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }

    function postComments(text) {
        setLoader(true);

        return fetch(host + "/comments", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text }),
        })
        .finally(() => setLoader(false));
    } 
    
    function registration( login, name, password ) {
        return fetch(authToken, {
            method: "POST",
            body: JSON.stringify({
                login,
                name,
                password,
            }),
        }).then((response) => {
            if (response.status === 400) {
            throw new Error("Пользователь с таким логином уже существует");
            }
            return response.json();
        });
    }

    function log(login, password) {
        return fetch(authToken + "/login", {
            method: "POST",
            body: JSON.stringify({
                login,
                password,
            }),
        }).then((response) => {
            if (response.status === 400) {
            throw new Error("Неверный логин или пароль");
            }
            return response.json();
        });
    }
    
    function likeComment(id, token) {
        return fetch(`${host}/comments/${id}/toggle-like`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                return response.json();
            }
            throw new Error("Ошибка при установке лайка");
        });
    }

    return {
        comments,
        loader,
        getComments,
        postComments,
        setComments,
        likeComment,
        registration,
        log,
    }
}

export default useComments;