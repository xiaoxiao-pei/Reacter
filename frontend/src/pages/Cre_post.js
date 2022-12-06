import { useRef } from "react";
// import { useContext } from "react";

export const Cre_post = () => {
  const postTitleRef = useRef();
  const postContentRef = useRef();
  ("userId");

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
  };

  return (
    <div>
      {/* {isTimeOut ? (
      <p style={{ textAlign: "center" }}>
        Your time is out, please login again!
      </p>
      ) : null} */}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="postTitle">Post Title: </label>
          <input id="postTitle" type="text" ref={postTitleRef} required />
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
