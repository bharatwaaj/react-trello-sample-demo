import React, { Component } from "react";
import ReactDOM from "react-dom";
import isEmpty from "lodash/isEmpty";
import axios from "axios";
import Board from "react-trello";
import "./styles.css";

class App extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios
      .get("http://localhost:8080/getAllTasksInBoard?boardTitle=Test")
      .then((res) => {
        console.log("res", res);
        const data = {
          lanes: [
            {
              id: "Test",
              title: "To-Do",
              label: "Test",
              style: { width: 280 },
              cards: res.data.map((user) => ({
                id: user.id,
                title: user.taskTitle,
                label: user.assignee,
                description: user.taskDescription
              }))
            }
          ]
        };

        this.setState({ data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        {!isEmpty(data) ? <Board data={data} draggable /> : <p>Loading...</p>}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
