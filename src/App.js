import { useContext } from "react";
import Auth from "./components/Auth/Auth";
import Navigation from "./components/Header/Navigation";
import Context from "./components/store/Context";
import { Redirect, Route, Switch } from "react-router-dom";
import Compose from "./components/Mail/Compose";

function App() {
  const ctx = useContext(Context);
  return (
    <div>
      {ctx.isLoggedIn && <Navigation />}
      <main>
        <Switch>

          <Route path='/login'>{!ctx.isLoggedIn ? (<Auth />) : (<Redirect to='/compose' />)}</Route>
          <Route path='/logout'>(<Redirect to='/login' />)</Route>
          <Route path='/compose'><Compose /></Route>

        </Switch>
      </main>
      
    </div>
  );
}

export default App;
