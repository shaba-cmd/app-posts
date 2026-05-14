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

    async function fetchRenderComments() {
        try {
            setLoader(true);

            await axios.get(host + '/comments', {
                headers: { Authorization: `Bearer ${token}` },
            }).then(response => setComments(response.data.comments))
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    async function postComments(text) {
        try {
            setLoader(true);

            await axios.post(host + "/comments", { text }, {
              headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
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
    
    async function likeComment(commentId, token) {
        try {
            await axios.post(`${host}/comments/${commentId}/toggle-like`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then(response => response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        comments,
        loader,
        fetchRenderComments,
        postComments,
        registration,
        log,
        likeComment
    }
}


export default useComments;