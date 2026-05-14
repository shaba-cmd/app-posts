import { useState } from 'react';
import useComments from '../../modules/api'
import './Form.css'
import { replaceMethod } from '../../modules/methods.js';
import { logout } from '../../modules/saveData.js';

const Form = ({ name }) => {
    const { postComments, fetchRenderComments } = useComments();
    const [text, setText] = useState('');

    return (
        <form className='add-form'>
            <input
                type="text"
                className="add-form__name"
                readOnly
                value={name}
            />
            
            <textarea
                className="add-form__text"
                placeholder="Введите ваш коментарий"
                rows="4"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            
            <div className="add-form__row">
                <p id="logout-btn" className="form-logout" onClick={() => {logout()}}>Выйти</p>
                <button className="add-form__button" onClick={() => {
                    setText(replaceMethod(text))

                    const handlePostClick = () => {
                        postComments(text)
                            .then((response) => {
                                if (response.status === 400 && text.length < 3) {
                                        throw new Error("Текст комментария должен быть не менее 3 символов");
                                } else if (response.status === 500) {
                                    throw new Error("Ошибка сервера");
                                }
                            })
                            .then(() => fetchRenderComments())
                            .then(() => {
                                setText("")
                            })
                            .catch((error) => {
                                if (text.length < 3) {
                                    alert(error.message);
                                } else if (error.message === "Ошибка сервера") {
                                    handlePostClick();
                                } else {
                                    alert("Проверте интернет соединение и попробуйте еще раз");
                                }
                            })
                    }

                    handlePostClick();
                }}>Написать</button>
            </div>
        </form>
    )
}

export default Form