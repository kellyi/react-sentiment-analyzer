import React from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './components/Header';
import InputForm from './components/InputForm';

import history from './utils/settings';

export default function App() {
    return (
        <Router history={history}>
            <Route component={Header} />
            <Route component={InputForm} />
        </Router>
    );
}
