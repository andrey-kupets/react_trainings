import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';

const Header = ({counter}) => {
    console.log('rerender child');
    return <h1>{counter}</h1>;
};

const TodoItem = ({todo, remove}) => (
    <div>
        {todo.title} <br/>
        {todo.content} <br/>
        <button onClick={remove}><b>remove</b></button>
        <hr/>
    </div>
);

function App() {
  console.log('rerender parent');

  // const [ counter, setCounter ] = useState(0);
  // const [ headerVisibility, setHeaderVisibility ] = useState(true);
  // const [ todos, setTodos ] = useState([
  //     {id: 1, title: 'react', content: 'text'},
  //     {id: 2, title: 'angular', content: 'text'},
  //     {id: 3, title: 'mongo', content: 'text'}]);

  const [ state, setState ] = useState({
      counter: 0,
      headerVisibility: true,
      todos: [
          {id: 1, title: 'react', content: 'text'},
          {id: 2, title: 'angular', content: 'text'},
          {id: 3, title: 'mongo', content: 'text'}]
  });

  const countHandler = () => {
    setState( {
        // для сложніх стейтов (стейт - объект)
        // если не копировать стейт, то тогда мы перезапишем ВЕСЬ стейт (все его поля) на то, что влаживаем
        // т.е. в данном случае весь объект - перезапишется только на его часть (одно поле)
        ...state,
        counter: state.counter + 1
    });
    console.log(state.counter + 1);
  };

  const toggleHandler = () => {
    setState({
        ...state,
        headerVisibility: !state.headerVisibility
    });
  };

  const changeTodo = () => {
    const newArr = [...state.todos];
    newArr[0] = {
        id: newArr[0].id,
        title: Math.random(),
        content: Math.random()
    };
    setState({
        ...state,
        todos: newArr
    });
    // if ref on initialState isn't changed - NO RENDER - so we copy by ...
      // or in that way:
      // setTodos([...todos])
      // todos = [todos[0], todos[1]];
    //   todos[1] = Math.random();+-
    //   setTodos(todos);
  };

  const removeFirst = () => {
      // setState({
      //     ...state,
      //   todos: state.todos.filter((todo, index ) => index !== 0)
      // })
      const newArr = [...state.todos];
      newArr.shift();
      setState({
          ...state,
          todos: newArr
      })
  };

  const removeLast = () => {
      const newArr = [...state.todos];
      newArr.pop();
      setState({
          ...state,
          // todos: state.todos.filter((todo, index ) => index !== state.todos.length - 1)
          todos: newArr
      })
  }

  const removeTodo = (id) => {
      setState({
          ...state,
          todos: state.todos.filter(todo => todo.id !== id)
      })
  };

  const restoreTodos = () => {
      setState({
          ...state,
          todos: [ // hardcode
              {id: 1, title: 'react', content: 'text'},
              {id: 2, title: 'angular', content: 'text'},
              {id: 3, title: 'mongo', content: 'text'}]
      })
  };

  const { counter, headerVisibility, todos } = state;
  return (
    <div className="App">
      {headerVisibility && <Header counter={counter}/>}
      <button onClick={countHandler}><h3>+1</h3></button>
      <button onClick={toggleHandler}><h3>toggleHeader</h3></button>
      <button onClick={changeTodo}><h3>change todo</h3></button>
      <button onClick={removeFirst}><h3>remove 1st todo</h3></button>
      <button onClick={removeLast}><h3>remove last todo</h3></button>
      <button onClick={restoreTodos}><h3>restore todos</h3></button>
      {state.todos.map(todo => <TodoItem key={todo.id} todo={todo} remove={() => removeTodo(todo.id)}/>)}
    </div>
  );
};

export default App;
