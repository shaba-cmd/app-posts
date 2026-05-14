import { useState } from 'react'
import './Auth.css'
import useComments from '../../modules/api'
import { Link } from 'react-router-dom';
import { updateName, updateToken } from '../../modules/saveData';

const Auth = () => {
  const { registration, log } = useComments();
  const [auth, setAuth] = useState(true);
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState(Number);

  return (
    <>
      <main className='auth'>
        <div className='auth__container'>
          {auth ? <h3>Авторизация</h3> : <h3>Регистрация</h3>}

          <form className='auth-form'>
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
                <p id="logout-btn" className="form-logout" onClick={() => {auth ? setAuth(false) : setAuth(true)}}>{auth ? 'Зарегистрироваться' : 'Войти'}</p>
                <button className="auth-form__button" onClick={(el) => {
                  el.preventDefault();

                  auth ? 
                    log(login, password)
                      .then((data) => {
                        console.log(data);
                        updateToken();
                        updateName();
                      })
                  : 
                    registration(name, login, password)
                }}><Link className='auth-form__button-link' to='/posts'>{auth ? 'Войти' : 'Зарегистрироваться'}</Link></button>
            </div>
          </form>
        </div>
        
      </main>
    </>
  )
}

export default Auth