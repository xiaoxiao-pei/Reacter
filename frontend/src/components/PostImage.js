import axios from "axios";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
function PostImage() {
  const { userId, postTitle } = useParams();
  // const queryParams = new URLSearchParams(window.location.search);
  // const userId = queryParams.get("userId");
  // const postTitle = queryParams.get("postTitle");

  // const search = useLocation().search;
  // console.log(search);
  // const userId = new URLSearchParams(search).get("userId");
  // const postTitle = new URLSearchParams(search).get("postTitle");
  console.log(postTitle);
  console.log(userId);
  const imageFileRef = useRef();
  const uploadImg = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", imageFileRef.current.files[0]);
    formData.append("userId", userId);
    formData.append("postTitle", postTitle);
    console.log(formData);

    axios
      .post("http://localhost:3001/posts/addphoto", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={uploadImg} encType="multipart/form-data">
        <input
          name="file"
          id="file"
          ref={imageFileRef}
          type="file"
          accept="image/gif,image/jpeg,image/jpg,image/png"
          multiple
        />
        <label htmlFor="image"></label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default PostImage;
