import React from "react";
import "./App.css";
import { useState, useRef, useEffect } from "react";
function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [message, setMessage] = useState("");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayOfWeek = days[today.getUTCDay()];
  const textWithLine = {
    "-webkit-text-decoration-line": "line-through",
    "text-decoration-line": "line-through",
  };
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addToDo = (toDo) => {
    if (toDo === "") {
      setMessage("Empty todo cannot be added.");
    } else {
      let todoExists = false;
      for (let i = 0; i < toDos.length; i++) {
        if (toDos[i].text === toDo) {
          todoExists = true;
          break;
        }
      }
      if (todoExists) {
        setMessage("Todo already exists.");
      } else {
        setMessage("");
        setToDos([
          ...toDos,
          { id: Date.now(), text: toDo, status: false},
        ]);
        setToDo("");
      }
    }
  };

  const deleteToDo = (id) => {
    setToDos(toDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {dayOfWeek} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => {
            setToDo(e.target.value);
          }}
          ref={inputRef}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() => addToDo(toDo)}
          className="fas fa-plus-square"
        ></i>
      </div>

      <div className="todos">
        {message && <p className="error-message">{message}</p>}
        {toDos.map((obj) => {
            if (obj.text !== "") {
              return (
                <div className="todo">
                  <div className="left">
                    <input
                      onChange={(e) => {
                        setToDos(
                          toDos.filter((toDo) => {
                            if (toDo.id === obj.id) {
                              obj.status = e.target.checked;
                            }
                            return obj;
                          })
                        );
                      }}
                      value={obj.status}
                      type="checkbox"
                      name=""
                      id=""
                    />
                    {obj.status ? (
                      <p style={textWithLine}>{obj.text}</p>
                    ) : (
                      <p>{obj.text}</p>
                    )}
                  </div>
                  <div className="right">
                    <i
                      onClick={()=>deleteToDo(obj.id)}
                      className="fas fa-trash"
                    ></i>
                  </div>
                </div>
              );
            }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
