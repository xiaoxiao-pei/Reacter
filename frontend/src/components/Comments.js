import { useEffect, useState } from "react";

import CommentItem from "./CommentItem";
import { MdOutlineAddCircle } from "react-icons/md";
import "../css/posts.css";
import NewCommentItem from "./NewCommentItem";

function Comments({ postId }) {
  const [commentList, setCommentList] = useState([]);
  // const userId = localStorage.getItem("userId");
  const userId = "638b879d586eb1728419bb01";
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    console.log("recAuthors");

    fetch(`http://localhost:3001/comments/${postId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        data.map((d) => {
          setCommentList((commentList) => [...commentList, d]);
        });
      });

    return setCommentList([]);
  }, []);
  console.log(commentList);
  // if ueserId does not exist, show the latest 5 posts

  const addComments = () => {
    setShowAdd(true);
  };
  return (
    <div className="container">
      {/* Title */}

      {console.log(commentList)}
      {commentList.length > 0 &&
        commentList.map((c, id) => (
          <div key={id}>
            <CommentItem sc={c} />
          </div>
        ))}
      {showAdd ? (
        <NewCommentItem postId={postId} />
      ) : (
        <MdOutlineAddCircle onClick={addComments} />
      )}
    </div>
  );
}
export default Comments;