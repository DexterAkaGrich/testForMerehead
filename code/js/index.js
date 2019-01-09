// import React from 'react';
// import ReactDOM from "react-dom";
// import {createStore} from 'redux';

const axios = require('axios')
// const store = createStore();

let result

axios({
  method: 'get',
  url: 'http://dev.frevend.com/json/users.json'
}).then((response) => {
  ({ data: result } = response)
  if(result.users){
    const names = result.users.map((item, index) => `${index + 1}) ${item.name} ${item.surname}`)
    console.log(names);

    // new Vue({
    //   el: '#app',
    //   data: {
    //     data: names,
    //     perPage: 5,
    //     pagination: {}
    //   },
    //   computed: {
    //     collection() {
    //       return this.paginate(this.data);
    //     }
    //   },
    //   methods: {
    //     setPage(p){
    //       this.pagination = this.paginator(this.data.length, p);
    //     },
    //     paginate(data){
    //       return _.slice(data, this.pagination.startIndex, this.pagination.endIndex + 1)
    //     },
    //     paginator(totalItems, currentPage){
    //       var startIndex = (currentPage - 1) * this.perPage,
    //       endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1);
    //
    //       return {
    //         currentPage: currentPage,
    //         startIndex: startIndex,
    //         endIndex: endIndex,
    //         pages: _.range(1, Math.ceil(totalItems / this.perPage) + 1)
    //       };
    //     }
    //   },
    //   created(){
    //     this.setPage(1);
    //   }
    // })
  }
})

// ReactDOM.render(
//   <h2>Text</h2>,
//   document.getElementById('fieldToShow')
// );
