import React from 'react';
import List from './Pages/List';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
