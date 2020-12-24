import React from "react";
import "./css/main.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      postApiResponse: "",
      name: "",
      age: 0,
      Ename: "",
      Eage: 0,
      id: "",
      toggle: false,
      Eid: "",
    };
  }
  callAPI() {
    fetch("http://localhost:9000/api")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: JSON.parse(res) }))
      .then(async () => {
        const mapout = await this.state.apiResponse.map((user) => (
          <tr className="row100">
            <td className="column100 column1" data-column="column1">
              {user.name}
            </td>
            <td className="column100 column2" data-column="column2">
              {user.age}
            </td>
            <td
              className="column100 column3"
              data-column="column3"
              onClick={() => {
                this.deleteItem(user._id);
              }}
            >
              {" "}
              <i className="fas fa-trash-alt"></i>
            </td>
            <td
              className="column100 column3"
              data-column="column3"
              onClick={() => {
                this.editItem(user._id, user.name, user.age);
              }}
            >
              {" "}
              <i className="fas fa-edit"></i>
            </td>
          </tr>
        ));
        this.setState({ mapout: mapout });
      });
  }

  postCallApi() {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ name: this.state.name, age: this.state.age }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:9000/api", requestOptions).then(this.callAPI);
  }
  editItem = (id, name, age) => {
    this.setState({ toggle: true, Ename: name, Eage: age, Eid: id });
  };

  hUpdate = (id) => {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({ name: this.state.Ename, age: this.state.Eage }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:9000/api/" + id, requestOptions).then(() => {
      this.setState({ toggle: false });
      this.callAPI();
    }).catch = (e) => {
      console.log(e, "--------=========--------");
    };
  };

  componentWillMount() {
    this.callAPI();
  }
  hSubmit = () => {
    this.postCallApi();
  };
  hSubmitDelete = () => {
    this.deleteItem(this.state.id);
  };
  hChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  deleteItem = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:9000/api/" + id, requestOptions).then(this.callAPI);
    window.location.reload();
  };
  render() {
    return (
      <div className="App">
        <div className="limiter">
          <div className="container-table100">
            <form onSubmit={this.hSubmit}>
              <input
                type="text"
                name="name"
                placeholder="name"
                onChange={this.hChange}
              />
              <input
                type="number"
                name="age"
                placeholder="age"
                onChange={this.hChange}
              />
              <input type="submit" className="button" value="submit" />
            </form>
            <hr />
            <form onSubmit={this.hSubmitDelete}>
              <input
                type="text"
                name="id"
                placeholder="ID"
                onChange={this.hChange}
              />
              <input type="submit" className="button" value="delete" />
            </form>
            {/* <p>{this.state.apiResponse}</p> */}
            <div className="wrap-table100">
              <div className="table100 ver6 m-b-110">
                <table data-vertable="ver6">
                  <thead>
                    <tr className="row100 head">
                      <th className="column100 column1" data-column="column1">
                        Name
                      </th>
                      <th className="column100 column2" data-column="column2">
                        Age
                      </th>
                      <th className="column100 column3" data-column="column3">
                        Delete
                      </th>
                      <th className="column100 column3" data-column="column3">
                        Edit
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {!this.state.toggle ? (
                      this.state.mapout
                    ) : (
                      <tr className="row100">
                        <td
                          className="column100 column1 Etd"
                          data-column="column1"
                        >
                          <input
                            className="Einput"
                            type="text"
                            name="Ename"
                            value={this.state.Ename}
                            onChange={this.hChange}
                          />
                        </td>
                        <td
                          className="column100 column2 Etd"
                          data-column="column2"
                        >
                          <input
                            className="Einput"
                            type="number"
                            name="Eage"
                            value={this.state.Eage}
                            onChange={this.hChange}
                          />
                        </td>
                        <td
                          className="column100 column3"
                          data-column="column3"
                          onClick={() => {
                            this.deleteItem(this.state.Eid);
                            this.setState({ toggle: false });
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </td>
                        <td
                          className="column100 column3 "
                          data-column="column3"
                          onClick={() => {
                            this.hUpdate(this.state.Eid);
                          }}
                        >
                          <i class="fas fa-check"></i>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
