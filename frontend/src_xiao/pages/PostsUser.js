import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Posts } from "./pages/Posts";

function PostsUser() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.userIsAdmin) {
      navigate("/Login");
    }
  }, []);

  return (
    <>
      <Posts />
    </>
  );
}
export default PostsUser;
