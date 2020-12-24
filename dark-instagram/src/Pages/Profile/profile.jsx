import React, { useState } from "react";
import "./style.css";
import Img from "../../img/1-1.jpg";
function Profile() {
  const [imges, setImges] = useState([
    {
      img:
        "https://images.pexels.com/photos/5074821/pexels-photo-5074821.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      w: "img",
    },
    {
      img:
        "https://images.pexels.com/photos/4929241/pexels-photo-4929241.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      w: "video",
    },
    {
      img:
        "https://images.pexels.com/photos/4923245/pexels-photo-4923245.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      w: "cimg",
    },
    {
      img:
        "https://images.pexels.com/photos/4930018/pexels-photo-4930018.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      w: "img",
    },
    {
      img:
        "https://images.pexels.com/photos/4929994/pexels-photo-4929994.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      w: "cimg",
    },
    {
      img:
        "https://images.pexels.com/photos/4929834/pexels-photo-4929834.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      w: "video",
    },
    {
      img:
        "https://images.pexels.com/photos/4929838/pexels-photo-4929838.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      w: "cimg",
    },
    {
      img:
        "https://images.pexels.com/photos/4882959/pexels-photo-4882959.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      w: "img",
    },

    {
      img:
        "https://images.pexels.com/photos/4976710/pexels-photo-4976710.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      w: "video",
    },
  ]);
  return (
    <div className="profile">
      <div className="info-img">
        <img src={sessionStorage.getItem("imgUrl")} alt="" />
        <div className="info">
          <div className="row1">
            <p className="name">3bod342</p>
            <button>Edit Profile</button>
            <i class="fas fa-cog"></i>
          </div>
          <div className="row2">
            <p>26 posts</p>
            <p>959 followers</p>
            <p>108 following</p>
          </div>
          <div className="row3">
            <b>Abdel rahman</b>
          </div>
          <div className="row4">
            <p>
              تسلق الجبال لترى العالم، لا ليراك العالم🏔🗺
              <br /> Full Stack 👨‍💻💻📱
            </p>
          </div>
        </div>
      </div>
      <div className="grid-img">
        {imges.map((imge) => (
          <div
            className="img-dev"
            style={{ backgroundImage: `url(${imge.img})` }}
          >
            {imge.w == "cimg" ? (
              <i class="fas fa-clone"></i>
            ) : imge.w == "video" ? (
              <i class="fas fa-video"></i>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
