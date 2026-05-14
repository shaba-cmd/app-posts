import { name, token } from '../../modules/saveData'
import './Main.css'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <>
      <main className="main container">
          <div className="main__container">
            { name ? <h1 className="main__title" >{name.charAt(0).toUpperCase() + name.slice(1)}, добро пожаловать в <span>CommentsPro.</span></h1> 
            : <h1 className="main__title" >Вас приветствует <span>CommentsPro.</span></h1>}
            <div className="main__link-box">
              <p className="main__link">Смотреть <Link className='main__link_unique' to='/posts'>посты</Link></p>
              { !token && <div className='main__line'></div> }
              { !token && <p className="main__link"><Link className='main__link_unique' to='/auth'>Войти</Link> в профиль</p> }
            </div>
          </div>
      </main>
    </>
  )
}

export default Main