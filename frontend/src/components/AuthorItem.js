import { Link, Navigate } from "react-router-dom";
import "../css/authors.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AuthorItem({ author, changeAuthorList }) {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user && !user.userIsAdmin)) {
      navigate("/login");
    }
  }, []);
  const deleteUser = (id) => {
    fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" })
      .then((data) => data.json())
      .then(() => changeAuthorList(id));
  };

  return (
    <>
      <td>
        <div
          className="authorPhoto"
          style={{
            backgroundImage: `url(http://localhost:3001/getImg/${author.userPhoto})`,
          }}
        ></div>
      </td>
      <td>
        <Link className="link" to={`/admin/profile/${author._id}`}>
          {author.userName}
        </Link>
      </td>
      <td>{author.userEmail}</td>
      <td>
        <Link
          className="link"
          to={`/admin/author/posts/${author._id}/${author.userName}`}
        >
          {author.userPostCount}
        </Link>
        <RiDeleteBin5Line
          onClick={() => deleteUser(author._id)}
          className="userDeleteIcon"
        />
      </td>
    </>
  );
}
export default AuthorItem;
