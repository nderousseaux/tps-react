import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query-devtools';

import Menu from './Menu';
import {Users, UserDetail} from './Users';
import {Authors, AuthorDetail} from './Authors';
import {Books, BookDetail} from './Books';

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
                <Route exact path="/users">
                    <Users />
                </Route>
                <Route path="/users/:id">
                    <UserDetail/>
                </Route>
                <Route exact path="/authors">
                    <Authors />
                </Route>
                <Route path="/authors/:id">
                    <AuthorDetail/>
                </Route>
                <Route exact path="/books">
                    <Books />
                </Route>
                <Route path="/books/:id">
                    <BookDetail/>
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
