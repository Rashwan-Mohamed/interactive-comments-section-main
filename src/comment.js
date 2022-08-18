import { Replay } from './replay'
import { useGlobalContext } from './context'
import { Teoggle } from './toggle'
import React, { useState, useEffect, useRef } from 'react'
export const Comment = ({ id, content, createdAt, score, user, replies }) => {
  const {  currentUser, deleteIt, editIt, replay } = useGlobalContext()
  const [comment, setComment] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isReplaying, setIsReplaying] = useState(false)


  const text = useRef('')
  const handleSubmit = (e) => {
    e.preventDefault()

    editIt({ id, good: false, content: comment })
    setIsEditing(false)
  }

  const handleReplay = (e) => {
    e.preventDefault()
    let reg = new RegExp(`@${username}`)
    replay({
      value: comment.replace(reg, ''),
      id: Date.now(),
      createdAt: new Date().toLocaleTimeString(),
      user: {
        image: { png: currentUser.image.png, webp: currentUser.image.webp },
        username: currentUser.username,
      },
      score: 0,
      replyingTo: username,
      good: false,
    })
    setIsReplaying(false)
    setComment('')
  }
  useEffect(() => {
    if (isEditing) {
      text.current.style.height = 'auto'

      if (
        text.current.scrollHeight > text.current.getBoundingClientRect().height
      ) {
        text.current.style.height = 'auto'
        text.current.style.height = `${text.current.scrollHeight}px`
      }
    }
  }, [comment])
  const {
    image: { png, webp },
    username,
  } = user

  return (
    <>
      <article key={id}>
        <section className='fore'>
          <Teoggle id={id} score={score} good={false} ></Teoggle>
          <img src={png} alt='persoimage' />
          <h6>
            {username}{' '}
            {currentUser.username === username && (
              <span className='you'>you</span>
            )}
          </h6>
          <p>{createdAt}</p>
          {currentUser.username === username ? (
            <div className='itsme'>
              <button onClick={() => deleteIt({ id, good: false })}>
                <svg width='12' height='14' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z'
                    fill=''
                  />
                </svg>
                Delete
              </button>
              <button
                onClick={() => {
                  setIsEditing(true)
                  setComment(content)
                }}
              >
                <svg width='14' height='14' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z'
                    fill=''
                  />
                </svg>
                Edit
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setComment(`@${username} `)
                setIsReplaying(true)
              }}
              className='replay'
            >
              <svg width='14' height='13' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z'
                  fill=''
                />
              </svg>
              replay
            </button>
          )}
          {isEditing ? (
            <form
              className='editing'
              onSubmit={(e) => handleSubmit(e)}
              action=''
            >
              <textarea
                onChange={(e) => {
                  setComment(e.target.value)
                }}
                value={comment}
                ref={text}
                name=''
                id=''
              ></textarea>
              <button type='submit'>UPDATE</button>
            </form>
          ) : (
            <p className='content'> {content}</p>
          )}
        </section>
      </article>

      {isReplaying && (
        <article className='addIt resite'>
          {' '}
          <img src={currentUser.image.png} alt='' />
          <form onSubmit={(e) => handleReplay(e)} action=''>
            <textarea
              ref={text}
              placeholder='Replay...'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
              }}
              name=''
              id=''
            ></textarea>
            <button type='submit'>REPLAY</button>
          </form>
        </article>
      )}

      {replies.length > 0 &&
        replies.map((replay) => {
          const { id } = replay
          return <Replay key={id} {...replay}></Replay>
        })}
    </>
  )
}
