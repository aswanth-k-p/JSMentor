import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import Dashboard from './components/pages/Dashboard';
import TopicDetail from './components/topics/TopicDetail';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import TopicState from './context/topic/TopicState';
import ProgressState from './context/progress/ProgressState';
import NoteState from './context/note/NoteState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';
import './App.css';

// Load token into global headers
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <TopicState>
        <ProgressState>
          <NoteState>
            <AlertState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div className="container">
                    <Alerts />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                      <Route 
                        path="/dashboard" 
                        element={<PrivateRoute component={Dashboard} />} 
                      />
                      <Route 
                        path="/topics/:id" 
                        element={<PrivateRoute component={TopicDetail} />} 
                      />
                    </Routes>
                  </div>
                </Fragment>
              </Router>
            </AlertState>
          </NoteState>
        </ProgressState>
      </TopicState>
    </AuthState>
  );
};

export default App;