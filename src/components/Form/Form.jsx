import { replaceMethod } from '../../modules/methods.js';
import { logout, name } from '../../modules/saveData.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useComments from '../../modules/api'
import './Form.css'

const Form = () => {
    const { postComments, fetchRenderComments } = useComments();
    const [error, setError] = useState('')
    const [text, setText] = useState('');
    const navigate = useNavigate()

    const handlePostClick = (e) => {
        e.preventDefault()

        setError('');

        const textEl = replaceMethod(text);

        (textEl.length < 3) && setError("Текст комментария должен быть не менее 3 символов")
        
        postComments(textEl)
            .then(() => fetchRenderComments()) // не обновляет список
            .then(() => setText('')) // очищает даже если ошибся, очищать только если отправил комм
            .catch ((error) => {
                if (error.message === "Ошибка сервера") {
                    handlePostClick();
                } else {
                    setError("Проверьте интернет соединение и попробуйте еще раз");
                }
            })
    }

    return (
        <form className='add-form'>
            <input
                type="text"
                className="add-form__name"
                readOnly
                value={name}
            />
            
            <div className='add-form__text-box'>
                {error && <p className='err-form'>{error}</p>}
                <textarea
                    className="add-form__text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>
            
            <div className="add-form__row">
                <p id="logout-btn" className="form-logout" onClick={() => {
                    logout();
                    navigate('/');
                    window.location.reload();
                }}>Выйти</p>
                <button className="add-form__button" onClick={(e) => {handlePostClick(e)}}>Написать</button>
            </div>
        </form>
    )
}

export default Form