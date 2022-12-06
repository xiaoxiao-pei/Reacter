import { useRef } from "react";
// import { useContext } from "react";
import "../css/posts.css";
export const Cre_post = () => {
  const postTitleRef = useRef();
  const postContentRef = useRef();
  const userId = localStorage.getItem("userId");

  //   const [
  //     isLoggedIn,
  //     setIsLoggedIn,
  //     startTime,
  //     setStartTime,
  //     isTimeOut,
  //     setIsTimeOut,
  //     ifRegister,
  //     setIfRegister,
  //     ifLogout,
  //     setIfLogout,
  //   ] = useContext(LoggedInContext);

  const handleSubmit = async (event) => {
    console.log("subit");
    event.preventDefault(); // prevent page
    let response = await fetch("http://localhost:3001/posts/create", {
      method: "POST",
      body: JSON.stringify({
        postTitle: postTitleRef.current.value,
        postContent: postContentRef.current.value,
        userId: userId,
        postTime: new Date().toLocaleTimeString(),
        postLikes: 0,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    });
    let data = await response.json();
    console.log(data);
    // console.log(passwordRef);
    alert(JSON.stringify(data));
    // json ? setIsLoggedIn(true) : setIsLoggedIn(false);
    // if (json.success) {
    //   setStartTime(new Date().getTime());
    //   setIsLoggedIn(true);
    //   setIfLogout(true);
    // } else {
    //   setIsLoggedIn(false);
    // }
  };

  return (
    <div className="addPost">
      {/* {isTimeOut ? (
      <p style={{ textAlign: "center" }}>
        Your time is out, please login again!
      </p>
      ) : null} */}

      <form className="addPostForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="postTitle">Post Title: </label>
          <input id="postTitle" type="text" ref={postTitleRef} required />
        </div>
        <div className="form-row">
          <label htmlFor="postContent">Post Content: </label>
          <textarea
            id="postContent"
            type="text"
            ref={postContentRef}
            required
          />
        </div>

        <div className="form-row">
          <button type="submit">Submit</button>
        </div>
      </form>
      {/* <div style={{ textAlign: "center" }}>
        No account? <span onClick={showRegister}>Register here</span>
      </div> */}
    </div>
  );
};
