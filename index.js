// import React from 'react';
// import ReactDOM from "react-dom";
// import {createStore} from 'redux';
// import allReducers from './reducers';

const axios = require('axios')
// const store = createStore(allReducers);

let result

axios({
  method: 'get',
  url: 'http://dev.frevend.com/json/users.json'
}).then((response) => {
  ({ data: result } = response)
  console.log(result)
})
