import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import mascot from './images/mascot.png';

import Home from './components/Homepage.js';
import Webbshop from './components/Webbshop.js';
import Depot from './components/Depot.js';
import Forms from './components/Forms.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';

import './styles/App.css';

class App extends Component {
  render() {
      let loginLink;
      let dynamicLink;
      const loggedIn = sessionStorage.getItem('jwtToken') != null;

      if (!loggedIn) {
          // Show login and register links if user is not logged in
          loginLink = <li key="login"><Link to="/login/">LOGGA IN</Link></li>;
          dynamicLink = <li key="form"><Link to="/forms/">REGISTRERING</Link></li>;
      } else {
           // Show logout and depot links if user is logged in
          loginLink = <li key="logout"><Link to="/logout/">LOGGA UT</Link></li>;
          dynamicLink = <li key="depot"><Link to="/depot/">DEPÅ</Link></li>;
      }

    return (
      <Router>
        <div className="App">
          <img className="mascot" src={mascot} alt="Mascot" />
          <p className="navHead">Hummingbird Creations</p>
          <nav>
            <ul>
              <li key="home"><Link to="/">HEM</Link></li>
              <li key="webbshop"><Link to="/webbshop">WEBBSHOP</Link></li>
              {dynamicLink}
              {loginLink}
            </ul>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/webbshop/" component={Webbshop} />
          <Route path="/depot/" component={Depot} />
          <Route path="/forms/" component={Forms} />
          <Route path="/login/" component={Login} />
          <Route path="/logout/" component={Logout} />
          <div className="footer">
            <p>Copyright &copy; 2019 <br /> Hummingbird Creations</p>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
