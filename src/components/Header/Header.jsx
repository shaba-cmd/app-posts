import { logout, token } from '../../modules/saveData'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header container">
        <Link className='header__logo' to='/'>CommentsPro.</Link>
        { token ? <p className="header__btn" onClick={() => {logout()}}>Выйти</p> : 
          <Link className="header__btn" to='/auth'>Войти</Link>}
    </header>
  )
}

export default Header