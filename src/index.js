import axios from 'axios';
import React from 'react';
import ReactDOM from "react-dom";

function init (result) {
    if(result.users){
    const names = result.users.map((item, index) => `${index + 1}) ${item.name} ${item.surname}`)
    console.log(names);

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
          return <li key={index}>{todo}</li>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
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
