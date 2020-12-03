import { useState } from "react";

const Signup = ({createUser}) => {

  let [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

    const handleChange = event => {
      let newCredentials = {...credentials}
      newCredentials[event.target.name] = event.target.value;

      setCredentials(newCredentials);
    }

  const handleSubmit = event => {
    event.preventDefault();
    createUser(credentials);
    setCredentials({ // Clear input
        username: '',
        password: ''
        });
    }

  return <>
    <h2> Signup </h2>
    <form onSubmit={handleSubmit}>    
      <input type='text' value={credentials.username} name='username' placeholder='username' onChange={handleChange} />
      <input type='password' value={credentials.password} name='password' placeholder='password' onChange={handleChange} />
      <input type='submit' value='Signup' />
    </form>
  </>
  }
export default Signup;
