import { Link } from "react-router-dom";
import "../css/authors.css";
import { RiDeleteBin5Line } from "react-icons/ri";
function AuthorItem({ author, changeAuthorList }) {
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

            // author.userPhoto === ""
            //   ? `url(https://hccryde.syd.catholic.edu.au/wp-content/uploads/sites/148/2019/05/Person-icon.jpg)`
            //   : `url(http://localhost:3001/getImg/${author.userPhoto})`,
            // width: "20px",
            // height: "20px",
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "cover",
            // backgroundPosition: "center",
          }}
        ></div>
      </td>
      <td>
        <Link className="link" to={`/admin/author/profile/${author._id}`}>
          {author.userName}
        </Link>
      </td>
      <td>{author.userEmail}</td>
      <td>
        <Link className="link" to={`/admin/post/${author._id}`}>
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
