import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk'; // Handls Async actions like a promise
import { fetchData } from './actions';
import * as reducers from './reducers';
import jwtDecode from 'jwt-decode'; // Will this work?

reducers.routing = routerReducer;

import App from './components/App';
import FolderContents from './components/FolderContents';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';
import Folders from './components/Folders';
import Start from './components/Start';
import NewModal from './components/NewModal';
// Initial store is created by running through reducer list and returning default values
const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware)); // Reducers create State
console.log(store.getState()); //Inspect default state
const history = syncHistoryWithStore(browserHistory, store);

function run () {
  let state = store.getState();

  ReactDOM.render((<Provider store={store}>

    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='/folder/:folderId' component={FolderContents}>
          <Route path='/folder/:folderId/new' component={NewCardModal} />
          <Route path='/folder/:folderId/edit/:cardId' component={EditCardModal} />
          <Route path='/folder/:folderId/study' component={StudyModal} />
        </Route>
        <Route path='start' component={Start}></Route>
        <Route path='new' component={NewModal}></Route>
        <Route path='folders' component={Folders}></Route>
      </Route>
    </Router>
</Provider>), document.getElementById('root'));
}

function save() {
  var state = store.getState();
  console.log('updated state >q');
  console.log(state);
}

function init () {
  run(); //initialize routing function above
  // Listen for changes to the store then run events
  store.subscribe(run);
  // Save events to state and write to api/data
  store.subscribe(save);
  // requests /api/data from actions fetchData which fires RECEIVE_DATA action
  store.dispatch(fetchData());
}

init();
