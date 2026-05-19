import { useState } from 'react'
import { nowDateTime } from '../../modules/methods.js'
import { token } from '../../modules/saveData.js'
import './Post.css'

const Post = ({ author, date, id, isLiked, likes, text, likeComment, setComments }) => { 
  const [isLoading, setIsLoading] = useState(false);

  const likeBtn = () => {
    setIsLoading(true);

    likeComment(id, token)
      .then((data) => {
        setComments(prev => prev.map(comment => 
          comment.id === id 
            ? { ...comment, likes: data.result.likes, isLiked: data.result.isLiked }
            : comment
        ));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <article className="comment" key={id}>
      <div className="comment__header">
        <h3>{author}</h3>
        <p>{nowDateTime(date)}</p>
      </div>

      <p className="comment__text">{text}</p>
      
      <div className="comment__likes">
        <span className={`comment__likes-counter ${isLiked ? 'liked' : ''}`}>
          {likes}
        </span>
        <button
          className={`like-button ${isLiked ? 'like-button--active' : ''}`}
          onClick={likeBtn}
          disabled={isLoading}
        >
          {isLoading ? '...' : (isLiked ? '❤️' : '🤍')}
        </button>
      </div>
    </article>
  )
}

export default Post