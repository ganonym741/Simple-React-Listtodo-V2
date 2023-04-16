import React, { useState } from 'react';
import './App.css';
import InputList from './components/InputList';
import ListTodo from './components/ListTodo';
import { Todo } from './model/model';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("")
    }
  }
  console.log(todos)

  return (
    <div className="App">
      <span className="heading">ListToDo</span>
      <InputList todo={todo} setTodo={setTodo} handleAdd={handleAdd}  />
      <ListTodo todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
