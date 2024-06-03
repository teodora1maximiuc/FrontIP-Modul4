import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './EfficientRoute.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Shopping from './Shopping';
import EfficientRoute from './EfficientRoute.js';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<EfficientRoute />} />
                    <Route path='ShoppingList' element={<Shopping />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
