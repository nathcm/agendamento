import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Offices from './pages/Offices/Offices';
import SelectDate from './pages/SelectDate/SelectDate';
import Desk from './pages/Desk/Desk';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/offices" component={Offices}/>
        <Route path="/date" component={SelectDate}/>
        <Route path="/desk" component={Desk}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;