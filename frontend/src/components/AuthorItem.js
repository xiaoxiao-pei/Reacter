import { Link } from "react-router-dom";

function AuthorItem({ author }) {
  return (
    <>
      <tr>
        <td>
          <span
            style={{
              backgroundImage: `url(http://localhost:3001/getImg/${author.authorPhoto})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></span>
        </td>
        <td>
          <Link to={`/admin/profile/${author}`}>username</Link>
        </td>
        <td>email</td>''
        <td>
          <Link to={`/admin/post/${author.id}`}>post count</Link>
        </td>
      </tr>
    </>
  );
}
export default AuthorItem;
