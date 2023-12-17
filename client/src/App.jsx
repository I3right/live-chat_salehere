import { ApolloProvider } from '@apollo/client'
import Chat from './components/Chat'
import { client } from './utils/ApolloConfig'

function App() {
  return (
    <ApolloProvider client={client}>
      <div id='app'>
        <Chat />
      </div>
    </ApolloProvider>
  )
}

export default App
