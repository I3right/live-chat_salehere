/* eslint-disable react/prop-types */
import { useQuery, } from '@apollo/client';
import { GET_MESSAGES } from '../utils/ApolloConfig';

const Message = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES,{
    pollInterval: 500
  });

  if (!data) return null

  const UserProfile = ({name}) => {
    return (<div
    style={{
      height: 50,
      width: 50,
      marginRight: "0.5rem",
      border: "2px solid black",
      borderRadius: "50%",
      fontSize: "18px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {name.slice(0,2).toUpperCase()}
    </div>)
  }

  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div
          key={id}
          style={{
            display: 'flex',
            justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
            paddingBottom: "1em"
          }}>
          {user !== messageUser && (
            <UserProfile name={messageUser} />
          )}
          <div
            style={{
              background: user === messageUser ? "#58bf56" : "#e5e6ea",
              color: user === messageUser ? "white" : "black",
              padding: "1em",
              borderRadius: "1em",
              maxWidth: "60%"
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  )
};

export default Message;