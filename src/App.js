import { useEffect, useState } from 'react';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import {QueryCache, ReactQueryCacheProvider} from 'react-query';

import Tp1 from './tp1/Tp1'
import Tp2 from './tp2/Tp2'

let url_prefix = 'http://localhost:4200'

const queryCache = new QueryCache()

let checkStatus = res => {
  if (res.ok) {
    return res;
  } else {
    return res.text()
      .then(msg => { throw new Error(msg);})
  }
};

let Home = () => {
  return <h3>Home</h3>
}

let Menu = ({user, signout }) => {
  return <nav>
    <ul>
      <li>
        <Link to="/tp1">TP1</Link>
      </li>
      <li>
        <Link to="/tp2">TP2</Link>
      </li>
      {!user ? <li>
        <Link to="/signin">Signin</Link>
      </li> : null}
      {!user ? <li>
        <Link to="/signup">Signup</Link>
      </li> : null}
      {user ? <li>
        Connected as {user.username} <button onClick={signout}>Signout</button>
      </li> : null}
    </ul>
  </nav>
}

let Signin = ({ onSubmit }) => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password)
    .catch(err => {
      setUsername('');
      setPassword('');
      setMessage(err.message);
    });
  };

  return <>
    <h2>Signin form</h2>
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <label>Password</label>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <input type="submit" />
    </form>
    { message ? <p>{message}</p>: null }
  </>;
}

let Signup = ({ onSubmit }) => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password)
    .catch(err => {
      setUsername('');
      setPassword('');
      setMessage(err.message);
    });
  };

  return <>
    <h2>Signup form</h2>
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <label>Password</label>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <input type="submit" />
    </form>
    { message ? <p>{message}</p>: null }
  </>;
};

let Main = () => {
  let [user, setUser] = useState(null);
  let [userCheck, setUserCheck] = useState(false);

  let history = useHistory();

  let signin = (username, password) => {
    return fetch(`${url_prefix}/signin`, {
      method: 'POST',
      headers : {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(checkStatus)
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        window.localStorage.setItem('token', data.token);
        history.push("/");
      });
  };

  let signup = (username, password) => {
    return fetch(`${url_prefix}/signup`, {
      method: 'POST',
      headers : {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(checkStatus)
      .then(() => {
        history.push("/signin");
      });
  };

  let signout = () => {
    setUser(null);
    window.localStorage.removeItem('token');
    history.push('/');
  }

  useEffect(() => {
    let token = window.localStorage.getItem('token');
    fetch(`${url_prefix}/whoami`, {
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then(checkStatus)
    .then(res => res.json())
    .then(user => {
      setUser(user);
      setUserCheck(true);
    })
    .catch(() => {
      setUser(null);
      setUserCheck(true);
    });
  }, []);
  
  return (
    !userCheck ? 'Checking authentification...' :
      <div className="App">
        <Menu user={user} signout={signout} />
        <Switch>
          <Route path="/tp1">
            <Tp1/>
          </Route>
          <Route path="/tp2">
            <Tp2/>
          </Route>
          <Route path="/signin">
            <Signin onSubmit={signin}/>
          </Route>
          <Route path="/signup">
            <Signup onSubmit={signup}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
  )
}

let App = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <Main />
      </Router>
    </ReactQueryCacheProvider>
  )
}



//   let [user, setUser] = useState(null);

//   const history = useHistory(); //FIXME: HISTORY is undefined ?

//   let connect = (id,mdp) => {
//     fetch("http://localhost:4200/signin",  {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         username:id,
//         password: mdp
//       })
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       setUser(data.user)
//       history.push("/") //TODO: Stocker token
//     })
    
//     .catch((err) => console.log(err))
//   }

//   let createUser = (id, mdp) => {
//     fetch("http://localhost:4200/signup", {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         username:id,
//         password: mdp
//       })
//     })
//     .then(() => history.push('/signin'))
//     .catch((err) => console.log(err))
//   }

//   return (
//     <ReactQueryCacheProvider queryCache={queryCache}>
//       <Router>
//         <div className="App">
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/tp1">TP n°1</Link>
//               </li>
//               <li>
//                 <Link to="/tp2">TP n°2</Link>
//               </li>
//             </ul>
//             <h1>TP n° 3</h1>
//             <ul>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               { user != null ? <>
//                 <li>
//                   <Link to="/signout">Signout</Link>
//                 </li>
//                 <p>User : { user.username }</p> 
//                 </> :
//                 <>
//                   <li>
//                     <Link to="/signin">Signin</Link>
//                   </li>
//                   <li>
//                     <Link to="/signup">Signup</Link>
//                   </li>
//                 </>
//               }
//             </ul>
//           </nav>
//           <Switch>
//             <Route path="/tp1">
//               <Tp1/>
//             </Route>
//             <Route path="/tp2">
//               <Tp2/>
//             </Route>
//             <Route path="/signin">
//               <Signin connect={connect}/>
//             </Route>
//             <Route path="/signup">
//               <Signup createUser={createUser}/>
//             </Route>
//             <Route path="/">
//               <Home />
//             </Route>
//           </Switch>
//         </div>
//       </Router>
//     </ReactQueryCacheProvider>
//   );
// }

export default App;
