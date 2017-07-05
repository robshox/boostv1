// export const showBack = (state, action) => {
//   switch(action.type) {
//     case 'SHOW_BACK':
//       return action.data || false;
//     default:
//       return state || false;
//   }
// };
// {cardFilter: data or ''}
// export const cardFilter = (state, action) => {
//   switch (action.type) {
//     case 'FILTER_CARDS':
//       return action.data;
//     default:
//       return state || '';
//   }
// };
//
// export const cards = (state, action) => {
//   switch (action.type) {
//     case 'RECEIVE_DATA':
//       return action.data.cards || state;
//     case 'ADD_CARD':
//       let newCard = Object.assign({}, action.data, {
//         score: 1,
//         id: +new Date
//       });
//
//       return state.concat([newCard]);
//     case 'UPDATE_CARD':
//       let cardUpdate = action.data;
//       return state.map(card => (card.id !== cardUpdate.id) ?
//         card :
//         Object.assign({}, card, cardUpdate)
//       );
//     case 'DELETE_CARD':
//       return state.filter(c => c.id !== action.data);
//     default:
//       return state || [];
//   }
//};

export const folders = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_DATA':
    console.log('receive data');
    console.log(action.data);
      //var stringData = JSON.stringify(action.data)
      //console.log(stringData);


      let setFolder = action.data/*{ name: action.data[0].name, id: +new Date };*/
      // May not need this could just use setFolder instead
      const allFolders = action.data.map(folder => {
        return { id: +new Date, name: folder.name, arse: folder.name }
      });

      return state.concat(allFolders); // got rid of that fucking array wrapper
      /*return(
        action.data.folders || state
      );*/
    case 'ADD_FOLDER':

      let newFolder = { name: action.data, id: +new Date };
      return state.concat([newFolder]);

    default:
      return state || [];
  }
};
export const processes = (state, action) => {
//console.log('action process name '+ action.processName);
//console.log('action dets '+ action.dets);
  switch (action.type) {
    case 'RECEIVE_DATA':
      return action.data.processes || state;
    case 'ADD_PROCESS':
      let newProcess = Object.assign({}, {
      processName: action.processName,
      score: 1,
      id: +new Date,
      folderId: action.dets
      });
      return state.concat([newProcess]);
      //
      // let newProcess = { name: action.data, id: +new Date };
      // return state.concat([newProcess]);
    default:
      return state || [];
  }
};



// {addingDeck: true }}
// export const addingDeck = (state, action) => {
//   switch (action.type) {
//     case 'SHOW_ADD_DECK': return true;
//     case 'HIDE_ADD_DECK': return false;
//     default: return !!state;
//   }
// };

export const addingFolder = (state, action) => {
        switch (action.type) {
            case 'ADD_MODAL_FOLDER': return true;
            default: return !!state;
        }
};

export const addingFromModal = (state, action) => {
      switch (action.type) {
        case 'ADD_MODAL_FOLD': return 'folderShow';
        case 'ADD_MODAL_PROCESS': return 'processShow';
        case 'SHOW_MODAL_DEFAULT': return 'defaultAdd';
        default: return state || 'defaultAdd';
      }
};



const jwtDecode = require('jwt-decode')

function checkTokenExpiry() {
  let jwt = localStorage.getItem('id_token')
  if(jwt) {
    let jwtExp = jwtDecode(jwt).exp;
    let expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if(new Date() < expiryDate) {
      return true;
    }
  }
  return false;
}

function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

function auth(state = {
    isAuthenticated: checkTokenExpiry(),
    profile: getProfile(),
    error: ''
  }, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        profile: action.profile,
        error: ''
      })
    case ActionTypes.LOGIN_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
        error: action.error
      })
    case ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null
      })
    default:
      return state
    }
}

function jedis(state = {
  isFetching: false,
  allJedis: [],
  error: ''
}, action) {
  switch (action.type) {
    case ActionTypes.JEDIS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.JEDIS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        allJedis: action.response,
        error: ''
      })
    case ActionTypes.JEDIS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        allJedis: [],
        error: action.error
      })
    default:
      return state
  }
}

function jedi(state = {
  isFetching: false,
  singleJedi: {},
  error: ''
}, action) {
  switch (action.type) {
    case ActionTypes.JEDI_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.JEDI_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        singleJedi: action.response,
        error: ''
      })
    case ActionTypes.JEDI_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        singleJedi: {},
        error: action.error
      })
    default:
      return state
  }
}
