import './Main.css'
import { Link } from 'react-router-dom'

const Main = ({ isAuth }) => {
  return (
    <>
      <main className="main container">
          <div className="main__container">
            <h1 className="main__title" >Вас приветствует <span>CommentsPro.</span></h1>
            <div className="main__link-box">
              <p className="main__link">Смотреть <Link className='main__link_unique' to='/posts'>посты</Link></p>
              { !isAuth && <div className='main__line'></div> }
              { !isAuth && <p className="main__link"><Link className='main__link_unique' to='/auth'>Войти</Link> в профиль</p> }
            </div>
          </div>
      </main>
    </>
  )
}

export default Main