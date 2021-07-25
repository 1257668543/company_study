import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Article from './pages/Article';

class App extends React.Component {
  render() {
    return (
      <div>
          <Switch>
            <Route path="/article/:id" component={Article} />
          </Switch>
      </div>
    );
  }
}

export default App;