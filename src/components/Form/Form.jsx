import { replaceMethod } from '../../modules/methods.js';
import { logout, name } from '../../modules/saveData.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'

const Form = ({ getComments, postComments }) => {
    const [error, setError] = useState('')
    const [text, setText] = useState('');
    const navigate = useNavigate()

    const handlePostClick = (e) => {
        e.preventDefault()

        setError('');

        const textEl = replaceMethod(text);
        
         if (textEl.length < 3) {
            setError("Текст комментария должен быть не менее 3 символов");
            return;
        }

        postComments(textEl)
            .then(() => {
                getComments();
                setText('');
            })
            .catch ((err) => {
                if (err.message === "Ошибка сервера") {
                    setError("Ошибка сервера. Попробуйте ещё раз.");
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
                }}>Выйти</p>
                <button className="add-form__button" onClick={(e) => {handlePostClick(e)}}>Написать</button>
            </div>
        </form>
    )
}

export default Form