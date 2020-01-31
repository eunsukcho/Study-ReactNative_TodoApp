import React from 'react';
import {View} from 'react-native';
import Todo from './Todo';

const TodoList = ({key, todos, _deleteTodo, _toggleComplete, type}) => {
  const getVisibleTodos = (todos, type) => {
    switch (type) {
      case 'All':
        return todos;
      case 'Complete':
        return todos.filter(t => t.complete);
      case 'Active':
        return todos.filter(t => !t.complete);
    }
  };
  todos = getVisibleTodos(todos, type);

  todos = (
    <View>
      {Object.values(todos)
        .reverse()
        .map(todo => (
          <Todo
            key={todo.todoIndex}
            todo={todo}
            _deleteTodo={_deleteTodo}
            _toggleComplete={_toggleComplete}
          />
        ))}
    </View>
  );
  return todos;
};

export default TodoList;
