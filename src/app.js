const React = require('react');
const { BrowserRouter: Router, Route, Switch, Link } = require('react-router-dom');
const Home = require('./home');
// Import other components and routes

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={home} />
        </Switch>
      </div>
    </Router>
  );
};

module.exports = App;
