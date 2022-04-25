import routes from "./routes/";
import Menu from "./components/menu";
import './App.css';
import {useEffect} from 'react';
import {connect} from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {fetchAgendaContent} from "./redux/actions";

function App({dispatchFetchAgendaContent}) {

  useEffect(() => {
     
    dispatchFetchAgendaContent()
   
  },[]);

  return (
    <Router>
      <Menu />
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
         ))}
      </Switch>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchAgendaContent: () => {
    dispatch(fetchAgendaContent());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(App)
