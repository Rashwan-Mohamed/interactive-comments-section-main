// action.type

const reducer = (state, action) => {
  if (action.type === 'TOGGLE') {
    console.log('recieved!');
    if (action.payload.good) {
      let updated = state.comments.map((item) => {
        if (item.replies.length > 0) {
          item.replies.map((replay) => {
            if (replay.id === action.payload.id) {
              if (action.payload.type === 'upvote') replay.score += 1
              if (action.payload.type === 'downvote') replay.score -= 1
            }
          })
        }
        return item
      })
      return { ...state, comments: updated }
    } else {
      let updated = state.comments.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.type === 'upvote') item.score += 1
          if (action.payload.type === 'downvote') item.score -= 1
        }
        return item
      })

      return { ...state, comments: updated }
    }
  }
  if (action.type === 'ADD_COMMENT') {
    const {
      id,
      value,
      createdAt,
      score,
      user: {
        username,
        image: { png, webp },
      },
    } = action.payload

    let newComm = {
      id,
      content: value,
      createdAt,
      score,
      user: { image: { png, webp }, username },
      replies: [],
    }
    let updated = [...state.comments, newComm]

    return { ...state, comments: updated }
  }

  if (action.type === 'DELETE_COMMENT') {
    if (action.payload.good) {
      let updated = state.comments.filter((comment) => {
        if (comment.replies.length > 0) {
          comment.replies = comment.replies.filter((replay) => {
            if (replay.id !== action.payload.id) {
              return replay
            }
          })
          console.log(comment.replies)
        }
        return comment
      })
      return { ...state, comments: updated }
    } else {
      let updated = state.comments.filter((comment) => {
        if (comment.id !== action.payload.id) {
          return comment
        }
      })
      return { ...state, comments: updated }
    }
  }
  if (action.type === 'EDIT_COMMENT') {
    if (action.payload.good) {
      let updated = state.comments.map((item) => {
        if (item.replies.length > 0) {
          item.replies.map((replay) => {
            if (replay.id === action.payload.id) {
              replay.content = action.payload.content
            }
            return replay
          })
        }
        return item
      })
      return { ...state, comments: updated }
    } else {
      let updated = state.comments.map((item) => {
        if (item.id === action.payload.id) {
          item.content = action.payload.content
        }
        return item
      })

      return { ...state, comments: updated }
    }
  }
  if (action.type === 'REPLAY') {
    if (action.payload.good) {
      let updated = state.comments.map((comment) => {
        if (comment.user.username === action.payload.root) {
          const {
            id,
            value,
            createdAt,
            score,
            replyingTo,
            user: {
              username,
              image: { png, webp },
            },
          } = action.payload

          comment.replies.push({
            id,
            content:value,
            createdAt,
            score,
            replyingTo,
            user: {
              username,
              image: { png, webp },
            },
          })
        }

        return comment
      })
        return { ...state, comments: updated }
    } else {
            let updated = state.comments.map((comment) => {
              if (comment.user.username === action.payload.replyingTo) {
                const {
                  id,
                  value,
                  createdAt,
                  score,
                  replyingTo,
                  user: {
                    username,
                    image: { png, webp },
                  },
                } = action.payload

                comment.replies.push({
                  id,
                  content: value,
                  createdAt,
                  score,
                  replyingTo,
                  user: {
                    username,
                    image: { png, webp },
                  },
                })
              }

              return comment
            })
            return { ...state, comments: updated }
    }
  }
}

export default reducer
