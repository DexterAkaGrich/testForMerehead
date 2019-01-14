import axios from 'axios';
import React from 'react';
import ReactDOM from "react-dom";
// import {createStore} from 'redux';
import {buttonStyle, liStyle} from './styleReactCSS';

function init (result) {
    if(result.users){
    const names = result.users.map((item, index) => `${index + 1}) ${item.name} ${item.surname}`)
    console.log(names);

    //Redux
      class Store {
        constructor(result){
          this._state = result.users.map((item, index) => `${index + 1}) ${item.name} ${item.surname}. desc:  ${item.desc}`);
          this._callbacks = [];
        }

        get state(){
          return this._state;
        }

        update(){
          this._state = result.users.map((item, index) => `${index + 1}) ${item.name} ${item.surname}. desc:  ${item.desc}`);
        }

        subscribe(callback){
          this._callbacks.push(callback);
          return () => this._callbacks = this._callbacks.filter(cb => cb !== callback);
        }
      }

      const store = new Store(result);
      const unsubscribe = store.subscribe(() => console.log(store.state));
      store.subscribe(() => console.log(store.state));

    //Пагинатор
    class TodoApp extends React.Component {
      constructor() {
        super();
        this.state = {
          todos: names,
          currentPage: 1,
          todosPerPage: 5
        };
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

      render() {
        const { todos, currentPage, todosPerPage } = this.state;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
          return <li style={liStyle} key={index}>{todo}</li>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <button
              style = {buttonStyle}
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </button>
          );
        });

        return (
          <div>
            <ul>
              {renderTodos}
            </ul>
            <ul id="page-numbers">
              {renderPageNumbers}
            </ul>
          </div>
        );
      }
    }
    //Возможность получения данных из reducer
    // function mapStateToProps(state){
    //   return {
    //     result: state.result
    //   }
    // }
    //Пагинация
    ReactDOM.render(
      <TodoApp />,
      document.getElementById('root')
    );
  }
}

//Получение данных из Json файла запросом с сервера
let result

axios({
  method: 'get',
  url: 'http://dev.frevend.com/json/users.json'
})
  .then(response => {
    ({ data: result } = response)
  })
  .catch(err => {
    result = require('./users.fallback.json')
  })
  .finally(() => {
    init(result)
  })


  // export default function configureStore(initialState) {
  //     const store = createStore(rootReducer, initialState)
  //       return store
  //     }
