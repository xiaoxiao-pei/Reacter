import React, { useEffect, useState } from "react";
// import "../css/home.css";
import Posts from "./Posts";
import Rec_list from "../components/Rec_list";
import "../css/App.css";

import { Header } from "../components/Header";

const Home = () => {
  const [showCover, setShowCover] = useState(true);

  useEffect(() => {
    console.log("time");
    let wait = setTimeout(() => {
      setShowCover(false);
    }, 1000);
    return () => {
      clearTimeout(wait);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="home">
        {showCover ? (
          <div className="cover">
            <img src="YMHicon.png" />
          </div>
        ) : (
          <>
            <div>
              <Posts />
            </div>
            <div>
              <Rec_list />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Home;
