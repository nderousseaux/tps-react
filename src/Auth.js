import { useEffect, useState, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";

let AuthContext = createContext();

export let AuthProvider = ({ children }) => {
  
    let [user, setUser] = useState(null);
    let [userCheck, setUserCheck] = useState(false);
    let [error, setError] = useState(null);
    let history = useHistory();
    const url_prefix = "http://localhost:4200";
    const headersApi = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    let signout = () => {
        setUser(null);
        window.localStorage.removeItem('token');
        history.push('/');
    }

    let signin = (username, password) => {
        return fetch(`${url_prefix}/signin`, {
            method: 'POST',
            headers : headersApi,
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
            headers: headersApi,
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
        })
        .then(checkStatus)
        .then(history.push("/signin"))
        .catch((err) => {
            if (err.message) {
                setError(err.message);
            } else {
                setError("Error");
            }
        });
    };

    let checkStatus = (response) => {
        if (response.ok) {
            return response;
        } else {
            return response.text().then((message) => {
                throw new Error(message);
            });
        }
    };

    useEffect(() => {
        fetch(`${url_prefix}/whoami`, {
          headers: headersApi
        })
        .then(checkStatus)
        .then(res => res.json())
        .then(user => {
          setUser(user);
          setUserCheck(true);
        })
        .catch(() => {
          setUser(null);
          setUserCheck(false);
        });
    }, []);

  return userCheck ? (
    "Checking authentication..."
  ) : (
    <AuthContext.Provider value={{user, signin, signup, signout, error, history}}>
      {error ? <p>{error}</p> : null}
      {children}
    </AuthContext.Provider>
  );
};

export let useAuth = () => useContext(AuthContext);
