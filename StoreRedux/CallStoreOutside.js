/**
  Call redux action in axios interceptor
  https://stackoverflow.com/questions/65899023/call-redux-action-in-axios-interceptor
*/
//import the combined.general store in the file you need to call redux store function
//then dispatch the needed function using the STORE
store.dispatch(setUser())
