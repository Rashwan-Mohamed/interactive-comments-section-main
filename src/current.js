import { useGlobalContext } from './context'

import React, { useState, useRef, useEffect } from 'react'

export const Current = ({ image, username }) => {
  const [comment, setComment] = useState('')
  const { addComment } = useGlobalContext()
  const { png, webp } = image

  const text = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    addComment({
      value: comment,
      id: Date.now(),
      createdAt: new Date().toLocaleTimeString(),

      user: { image: { png, webp }, username },
      score: 0,
    })
    setComment('')
  }
  useEffect(() => {
    text.current.style.height = 'auto'

    if (
      text.current.scrollHeight > text.current.getBoundingClientRect().height
    ) {
      text.current.style.height = 'auto'
      text.current.style.height = `${text.current.scrollHeight}px`
    }
  }, [comment])

  return (
    <article className='addIt'>
      <img src={png} alt='' />
      <form onSubmit={(e) => handleSubmit(e)} action=''>
        <textarea
          ref={text}
          placeholder='Add a comment...'
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}
          name=''
          id=''
        ></textarea>
        <button type='submit'>SEND</button>
      </form>
    </article>
  )
}
