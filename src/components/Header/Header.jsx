import { logout } from '../../modules/saveData'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = ({ isAuth, pageAuth }) => {
  return (
    <header className="header container">
        <Link className='header__logo' to='/'>CommentsPro.</Link>
        { isAuth ? <p className="header__btn" onClick={() => {logout()}}>Выйти</p> ? pageAuth : '' : 
          <Link className="header__btn" to='/auth'>Войти</Link>}
    </header>
  )
}

export default Header