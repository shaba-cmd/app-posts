import { useState } from 'react'
import './Auth.css'
import useComments from '../../modules/api'
import { useNavigate } from 'react-router-dom';
import { replaceMethod } from '../../modules/methods';
import { updateName, updateToken } from '../../modules/saveData';

const Auth = ({ getComments }) => {
  const [auth, setAuth] = useState(true);
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState(Number);
  const [error, setError] = useState('');
  const { registration, log } = useComments();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    setError('');
    
    const nameEl = replaceMethod(name);
    const loginEl = replaceMethod(login);

    if (auth) {
      log(loginEl, password)
        .then((data) => {
          updateToken(data.user.token);
          updateName(data.user.name);
          navigate('/posts');
          getComments()
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      registration(loginEl, nameEl, password)
        .then((data) => {
          updateToken(data.user.token);
          updateName(data.user.name);
          navigate('/posts');
          getComments()
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }

  return (
    <>
      <main className='auth'>
        <div className='auth__container'>
          {auth ? <h3>Авторизация</h3> : <h3>Регистрация</h3>}
          <form className='auth-form'>
            {error && <p className='err-form'>{error}</p>}
            
            {!auth && <input
                type="text"
                className="auth-form__input"
                placeholder="Введите имя"
                onChange={(el) => {setName(el.target.value)}}
            />}

            <input
                type="text"
                className="auth-form__input"
                placeholder="Введите логин"
                onChange={(el) => {setLogin(el.target.value)}}
            />
            
            <input
                type='password'
                className="auth-form__input"
                placeholder="Введите пароль"
                onChange={(el) => {setPassword(el.target.value)}}
            />
            
            <div className="auth-form__row">
                <p id="logout-btn" className="form-logout" onClick={() => {auth ? setAuth(false) : 
                  setAuth(true)}}>{auth ? 'Зарегистрироваться' : 'Войти'}</p>
                <button className="auth-form__button" onClick={(e) => {handleClick(e)}}>{auth ? 'Войти' : 'Зарегистрироваться'}</button>
            </div>
          </form>
        </div>
        
      </main>
    </>
  )
}

export default Auth