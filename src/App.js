import './App.css';
import Auth from './containers/auth/auth';
import {Route, BrowserRouter as Router, Switch, NavLink} from 'react-router-dom';
import Me from './containers/me/me';
import BookRoom from './containers/book-room/book-room';
import UpdatePrice from './containers/updatePrice/updatePrice';
import AddRoom from './containers/add-room/addRoom';
import Rooms from './containers/rooms/rooms';
import User from './containers/me/user';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/auth' exact  component={Auth}/>
          <Route path='/me' exact component={Me}/>
          <Route path='/book-room' exact component={BookRoom}/>
          <Route path='/update-price' exact component={UpdatePrice}/>
          <Route path='/add-room' exact component={AddRoom}/>
          <Route path='/rooms' exact component={Rooms}/>
          <Route path='/user/:id' exact component={User}/>
        </Switch>
      </div>
    </Router>
  );
}

//TODO : ADD Booking feature
export default App;