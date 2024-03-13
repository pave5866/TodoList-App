import { Input, Stack, Button, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import "./todoApp.css";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTodo = () => {
    if (currentTodo.trim() !== "") {
      if (editingIndex !== null) {
        const updatedTodos = [...todoList];
        updatedTodos[editingIndex] = currentTodo.trim();
        setTodoList(updatedTodos);
        setCurrentTodo("");
        setEditingIndex(null);
        alert("Todo başarıyla düzenlendi!");
      } else {
        setTodoList([...todoList, currentTodo.trim()]);
        setCurrentTodo("");
      }
    } else {
      alert("Lütfen boş bir değer girmeyin!");
    }
  };

  const handleDeleteTodo = (index, isCompleted = false) => {
    const updatedTodos = isCompleted ? [...completedTodos] : [...todoList];
    updatedTodos.splice(index, 1);
    isCompleted ? setCompletedTodos(updatedTodos) : setTodoList(updatedTodos);
    alert("Todo başarıyla silindi!");
  };

  const handleEditTodo = (index, isCompleted = false) => {
    const targetTodo = isCompleted ? completedTodos[index] : todoList[index];
    setCurrentTodo(targetTodo);
    setEditingIndex(index);
  };

  const handleCompleteTodo = (index) => {
    const completedTodo = todoList[index];
    const updatedTodos = [...todoList];
    updatedTodos.splice(index, 1);
    setTodoList(updatedTodos);
    setCompletedTodos([...completedTodos, completedTodo]);
  };

  const handleActivateTodo = (index) => {
    const activatedTodo = completedTodos[index];
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.splice(index, 1);
    setCompletedTodos(updatedCompletedTodos);
    setTodoList([...todoList, activatedTodo]);
  };

  return (
    <div>
      <h1 className="heading">Todo APP</h1>
      <div className="Todo-container">
        <Stack spacing={3}>
          <Input
            variant="outline"
            placeholder="Entry Todo"
            size="lg"
            width="500px"
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
          />
        </Stack>
        <div className="btn-add">
          <Button onClick={handleAddTodo} variant="link" colorScheme="red">
            {editingIndex !== null ? "Düzelt" : "+"}
          </Button>
        </div>
      </div>
      <div className="Todos-container">
        <h3>Todos</h3>
        <div className="add-todo-list">
          <ul>
            {todoList.map((todo, index) => (
              <li key={index}>
                {todo}
                <Button onClick={() => handleEditTodo(index)} ml={2}>
                  Düzelt
                </Button>
                <Button onClick={() => handleDeleteTodo(index)} ml={2}>
                  Sil
                </Button>
                <Button onClick={() => handleCompleteTodo(index)} ml={2}>
                  Tamamla
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="Completed-todos-container">
        <h3>Tamamlanan Todos</h3>
        <ul>
          {completedTodos.map((completedTodo, index) => (
            <li key={index}>
              {completedTodo}
              <div className="button-container">
                <Button onClick={() => handleDeleteTodo(index, true)}>
                  Sil
                </Button>{" "}
                <Button onClick={() => handleActivateTodo(index)}>
                  Aktifleştir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
