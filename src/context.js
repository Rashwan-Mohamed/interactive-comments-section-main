import React, { useState, useReducer, useEffect, useContext } from 'react'
import data from './data.json'
import reducer from './reducer'

const initialState = {
  currentUser: data.currentUser,
  comments: data.comments,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isOkay, setIsOkay] = useState(false)
  const [sure, setIsSure] = useState(false)
  const [selected, setSelected] = useState({})
  
  useEffect(() => {
    if (sure) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [sure])

  // if it has been upvoted then you need to decrase two
  //if it has been downvoted then upvote will increase two
  const toggle = ({ id, good, type }) => {
    dispatch({
      type: 'TOGGLE',
      payload: { id, good, type },
    })


  }
  const replay = ({
    value,
    id,
    createdAt,
    user,
    score,
    replyingTo,
    good,
    root,
  }) => {
    dispatch({
      type: 'REPLAY',
      payload: { value, id, createdAt, user, score, replyingTo, good, root },
      good,
    })
  }

  const addComment = ({ id, value, createdAt, user, score }) => {
    // console.log(value)
    dispatch({
      type: 'ADD_COMMENT',
      payload: { id, value, createdAt, user, score },
    })
  }

  const deleteIt = ({ id, good }) => {
    setIsSure(true)
    // confirm({ id, good })
    setSelected({ id: id, good: good })
    //   console.log(selected)
  }
  const confirm = ({ id, good }) => {
    setIsOkay(false)
    return dispatch({
      type: 'DELETE_COMMENT',
      payload: { id, good },
    })
  }
  const editIt = ({ id, good, content }) => {
    // console.log(id, good, content)
    dispatch({
      type: 'EDIT_COMMENT',
      payload: { id, good, content },
    })
  }
  useEffect(() => {
    if (isOkay) {
      console.log(selected)
      confirm({ id: selected.id, good: selected.good })
    }
  }, [isOkay])
  return (
    <AppContext.Provider
      value={{
        ...state,
        toggle,
        replay,
        addComment,
        deleteIt,
        editIt,
      }}
    >
      {sure && (
        <div className='overflow'>
          <div className='box'>
            <h5>Delete comment</h5>
            <p>
              Are you sure you want to delete this comment? this will remove the
              comment and can't be undone.
            </p>
            <button
              onClick={() => {
                setIsSure(false)
              }}
              className='cancel-btn'
            >
              NO, CANCEL
            </button>
            <button
              onClick={() => {
                setIsSure(false)
                setIsOkay(true)
              }}
              className='yes-btn'
            >
              YES, DELETE
            </button>
          </div>
          <div className='overflos '></div>
        </div>
      )}
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
