import React, { useState } from 'react';
import { Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { useQuery, useQueryCache, useMutation } from 'react-query';

import eventsAPI from './events_api';
import format from 'date-fns/format';

let Events = () => {
    return (
        <>
            <h3>Events</h3>
        </>
    );
};

let AddEventForm = () => {
    return (
        <form>
            <button>Add</button>
        </form>
    );
};

let EventDetail = () => {
    return (
        <>
            <h4>Event detail</h4>
        </>
    );
};

export default Events;
