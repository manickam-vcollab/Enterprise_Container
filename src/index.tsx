import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './globalStyles';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import store from './store';
import { Provider, ReactReduxContext } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router/immutable';
import { Route, Switch } from 'react-router-dom';
import { history } from './store';
import CustomThemeProvider from './components/shared/customThemeProvider';
import { Routes } from './routes';
import Login  from './pages/login';
import HOME from './pages/home';
import Dashboard  from './pages/viewer';
import { CookiesProvider } from 'react-cookie';
import Suggest from 'components/sideBarContents/about/pages/suggest';
import Whatsnew from 'components/sideBarContents/about/pages/whatsnew';
import Terms from 'components/sideBarContents/about/pages/terms';
import Privacy from 'components/sideBarContents/about/pages/privacy';
import Feedback from 'components/sideBarContents/about/pages/feedback';

ReactDOM.render(
  <React.StrictMode>  
    <Provider store={store}>
      <ConnectedRouter history={history} context={ReactReduxContext} noInitialPop>
        <CustomThemeProvider>
          <CookiesProvider>
            <Switch>
            <Route path={Routes.LOGIN}>
              <div>
                  <Login />
              </div>
            </Route>
            <Route path={Routes.HOME}>
              <div> <HOME /> </div>
            </Route>
            <Route path={Routes.SUGGEST}>
              <div> <Suggest /> </div>
            </Route>
            <Route path={Routes.WHATSNEW}>
              <div> <Whatsnew /> </div>
            </Route>
            <Route path={Routes.TERMS}>
              <div> <Terms /> </div>
            </Route>
            <Route path={Routes.PRIVACY}>
              <div> <Privacy /> </div>
            </Route>
            <Route path={Routes.FEEDBACK}>
              <div> <Feedback /> </div>
            </Route>
            <Route path={Routes.VIEWER}>              
                <Dashboard>
                  <App />
                </Dashboard>            
            </Route>
            <Route>
              <div>Page not found</div>
            </Route>
            </Switch>
          </CookiesProvider>      
        </CustomThemeProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
