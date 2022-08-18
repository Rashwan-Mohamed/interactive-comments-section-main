import './App.css'
import { Comment } from './comment'
import { Current } from './current'

import { useGlobalContext } from './context'
function App() {
  const { currentUser,comments } = useGlobalContext()
  return (
    <main>
      {comments.map((comment) => {
        const { id } = comment
        return <Comment key={id} {...comment}></Comment>
      })}

      <Current {...currentUser} />
    </main>
  )
}

export default App
