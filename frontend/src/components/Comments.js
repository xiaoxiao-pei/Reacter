import { useEffect, useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import CommentItem from "./CommentItem";
import { MdOutlineAddCircle } from "react-icons/md";
import "../css/posts.css";
import NewCommentItem from "./NewCommentItem";

function Comments({ post }) {
  const [commentList, setCommentList] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    console.log("recAuthors");

    fetch(`http://localhost:3001/comments/${post._id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setCommentList([...data]);
      });

    // return () => {
    //   setCommentList([]);
    // };
  }, []);
  console.log(commentList);
  // if ueserId does not exist, show the latest 5 posts

  const addComment = () => {
    setShowAdd(true);
  };
  const removeComment = () => {
    setShowAdd(false);
  };

  const updateComList = (newComment) => {
    setCommentList((commentList) => [...commentList, newComment]);
    setShowAdd(false);
  };

  return (
    <div className="postComments">
      {/* Title */}

      {console.log(commentList)}
      {commentList.length > 0 &&
        commentList.map((c, id) => (
          <div key={id}>
            <CommentItem sc={c} />
          </div>
        ))}
      {showAdd ? (
        <>
          <NewCommentItem post={post} updateComList={updateComList} />
          <FiMinusCircle className="addComment" onClick={removeComment} />
        </>
      ) : (
        <MdOutlineAddCircle className="addComment" onClick={addComment} />
      )}
    </div>
  );
}
export default Comments;
