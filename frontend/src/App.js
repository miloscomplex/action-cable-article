import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RoomsList from './components/rooms/RoomsList'
import Room from './components/rooms/Room'

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path='/' component={RoomsList} />
        <Route exact path='/:id' render={routerProps => <Room {...routerProps} />} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
