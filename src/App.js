import { useContext, useEffect } from "react";
import Auth from "./components/Auth/Auth";
import Navigation from "./components/Header/Navigation";
import Context from "./components/store/Context";
import { Redirect, Route, Switch } from "react-router-dom";
import Sent from "./components/Mail/Sent";
import Compose from "./components/Mail/Compose";
import Inbox from "./components/Mail/Inbox";

function App() {
  const ctx = useContext(Context);
  useEffect(() => {
    ctx.onLoad()
  }, [])
  return (
    <div>
      {ctx.isLoggedIn && <Navigation />}
      <main>
        <Switch>

          <Route path='/' exact component={Auth} />
          <Route path='/login'>{!ctx.isLoggedIn ? (<Auth />) : (<Redirect to='/compose' />)}</Route>
          <Route path='/logout'>(<Redirect to='/login' />)</Route>
          <Route path='/compose'><Compose /></Route>
          <Route path='/inbox'><Inbox /></Route>
          <Route path='/sent'><Sent /></Route>
          {/* <Route path='*'>
            <Redirect to='/login' />
          </Route> */}
          
        </Switch>
      </main>
      
    </div>
  );
}

export default App;
