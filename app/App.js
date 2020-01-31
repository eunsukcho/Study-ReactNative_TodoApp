import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Heading from './Heading';
import Input from './Input';
import Button from './Button';
import TodoList from './TodoList';
import uuidv1 from 'uuid/v1';
import TabBar from './TabBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loadedToDOs: false,
      inputValue: '',
      todos: [],
      type: 'All',
    };
    this._submitTodo = this._submitTodo.bind(this);
    // 메소드를 생성자 내 클래스에 바인딩, 클래스를 사용하고 있으면 메소드는 클래스에 자동으로 바인딩되지 않는다.
    this._toggleComplete = this._toggleComplete.bind(this);
    this._deleteTodo = this._deleteTodo.bind(this);
    this.setType = this._setType.bind(this);
  }
  componentDidMount = () => {
    this._loadToDos();
  };

  _loadToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem('toDos');
      const parsedToDo = JSON.parse(toDos);

      this.setState({
        loadedToDOs: true,
        toDos: parsedToDo || {},
      });
    } catch (err) {
      console.log(err);
    }
  };

  _inputChange = inputValue => {
    console.log('Input Value : ' + inputValue);
    this.setState({inputValue: inputValue});
  };

  _submitTodo = () => {
    if (this.state.inputValue.match(/^\s*$/)) {
      return;
    }
    const ID = uuidv1();
    const todo = {
      todoIndex: ID,
      title: this.state.inputValue,
      complete: false,
      type: 'All',
    };
    const todos = [...this.state.todos, todo];
    this.setState({todos: todos, inputValue: ''}, () => {
      this._saveToDos(todos);
      console.log('State : ' + JSON.stringify(this.state.todos));
    });
  };

  // eslint-disable-next-line no-shadow
  _toggleComplete(todoIndex) {
    console.log('togglecomplete : ' + todoIndex);
    let todos = this.state.todos;
    console.log('todos : ' + JSON.stringify(todos));
    todos.forEach(todo => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete;
      }
    });
    this.setState({todos});
    this._saveToDos(todos);
  } // todoIndex를 인수로 하며, 주어진 인덱스의 todo를 만날때까지 todos를 반복, complete bool값을 현재와 반대되게 바꾸고 todos의 state를 재지정

  // eslint-disable-next-line no-shadow
  _deleteTodo = todoIndex => {
    console.log('delete : ' + todoIndex);
    let {todos} = this.state;
    /*delete todos[todoIndex];
    this.setState({todos: todos}, () => {
      console.log('State : ' + JSON.stringify(this.state.todos));
    });*/
    todos = todos.filter(todo => todo.todoIndex !== todoIndex);
    this.setState({todos});
    this._saveToDos(todos);
  }; // todoIndex를 인수로 하며, todos를 필터링해 전달된 인덱스의 todo를 제외한 모든 todo들을 반환, 그런 다음 state를 나머지 todos로 재지정

  _setType = type => {
    this.setState({type: type});
  };
  _saveToDos = todos => {
    const saveToDos = AsyncStorage.setItem('toDos', JSON.stringify(todos));
  };

  render() {
    const {inputValue, todos, type} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <Heading />
          <Input
            inputValue={inputValue} // state의 inputValue를 Input 컴포넌트에 props로 전달
            _inputChange={text => this._inputChange(text)} // inputChange를 props으로 Input 컴포넌트에 전달
          />
          <TodoList
            key={todos.todoIndex}
            todos={todos}
            type={type}
            _toggleComplete={this._toggleComplete}
            _deleteTodo={this._deleteTodo}
          />
          <Button _submitTodo={this._submitTodo} />
        </ScrollView>
        <TabBar type={type} _setType={this._setType} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
