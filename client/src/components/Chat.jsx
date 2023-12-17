import { useMutation } from '@apollo/client';
import { POST_MESSAGE } from '../utils/ApolloConfig'
import Message from './Message';
import { useState } from 'react';

const Chat = () => {
  const [state, setState] = useState({ user: "Jack", content: "" });
  const [postMessage] = useMutation(POST_MESSAGE);

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(state.content.length > 0) {
      try {
        // Execute the mutation
        const { data } = await postMessage({
          variables: state,
        });

        // Handle the result if needed
        console.log("Mutation result:", data);
      } catch (error) {
        // Handle error
        console.error("Mutation error:", error);
      }
    }

    setState((prevState) => ({...prevState, content: ''}))
  }


  return (
    <div>
      <section id='chat'>
        <Message user={state.user} />
      </section>
      <section id='input-name'>
        <input value={state.user} name='username' onChange={(e) => setState(prevState => ({ ...prevState, user: e.target.value }))} />
      </section>
      <section id='input-chat'>
        <form onSubmit={handleSubmit}>
          <input value={state.content} name='content' onChange={(e) => setState(prevState => ({ ...prevState, content: e.target.value }))} />
          <button type='submit'>SEND</button>
        </form>
      </section>
    </div>
  )
}

export default Chat