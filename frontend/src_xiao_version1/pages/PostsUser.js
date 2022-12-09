import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Posts } from "./pages/Posts";
import "../css/posts.css";

function PostsUser() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.userIsUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="InDisplay">
      <Posts />
    </div>
  );
}
export default PostsUser;
