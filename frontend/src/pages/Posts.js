import { useEffect, useState } from "react";

import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import "../css/posts.css";

function Posts() {
  const [postList, setPostList] = useState([]);
  const [isAll, setIsAll] = useState(true);

  // const user = localStorage.getItem("user");

  const userId = "638b879d586eb1728419bb01";
  const paraId = useParams("userId");
  useEffect(() => {
    console.log("recAuthors");
    // to change
    let userType = false;
    let id;
    // if (!user || (isAll === true && user.isAdmin === false) || (paraId === undefined && user.isAdmin === true))
    if (isAll === true && userType === false) {
      fetch("http://localhost:3001/posts", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          // if (user === undefined){
          if (userId === undefined) {
            data = data.slice(-5);
          }
          setPostList([...data]);
          // data.map((d) => {
          //   setPostList((postList) => [...postList, d]);
          // });
        });
    } else {
      // if (user.isAdmin === false && isAll === false) {
      if (userType === false) {
        id = paraId;
      } else {
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
          setPostList([...postList, d]);
        });
      });
    return () => setPostList([]);
  }, [isAll]);

  console.log(postList);

  const showAll = () => {
    setIsAll(true);
  };

  const showMine = () => {
    setIsAll(false);
  };
  // if ueserId does not exist, show the latest 5 posts
  // user.userId && postList.length > 5 && setPostList([...postList.slice(-5)]);
  // !userId && postList.length > 5 && setPostList([...postList.slice(-5)]);

  return (
    <div>
      <div>
        {/* {user.isAdmin ? null :<><h1>
              <span onClick={showMine}>Mine</span>
              <span onClick={showAll}> All</span>
            </h1></>} */}
        <h1 style={{ textAlign: "center" }}>
          <span className="postPartDis" onClick={showMine}>
            Mine
          </span>
          <span style={{ color: "orange", fontSize: "3rem" }}>/</span>
          <span className="postPartDis" onClick={showAll}>
            All
          </span>
        </h1>
      </div>
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
