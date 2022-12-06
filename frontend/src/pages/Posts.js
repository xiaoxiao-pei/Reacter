import { useEffect, useState } from "react";

import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import "../css/posts.css";

function Posts({ isAll }) {
  const [postList, setPostList] = useState([]);

  // const user = localStorage.getItem("user");
  const userId = "638b879d586eb1728419bb01";
  const paraId = useParams("userId");
  useEffect(() => {
    console.log("recAuthors");
    // to change
    let userType = false;
    let id;
    // if (!user || (isAll === true && user.isAdmin === false))
    if (isAll === true && userType === false) {
      fetch("http://localhost:3001/posts", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          data.map((d) => {
            setPostList((postList) => [...postList, d]);
          });
        });
    } else {
      // if (user.isAdmin) {
      if (userType === false) {
        id = paraId;
      } else if (!isAll) {
        // id = user._id
        id = userId;
      }
    }
    fetch(`http://localhost:3001/posts/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        data.map((d) => {
          setPostList((postList) => [...postList, d]);
        });
      });
    return setPostList([]);
  }, [isAll]);

  console.log(postList);

  // if ueserId does not exist, show the latest 5 posts
  // user.userId && postList.length > 5 && setPostList([...postList.slice(-5)]);
  !userId && postList.length > 5 && setPostList([...postList.slice(-5)]);

  return (
    <div className="container">
      {/* Title */}
      {console.log(postList)}
      {postList.length > 0 &&
        postList.map((post, id) => (
          <div key={id}>
            <PostCard p={post} />
          </div>
        ))}
    </div>
  );
}
export default Posts;
