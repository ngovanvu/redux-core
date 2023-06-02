import logo from "./logo.svg";
import "./App.css";
import { store } from "./redux/store";
import { increaseCount, decreaseCount, addTodo, deleteTodo, addTodoAsync } from "./redux/action";
import { connect, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

function App(props) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [name, setName] = useState("");
  const handleIncrease = () => {
    props.increaseCount(5); //* tăng lên 5
  };
  const handleDescrease = () => {
    props.decreaseCount(2); //* giảm đi 2
  };
  const handleOnchange = (e) => {
    setName(e.target.value);
  };
  // const fetchTodo = async () => {
  //   const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  //   console.log(res);
  // };
  const handleAddTodo = () => {
    // dispatch(
    //   addTodo({
    //     name,
    //     id: Math.random(),
    //   })
    // );
    // fetchTodo();
    setName("");
  };
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleAddAsync = () => {
    dispatch(addTodoAsync());
  };
  return (
    <div className="App">
      <h1>Redux turtorials</h1>
      <h4>{props.count}</h4>
      <button onClick={handleIncrease}>Tăng</button>
      <button onClick={handleDescrease}>Giảm</button>
      <div>
        <input value={name} onChange={handleOnchange} />
        <button onClick={handleAddTodo}>Add todo</button>
      </div>
      {todos.map((todo, index) => {
        return (
          <div key={todo.id}>
            {index} - {todo.name}
            <span onClick={() => handleDeleteTodo(todo.id)}>X</span>
          </div>
        );
      })}
      <button onClick={handleAddAsync}>async</button>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    count: store.getState().count.count,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    increaseCount: (data) => store.dispatch(increaseCount(data)),
    decreaseCount: (data) => store.dispatch(decreaseCount(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
