import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from './components/auth/Register.component';
import Login from './components/auth/Login.component';
import Navbar from './components/layout/Navbar.component';
import Landing from './components/layout/Landing.component';
import Alert from './components/layout/Alert.component';
import NotFound from './components/layout/NotFound.component';
import Dashboard from './components/dashboard/Dashboard.component';
import CreateProfile from './components/profile-forms/CreateProfile.component';
import EditProfile from './components/profile-forms/EditProfile.component';
import AddExperience from './components/profile-forms/AddExperience.component';
import AddEducation from './components/profile-forms/AddEducation.component';
import Profiles from './components/profiles/Profiles.component';
import Profile from './components/profile/Profile.component';
import Posts from './components/posts/Posts.component';
import Post from './components/post/Post.component';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth.action';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <section className='container'>
              <Alert />
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profile/:id' component={Profile} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                <PrivateRoute exact path='/add-experience' component={AddExperience} />
                <PrivateRoute exact path='/add-education' component={AddEducation} />
                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/posts/:id' component={Post} />
                <Route component={NotFound} />
              </Switch>
            </section>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
