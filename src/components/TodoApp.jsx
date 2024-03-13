import { Input, Stack, Button, Select, Tooltip } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "./todoApp.css";

const TodoApp = () => {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });

  const [completedTodos, setCompletedTodos] = useState(() => {
    const savedCompletedTodos = localStorage.getItem("completedTodos");
    return savedCompletedTodos ? JSON.parse(savedCompletedTodos) : [];
  });

  const [currentTodo, setCurrentTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedCompletedTodo, setSelectedCompletedTodo] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [selectedTodoInfo, setSelectedTodoInfo] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const handleAddTodo = () => {
    if (currentTodo.trim() !== "") {
      if (editingIndex !== null) {
        const updatedTodos = [...todoList];
        updatedTodos[editingIndex] = {
          ...updatedTodos[editingIndex],
          todo: currentTodo.trim(),
          editedAt: new Date().toLocaleString(),
        };
        setTodoList(updatedTodos);
        setCurrentTodo("");
        setEditingIndex(null);
        alert("Todo was updated successfully!");
      } else {
        const newTodo = {
          todo: currentTodo.trim(),
          createdAt: new Date().toLocaleString(),
        };
        setTodoList([...todoList, newTodo]);
        setCurrentTodo("");
      }
    } else {
      alert("Please fill the todo field!");
    }
  };

  const handleDeleteTodo = (index, isCompleted = false) => {
    const updatedTodos = isCompleted ? [...completedTodos] : [...todoList];
    updatedTodos.splice(index, 1);
    isCompleted ? setCompletedTodos(updatedTodos) : setTodoList(updatedTodos);
    if (isCompleted && index === parseInt(selectedCompletedTodo)) {
      setSelectedCompletedTodo("");
    }
    alert("Todo deleted successfully!");
  };

  const handleEditTodo = (index, isCompleted = false) => {
    const targetTodo = isCompleted ? completedTodos[index] : todoList[index];
    setCurrentTodo(targetTodo.todo);
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
    if (index === parseInt(selectedCompletedTodo)) {
      setSelectedCompletedTodo("");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTodoList = showCompleted
    ? completedTodos
    : todoList.filter((todo) =>
        todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleDeleteAllCompleted = () => {
    setCompletedTodos([]);
    setSelectedCompletedTodo("");
    alert("All completed todos have been deleted!");
  };

  return (
    <div>
      <h1 className="heading">Todo APP</h1>
      <div className="Todo-container">
        <Stack spacing={3}>
          <Input
            variant="outline"
            placeholder="What is your mission today?"
            size="lg"
            width="500px"
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
          />
          <Input
            variant="outline"
            placeholder="Search ?"
            size="md"
            textAlign={"center"}
            width="500px"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Stack>
        <div className="btn-add">
          <Button onClick={handleAddTodo} variant="link" colorScheme="red">
            {editingIndex !== null ? "Fix" : "+"}
          </Button>
        </div>
      </div>
      <div className="Todos-container">
        <h3>Todos</h3>
        <div className="add-todo-list">
          <ul>
            {filteredTodoList.map((todo, index) => (
              <li key={index}>
                {todo.todo}
                <Button onClick={() => handleEditTodo(index)} ml={2}>
                  Fix
                </Button>
                <Button onClick={() => handleDeleteTodo(index)} ml={2}>
                  Delete
                </Button>
                {!todo.completed && (
                  <Button onClick={() => handleCompleteTodo(index)} ml={2}>
                    Completed
                  </Button>
                )}
                <Tooltip
                  label={`Created At: ${todo.createdAt}`}
                  placement="right-end"
                  isOpen={showInfo && selectedTodoInfo === index}
                  onClose={() => setShowInfo(false)}
                >
                  <Button
                    onClick={() => {
                      setSelectedTodoInfo(index);
                      setShowInfo(!showInfo);
                    }}
                    ml={2}
                  >
                    ℹ️
                  </Button>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="Completed-todos-container">
        <h3>Completed Todos</h3>
        <Button onClick={handleDeleteAllCompleted} colorScheme="red" mb={4}>
          Delete All Completed
        </Button>
        <Select
          width={"500px"}
          onChange={(e) => setSelectedCompletedTodo(e.target.value)}
          placeholder=""
          value={selectedCompletedTodo}
        >
          <option value="">Select Completed</option>
          {completedTodos.map((completedTodo, index) => (
            <option key={index} value={index}>
              {completedTodo.todo}
            </option>
          ))}
        </Select>
        {selectedCompletedTodo !== "" && (
          <div>
            <p>{completedTodos[selectedCompletedTodo].todo}</p>
            <div className="button-container">
              <Button
                onClick={() =>
                  handleDeleteTodo(parseInt(selectedCompletedTodo), true)
                }
              >
                Delete
              </Button>{" "}
              <Button
                onClick={() =>
                  handleActivateTodo(parseInt(selectedCompletedTodo))
                }
              >
                Activate
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
