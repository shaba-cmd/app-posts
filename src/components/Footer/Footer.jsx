import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer container">
        <Link className="footer__logo" to='/'>CommentsPro.</Link>
        <p className="footer__text">Все права защищены</p>
    </footer>
  )
}

export default Footer