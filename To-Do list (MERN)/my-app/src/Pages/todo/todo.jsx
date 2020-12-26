import React from "react";
import ReactDOM from "react-dom";
import ListItems from "../../component/listItems/listItems";
import Donelist from "../../component/donelist/donelist";
import axios from "axios";
import Header from "../../component/header/header";

import "./style.css";
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      doneItems: [],
      text: "",
      updatText: "",
      updatId: "",
      updatTogel: false,
    };
  }
  getdata = () => {
    axios.get("http://localhost:8000/api/tasks").then((res) => {
      console.log(res);

      this.setState({
        items: res.data.filter((task) => !task.isdone),
        doneItems: res.data.filter((task) => task.isdone),
      });
    });
  };
  componentDidMount() {
    this.getdata();
  }
  addItem = async (e) => {
    e.preventDefault();
    const newItem = this.state.text;
    if (newItem !== "") {
      let config = {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      };
      let newJSON = await { task: newItem, isdone: false };
      axios
        .post("http://localhost:8000/api/tasks", newJSON, config)
        .then(() => {
          this.getdata();
        });
    }
    this.setState({
      text: "",
    });
  };
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  deleteItem = (id) => {
    axios.delete("http://localhost:8000/api/tasks/" + id).then(() => {
      this.getdata();
    });
  };
  Hupdate = async () => {
    let newJSON = await { task: this.state.updatText };
    axios
      .put(
        "http://localhost:8000/api/tasks/update/" + this.state.updatId,
        newJSON
      )
      .then(() => {
        this.setState({ updatTogel: false });
        this.getdata();
      });
  };

  updateItem = async (id, taskText) => {
    this.setState({
      updatTogel: true,
      updatText: taskText,
      updatId: id,
    });
  };

  setDone = (id) => {
    axios
      .put("http://localhost:8000/api/tasks/done/" + id)
      .then(() => {
        this.getdata();
      })
      .catch((e) => {
        alert(e);
      });
  };
  render() {
    return (
      <>
        <Header isLogin={true} />

        <div className="todo">
          <form id="to-do-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter task"
              value={this.state.text}
              onChange={this.handleInput}
              name="text"
            ></input>
            <button type="submit">
              <i class="far fa-plus-square"></i>
            </button>
          </form>
          {this.state.items.length != 0 ? (
            this.state.updatTogel ? (
              <div>
                <h2>To-Do</h2>
                <form
                  className="list updateform"
                  // className="updateform"
                  onSubmit={this.Hupdate}
                >
                  <input
                    type="text"
                    value={this.state.updatText}
                    name="updatText"
                    onChange={this.handleInput}
                  />
                  <span>
                    <button type="submit">
                      <i class="fas fa-check-square"></i>
                    </button>
                  </span>
                </form>
              </div>
            ) : (
              <ListItems
                items={this.state.items}
                deleteItem={this.deleteItem}
                setDone={this.setDone}
                updateItem={this.updateItem}
              />
            )
          ) : (
            <></>
          )}
          {this.state.doneItems.length != 0 && this.state.items.length != 0 ? (
            <div>
              <hr />
            </div>
          ) : (
            ""
          )}
          {this.state.doneItems.length != 0 && (
            <div>
              {" "}
              <Donelist
                items={this.state.doneItems}
                deleteItem={this.deleteItem}
              />{" "}
            </div>
          )}
        </div>
      </>
    );
  }
}
export default ToDo;
