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

import { AuthProvider, useAuth } from "./Auth";


const queryCache = new QueryCache()

let Home = () => {
  return <h3>Home</h3>
}

let Menu = () => {

  let { user, signout } = useAuth()
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

let Signin = () => {
  let { signin } = useAuth()

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();
    signin(username, password)
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
  </>;
}

let Signup = ({ onSubmit }) => {
  let { signup } = useAuth()
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password);
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
  </>;
};

let Main = () => {
  
  return (
      <div className="App">
        <AuthProvider>
          <Menu/>
          <Switch>
            <Route path="/tp1">
              <Tp1/>
            </Route>
            <Route path="/tp2">
              <Tp2/>
            </Route>
            <Route path="/signin">
              <Signin/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </AuthProvider>
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
