import React, { useState } from 'react';
import { Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { useQuery, useQueryCache, useMutation } from 'react-query';

import booksAPI from './books_api';

let Books = () => {
    return (
        <>
            <h3>Books</h3>
        </>
    );
};

let AddBookForm = () => {
    return (
        <form>
            <button>Add</button>
        </form>
    );
};

let BookDetail = () => {
    return (
        <>
            <h4>Book detail</h4>
        </>
    );
};

export default Books;
