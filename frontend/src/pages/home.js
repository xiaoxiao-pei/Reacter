import React, { useEffect, useState } from "react";
// import "../css/home.css";
import Posts from "./Posts";
import Rec_list from "../components/Rec_list";

const Home = () => {
  const [showCover, setShowCover] = useState(true);
  const [isAll, setIsAll] = useState(true);

  const showAll = () => {
    setIsAll(true);
  };

  const showMine = () => {
    setIsAll(false);
  };
  useEffect(() => {
    console.log("time");
    let wait = setTimeout(() => {
      setShowCover(false);
    }, 3000);
    return () => {
      clearTimeout(wait);
    };
  }, []);

  return (
    <div className="home">
      {/* <Header /> */}
      {showCover ? (
        <div className="homeContent">
          <div className="image"></div>

          <div className="text">
            <h3 className="you">You, &nbsp;</h3>{" "}
            <h3 className="me">me &nbsp;</h3>{" "}
            <h3 className="and">and &nbsp;</h3> <h3 className="other">...</h3>
          </div>
        </div>
      ) : (
        <div>
          <div>
            {/* {user.isAdmin ? null :<><h1>
              <span onClick={showMine}>Mine</span>
              <span onClick={showAll}> All</span>
            </h1></>} */}
            <h1>
              <span onClick={showMine}>Mine</span>
              <span onClick={showAll}> All</span>
            </h1>
          </div>
          <Posts isAll={isAll} />
          !userId && <Rec_list />
        </div>
      )}
    </div>
  );
};
export default Home;
