import { nowDateTime } from '../../modules/methods.js'
import './Post.css'

const Post = ({ author, date, id, likes, text }) => {  
  return (
    <article className="comment" key={id}>
      <div className="comment__header">
        <h3>{author}</h3>
        <p>{nowDateTime(date)}</p>
      </div>

      <p className="comment__text">{text}</p>
      
      <div className="comment__likes">
        <span className="comment__likes-counter" data-index={id}>{likes}</span>
        <button>ads</button>
      </div>
    </article>
  )
}

export default Post