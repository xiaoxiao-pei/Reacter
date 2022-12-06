import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import "../css/App.css";
import axios from "axios";
// import { useContext } from "react";
const theme = createTheme({
  palette: {
    primary: {
      main: "#C2DCB1",
      darker: "#053e85",
    },
  },
});
export const AddPost = () => {
  const [newPost, setNewPost] = useState({});
  // const userId = localStorage.getItem("userId");
  const userId = "638ce1464c43b7b1ccbe7867";

  const handleSubmit = async (event) => {
    console.log("subit");
    event.preventDefault();
    setNewPost({
      ...newPost,
      userId: userId,
      postTime: new Date(),
      postLikes: 0,
    });
    console.log(newPost.postPhoto);
    const formData = new FormData();
    formData.append("photo", newPost.photo);
    formData.append("userId", newPost.userId);
    formData.append("postTitle", newPost.postTitle);
    formData.append("postContent", newPost.postContent);
    formData.append("postTime", newPost.postTime);
    formData.append("postLikes", newPost.postLikes);
    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    console.log(formData);
    axios
      .post("http://localhost:3001/posts/create", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addInfo = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const addPhoto = (e) => {
    setNewPost({
      ...newPost,
      photo: e.target.files[0],
      userId: userId,
      postTime: new Date(),
      postLikes: 0,
    });
  };
  return (
    <div className="row">
      <form
        className="AddPostForm col-8 col-md-6 col-lg-5 col-xl-4 text-center px-0"
        onSubmit={handleSubmit}
      >
        <div className="form-body">
          <div>
            <h3 className="formTitle py-3">Create a new post</h3>
          </div>
          <div>
            <input
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
          <div>
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
            <ThemeProvider theme={theme}>
              <Button variant="contained" type="submit">
                Create
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
