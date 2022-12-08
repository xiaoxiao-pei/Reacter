import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Posts } from "./pages/Posts";

function PostsAdmin() {
  const user = localStorage.getItem("user");
  user = JSON.parse(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.userIsAdmin) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Posts />
    </>
  );
}
export default PostsAdmin;
