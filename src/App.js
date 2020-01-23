import React from 'react';
import List from './Pages/List';
import Player from './Pages/Player';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/players/:id" component={Player} />
      </Switch>
    </Router>
  );
}

export default App;
