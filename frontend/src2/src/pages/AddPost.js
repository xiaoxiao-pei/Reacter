import React from "react";
import { useState } from "react";
// import "../css/App.css";
import "../css/posts.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AddPost = () => {
  const [newPost, setNewPost] = useState({});
  let user = localStorage.getItem("user");
  user = user && JSON.parse(user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user && user.userIsAdmin)) {
      navigate("/login");
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setNewPost({
      ...newPost,
      userId: user._id,
      postTime: new Date(),
    });
    console.log(newPost.photo);
    const formData = new FormData();
    formData.append("photo", newPost.photo);
    formData.append("userId", newPost.userId);
    formData.append("postTitle", newPost.postTitle);
    formData.append("postContent", newPost.postContent);
    formData.append("postTime", newPost.postTime);
    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    axios
      .post("http://localhost:3001/posts/create", formData)
      .then((res) => {
        setNewPost(res);
      })
      .then(() => {
        fetch(`http://localhost:3001/users/posts/${user._id}`, {
          method: "PATCH",
          body: JSON.stringify({
            id: user._id,
            userPostCount: user.userPostCount + 1,
          }),
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        })
          .then((data) => {
            data.json();
          })
          .then(() => alert("post is created successfully"))
          .catch((err) => {
            console.log(err);
          });
      });
  };

  const addInfo = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const addPhoto = (e) => {
    setNewPost({
      ...newPost,
      photo: e.target.files[0],
      userId: user._id,
      postTime: new Date(),
    });
  };
  return (
    <div className="addPost">
      <form className="addPostForm" onSubmit={handleSubmit}>
        <div>
          <div style={{ textAlign: "center" }}>
            <h3 className="formTitle">Create a new post</h3>
          </div>
          <div>
            <input
              maxLength={"100%"}
              name="postTitle"
              className="form__input mb-3"
              type="text"
              placeholder="Post Title"
              onChange={addInfo}
            />
          </div>
          <div>
            <textarea
              name="postContent"
              className="form__input mb-3"
              type="text"
              placeholder="post content"
              onChange={addInfo}
            />
          </div>
          <div className="uploadImg">
            <div
              style={{
                backgroundImage:
                  newPost.postPhoto &&
                  `url(http://localhost:3001/getImg/${newPost.userPhoto}`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "150px",
                border: "1px solid gray",
                margin: "0 0 1rem 0 ",
              }}
            ></div>
            <input
              name="postPhoto"
              className="form__input mb-3"
              id="file"
              onChange={addPhoto}
              type="file"
              accept="image/gif,image/jpeg,image/jpg,image/png"
              multiple
            />
          </div>

          <div className="form_button mb-4">
            <Button
              style={{
                backgroundColor: "#c2dcb1",
                border: "none",
                color: "rgb(2, 2, 74)",
              }}
              type="submit"
            >
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
