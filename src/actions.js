


//export const addFolder = name => ({ type: 'ADD_FOLDER', data: name });

// Used for spinner or saving ..
export function creatingFolder() {
  return { type: 'CREATING_FOLDER' };
}
// Final action used to add folder to State
// export function folderCreated(name) {
//   //console.log('turtle1' + name);
// return { type: 'ADD_FOLDER', data: name };
//
// }


// Account failed to create don't update State
export function folderCreatingFailed(error) {
  return { type: 'FOLDER_CREATING_FAILED', payload: error };
}

export const addFolder2 = name => {
console.log("adflasdfasdfsdf" + name);
//   function folderStateCreate() {
//     var name1 = name;
//     //return dispatch(folderCreated(name));
//     console.log('fuck it'+ name1);
//     //return dispatch(folderCreated(name1));
//     export const createFuckingFolder = name => ({ type: 'ADD_FOLDER', data: name });
//
//   };
//
//   return dispatch => {
//     dispatch(creatingFolder());
//     //console.log('ares1'+ name);
//
//     fetch('/api/folder', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         name: name
//       }),
//       //success: function() {console.log('tits')}
//
//     })
//     .then(dispatch(folderStateCreate()))
//     //.then(res => console.log(res))
//     //.then(res => res.json())
// //continue from here you were figuring out how to get message back from server
//     //.then(json => dispatch(folderCreated(json)))
//     //.then(json => console.log(json))
//     // .then(nameJson => {
//     //   respl = JSON.parse(nameJson);
//     //   console.log('addFold dispatch' + respl);
//
//       //dispatch(folderCreated('rrit'));
//     // })
//     .catch(err => {
//       dispatch(folderCreatingFailed(err));
//       console.log('folder Create Fail');
//     });
//
//     // fetch('api/folder',
//     // {
//     // method: "POST",
//     // body: { name: "turnip" }
//     // })
//       //.then(res => console.log(res))
//     //  .then(res => res.json())
//       //.then(json => console.log(json))
//       //.then(json => dispatch(receiveData(json)))
//   };
};


export const addFolder3 = name => ({ type: 'ADD_FOLDER', data: name });
export const showAddDeck = () => ({ type: 'SHOW_ADD_DECK' });
export const hideAddDeck = () => ({ type: 'HIDE_ADD_DECK' });
export const addModalFolder = () => ({type: 'ADD_MODAL_FOLDER'});
export const addModalProc = () => ({type: 'ADD_MODAL_PROCESS'});

export const modalShowFold = () => ({type: 'ADD_MODAL_FOLD'});
export const modalShowProc = () => ({type: 'ADD_MODAL_PROCESS'});
export const modalShowDef = () => ({type: 'SHOW_MODAL_DEFAULT'});

export const addCard    = card   => ({ type: 'ADD_CARD',    data: card   });

export const updateCard = card   => ({ type: 'UPDATE_CARD', data: card   });
export const deleteCard = cardId => ({ type: 'DELETE_CARD', data: cardId });

export const filterCards = query => ({ type: 'FILTER_CARDS', data: query });
export const setShowBack = back  => ({ type: 'SHOW_BACK', data: back });

export const receiveData = data => ({ type: 'RECEIVE_DATA', data: data });
// fetchData is called at launch to pull in state from express server
// pull folders and processes from mongo
export const fetchData = () => {
  return dispatch => {
    console.log('testit');
    fetch('/api/getfolders')

      .then(res => res.json())
      //.then(json => console.log(json))
      .then(json => dispatch(receiveData(json)))
  };
};

export const receiveProcessData = data => ({ type: 'RECEIVE_PROCESS_DATA', data: data });

export const fetchProcessAPI = (folderId) => {
  return dispatch => {
   console.log('fethProcessAPI')
    fetch('/api/process/' + folderId)
      .then(res => res.json()) // Never forget this needs to be () or you will get back null
      .then(json => dispatch(receiveProcessData(json)));
  };
};


export const clearProcess = () => ({ type: 'CLEAR_PROCESS'});


export const folderData = data => ({ type: 'ADD_FOLDER', data: data }); // json/data from addFolder
// Add a new folder to MongoDB via API and call folderData which adds folder to State

export const addProcessOld = (name, folderDets)  => ({ type: 'ADD_PROCESS', processName: name, dets: folderDets});

export const processToState = data => ({ type: 'ADD_PROCESS', data: data});

export const addProcess = (name, folderDets) => {
  return dispatch => {
    console.log( name + folderDets )
    fetch('/api/process', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        folder_name: folderDets
      })
    })
    .then(res => res.json())
    .then(json => console.log(json))
  };
};

export const addFolder = (name) => {
  return dispatch => {
    console.log('addfolder POST');
    fetch('/api/folder', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name
          })
        })
        .then(res => res.json()) // Fun with this returning Promise instead of object
        //.then(json => console.log(json))
        .then(json => dispatch(folderData(json)))
  };
};

//Maybe add a spinner here and error control
// All the new stuff for Auth is here.


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

function loginSuccess(profile) {
  return {
    type: LOGIN_SUCCESS,
    profile
  }
}

function loginError(err) {
  return {
    type: LOGIN_ERROR,
    err
  }
}

export function login() {
  const lock = new Auth0Lock('AUTH0_CLIENT_ID', 'AUTH0_DOMAIN')
  return dispatch => {
    lock.show((err, profile, token) => {
      if(err) {
        return dispatch(loginError(err))
      }
      localStorage.setItem('profile', JSON.stringify(profile))
      localStorage.setItem('id_token', token)
      return dispatch(loginSuccess(profile))
    })
  }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

function logoutSuccess(profile) {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    return dispatch(logoutSuccess());
  }
}

export const JEDIS_REQUEST = 'JEDIS_REQUEST'
export const JEDIS_SUCCESS = 'JEDIS_SUCCESS'
export const JEDIS_FAILURE = 'JEDIS_FAILURE'

function fetchJedis() {
  return {
    [CALL_API]: {
      types: [ JEDIS_REQUEST, JEDIS_SUCCESS, JEDIS_FAILURE ],
      endpoint: 'jedis',
      authenticatedRequest: false
    }
  }
}

export function loadJedis() {
  return dispatch => {
    return dispatch(fetchJedis())
  }
}

export const JEDI_REQUEST = 'JEDI_REQUEST'
export const JEDI_SUCCESS = 'JEDI_SUCCESS'
export const JEDI_FAILURE = 'JEDI_FAILURE'

function fetchJedi(id) {
  return {
    [CALL_API]: {
      types: [ JEDI_REQUEST, JEDI_SUCCESS, JEDI_FAILURE ],
      endpoint: `jedis/${id}`,
      authenticatedRequest: true
    }
  }
}

export function loadJedi(id) {
  return dispatch => {
    return dispatch(fetchJedi(id))
  }
}
