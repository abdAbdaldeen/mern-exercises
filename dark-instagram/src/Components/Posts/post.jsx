import React, { useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import "./style.css";
import TimeAgo from "timeago-react";
function Post(props) {
  const [c, setC] = useState(props.numLike);
  const [com, setcom] = useState("");
  const [isRed, setRed] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsComponnent, setCommentsComponnent] = useState();
  useEffect(async () => {
    await fData(props.postID);

    const pusher = new Pusher("1fd9036ed08f2c82782f", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("comments");
    channel.bind("insertedcomment", (newCom) => {
      const arrComments = [...comments, newCom];
      setComments(arrComments);
    });
  }, []);
  useEffect(() => {
    let arr = comments.map((comment) => (
      <div className="comment">
        <img className="profileImgCom" src={comment.imgUrl} alt="" />
        <p>
          <b>{comment.name + " "}</b> {comment.comText}
        </p>
        <TimeAgo className="comtime time" datetime={comment.date} />
      </div>
    ));
    setCommentsComponnent(arr);
    console.log("=============");
    console.log(arr);
    console.log("=============");
  }, [comments]);
  async function fData(id) {
    await axios.get("http://localhost:8000/comments/" + id).then((res) => {
      setComments(res.data);
    });
  }
  const likeBtn = () => {
    if (!isRed) {
      setC(c + 1);
    } else {
      setC(c - 1);
    }
    setRed(!isRed);
  };
  const hChange = (e) => {
    setcom(e.target.value);
  };
  // useEffect(()=>{

  //   const pusher = new Pusher("1fd9036ed08f2c82782f", {
  //     cluster: "eu",
  //   });

  //   const channel = pusher.subscribe("posts");
  //   channel.bind("inserted", this.addTask);
  // })
  const hSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/comments", {
      comText: com,
      postID: props.postID,
      date: new Date(),
      name: sessionStorage.getItem("name"),
      imgUrl: sessionStorage.getItem("imgUrl"),
    });
    // fData(props.postID);
    // axios
    //   .post("http://localhost:8000/posts/addcomment/" + props.postID, {
    //     name: sessionStorage.getItem("name"),
    //     text: com,
    //     imgUrl: sessionStorage.getItem("imgUrl"),
    //   })
    //   .then((r) => {
    //     console.log(r);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };
  return (
    <div className="post">
      <div className="post-header">
        <div className={props.isNew ? "ring new" : "ring old"}>
          <img className="profileImg" src={props.imgUrl} alt="" />
        </div>

        <div className="name-loc">
          <p className="name">{props.name}</p>
          <p className="loc">{props.postLoc}</p>
        </div>
      </div>
      <img className="postImg" src={props.postImg} alt="" />
      <div className="post-body">
        <div className="reactions-row">
          <div>
            <button onClick={likeBtn}>
              <i className={isRed ? "red fas fa-heart" : "far fa-heart"}></i>
            </button>
            <button>
              <i class="far fa-comment"></i>
            </button>
            <button>
              <i class="far fa-paper-plane"></i>
            </button>
          </div>
          <button>
            <i class="far fa-bookmark"></i>
          </button>
        </div>
        <p className="likes">{c} Likes</p>
        <div className="comments">
          <p>
            <b>{props.name}</b> {props.postText}
          </p>
          {commentsComponnent}
        </div>
        <TimeAgo className="time" datetime={props.postTime} />
      </div>
      <form className="formCom" onSubmit={hSubmit}>
        <input onChange={hChange} type="text" placeholder="Add a comment" />{" "}
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default Post;
