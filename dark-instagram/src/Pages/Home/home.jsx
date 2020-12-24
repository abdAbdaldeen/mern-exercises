import React, { Component, useEffect, useState } from "react";
import Stories from "../../Components/stories/stories";
import "./style.css";
import Post from "../../Components/Posts/post";
import axios from "axios";
import Pusher from "pusher-js";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.fData = this.fData.bind(this);
    this.addTask = this.addTask.bind(this);
  }
  state = {
    post: "",
    url: "",
    posts: [],
  };
  componentDidMount() {
    this.fData();

    const pusher = new Pusher("1fd9036ed08f2c82782f", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("posts");
    channel.bind("inserted", this.addTask);
  }
  async fData() {
    await axios.get("http://localhost:8000/posts").then((res) => {
      this.setState({
        posts: res.data,
      });
    });
  }
  addTask(newTask) {
    console.log(newTask);
    this.setState((prevState) => ({
      posts: prevState.posts.concat(newTask),
    }));
  }
  // fData = async () => {

  // };

  hSubmit = (e) => {
    e.preventDefault();
    const obj = {
      userID: sessionStorage.getItem("userID"),
      name: sessionStorage.getItem("name"),
      imgUrl: sessionStorage.getItem("imgUrl"),
      postText: this.state.post,
      postImgUrl: this.state.url,
      date: new Date(),
      comments: [],
    };
    // const posts = this.state.posts;
    // this.setState({
    //   posts: [...posts, obj],
    // });
    axios.post("http://localhost:8000/posts", obj);
  };
  hChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="home">
        <Stories className="stories" />
        <form className="postform" onSubmit={this.hSubmit}>
          <input
            placeholder="What's on your mind?"
            type="text"
            name="post"
            onChange={this.hChange}
          />
          <input
            placeholder="Image URL"
            type="text"
            name="url"
            onChange={this.hChange}
          />
          <input type="submit" value="Post" />
        </form>
        <div className="posts">
          {this.state.posts.map((post) => (
            <Post
              postID={post._id}
              name={post.name}
              imgUrl={post.imgUrl}
              isNew={false}
              postText={post.postText}
              postImg={post.postImgUrl}
              postTime={post.date}
              comments={post.comments}
              numLike={10}
              postLoc={"Amman"}
            />
          ))}
        </div>
      </div>
    );
  }
}
