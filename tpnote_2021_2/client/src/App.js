import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query-devtools';

import Menu from './Menu';
import Players from './Players';
import Games from './Games';
import Events from './Events';

const queryCache = new QueryCache({
    defaultConfig: {
        queries: {
            staleTime: 0, // 5000,
            refetchOnWindowFocus: false
        }
    }
});

const Home = () => <h3>You're home</h3>;

const Main = () => {
    return (
        <>
            <Menu />
            <hr />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Redirect to="/" />
            </Switch>
        </>
    );
};

const App = () =>
    <HashRouter>
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Main />
        </ReactQueryCacheProvider>
    </HashRouter>;

export default App;
