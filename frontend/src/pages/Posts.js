import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import "../css/posts.css";
import "../css/App.css";

function Posts() {
  const [postList, setPostList] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const { userId } = useParams();
  const { userName } = useParams();
  let user = localStorage.getItem("user");
  user = user && JSON.parse(user);

  // user = user && user.json();
  const paraId = userId;
  const paraUsername = userName;
  console.log(paraUsername);

  useEffect(() => {
    let id;
    if (
      (!user && !paraUsername) ||
      (user && !user.userIsAdmin && isAll) ||
      (user && user.userIsAdmin && !paraUsername)
    ) {
      console.log("show all -------");
      fetch("http://localhost:3001/posts", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          setPostList(!user ? [...data.slice(-5).reverse()] : [...data]);
        });
    } else {
      if (paraUsername) {
        id = paraId;
      } else {
        id = user._id;
      }

      fetch(`http://localhost:3001/posts/${id}`, {
        method: "GET",
      })
        .then((d) => d.json())
        .then((d) => {
          setPostList([...d]);
        });
    }
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
    <div className="individualPost">
      <div className="postsHead">
        {!user && !paraUsername && (
          <h1 style={{ textAlign: "center" }}>Lastest posts</h1>
        )}
        {user && !user.userIsAdmin && (
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
        {user && user.userIsAdmin && !paraUsername && (
          <>
            <h1 style={{ textAlign: "center" }}>All posts</h1>
          </>
        )}

        {(!user && paraUsername) ||
          (user && user.userIsAdmin && paraUsername && (
            <>
              <h1 style={{ textAlign: "center" }}>Posts of {paraUsername}</h1>
            </>
          ))}
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
