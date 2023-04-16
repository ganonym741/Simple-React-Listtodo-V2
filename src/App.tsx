import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputList from './components/InputList';
import ListTodo from './components/ListTodo';
import { Todo } from './model/model';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result
    console.log(result)

    if (!destination) return
    if (
      destination.droppableId===source.droppableId &&
      destination.index===source.index
      ) return
    
    let 
      add, 
      active = todos, 
      complete = completeTodos

    if (source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompleteTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <span className="heading">ListToDo</span>
      <InputList todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <ListTodo 
        todos={todos} 
        setTodos={setTodos} 
        completedTodos={completeTodos}
        setCompletedTodos={setCompleteTodos}
      />
      </div>
    </DragDropContext>
  );
}

export default App;
