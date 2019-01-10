import React from 'react';
import ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

const axios = require('axios')
//сохранение данных в redux
const store = createStore(result);
//данные полученные из Json файла
let result

//Получение данных из Json файла запросом с сервера
axios({
  method: 'get',
  url: 'http://dev.frevend.com/json/users.json'
}).then((response) => {
  ({ data: result } = response)
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

}})
//Возможность получения данных из reducer
function mapStateToProps(state){
  return {
    result: state.result
  };
//Пагинация
  ReactDOM.render(
    <TodoApp />,
    document.getElementById('app')
  );
