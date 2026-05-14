import './Posts.css'
import Post from '../../components/Post/Post'
import Loader from '../../components/Loader/Loader'
import Form from '../../components/Form/Form'
import { Link } from 'react-router-dom'


const Posts = ({ comments, loader, name, isAuth }) => {
  return (
    <>
      <main className="posts container">
        <h2 className='posts__title'>Комментарии</h2>
        <div className='posts__box-comm'>
          { (loader || comments.length === 0) ? <Loader /> :
            comments.map((el) => {
              return (
                <Post 
                  key={el.id}
                  author={el.author.name}
                  date={el.date}
                  id={el.id}
                  likes={el.likes}
                  text={el.text}
                />
              )
          })}
          {isAuth ? <Form name={name} /> : 
          <p className='auth-post'><Link className='auth-link' to='/auth'>Войдите</Link> в профиль, чтобы оставить комментарий</p>}
        </div>
      </main>
    </>
  )
}

export default Posts