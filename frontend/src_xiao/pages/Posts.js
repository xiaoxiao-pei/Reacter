import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import "../css/posts.css";

function Posts() {
  const [postList, setPostList] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const { userId } = useParams();
  const { userName } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const paraId = userId;
  const paraUsername = userName;
  useEffect(() => {
    let id;
    if (
      !user ||
      (isAll === true && user.isAdmin === false) ||
      (!paraUsername && user.isAdmin === true)
    ) {
      fetch("http://localhost:3001/posts", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          if (!user) {
            data = data.slice(-5);
          }
          setPostList([...data]);
          // data.map((d) => {
          //   setPostList((postList) => [...postList, d]);
          // });
        });
    } else {
      if (paraUsername) {
        id = paraId;
      } else {
        id = user._id;
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
      <div className="postsHead">
        {!user && <h1 style={{ textAlign: "center" }}>Lastest posts</h1>}
        {user && !user.isAdmin && (
          <>
            <h1 style={{ textAlign: "center" }}>
              <span className="postPartDis" onClick={showMine}>
                Mine
              </span>
              <span style={{ color: "orange", fontSize: "3rem" }}>/</span>
              <span className="postPartDis" onClick={showAll}>
                All
              </span>
            </h1>
          </>
        )}
        {user && user.isAdmin && (
          <>
            <h1>
              <span>Posts of paraUserName</span>
            </h1>
          </>
        )}
      </div>
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
