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

            axios.get(host + '/comments', {
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

            axios.post(host + "/comments", { text }, {
              headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    
    async function registration(name, login, password) {
        try {
            axios.post(authToken, { login, name, password })
            .then(response => {
                console.log(response.data)
                console.log(response)
            });  
        } catch (error) {
            console.log(error);
        }
    }
    
    async function log(login, password) {
        try {
            axios.post(authToken + "/login", { login, password })
              .then(response => response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    async function likeComment(commentId, token) {
        try {
            axios.post(`${host}/comments/${commentId}/toggle-like`, {
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