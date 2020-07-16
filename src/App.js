import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  // listen to state changes from google
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          //**Creating the action object where we would usually setState
          setCurrentUser({
            id: snapShot.id,
            //... refers to createdAt, displayName, email in particular
            ...snapShot.data()
          });
        });

      }
      //on the course it says no else statement and setCurrentUser(userAuth)
      setCurrentUser(userAuth);

    });
  }

  //close subscription to prevent memory leak
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route
            exact
            path='/signin'
            render={() => this.props.currentUser ?
              (<Redirect to='/' />) :
              (<SignInAndSignUp />)}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

//dispatching action objects to the reducers
const mapDispatchToProps = (dispatch) => ({
  //setCurrentUser(user) returns the action object
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

// first argument is null because App does not any state from reducers
export default connect(mapStateToProps, mapDispatchToProps)(App);

