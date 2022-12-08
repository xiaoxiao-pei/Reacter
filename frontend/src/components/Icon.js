import { AiFillHeart } from "react-icons/ai";

function Icon() {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <AiFillHeart style={{ color: "red" }} />
        <AiFillHeart
          style={{ color: "yellow", position: "relative", left: "-0.5rem" }}
        />
        <AiFillHeart
          style={{ color: "green", position: "relative", left: "-1rem" }}
        />
      </div>
      <div>
        <span style={{ color: "red" }}>
          <b>Y</b>
        </span>
        <span style={{ color: "yellow" }}>
          <b>M</b>
        </span>
        <span style={{ color: "green" }}>
          <b>H</b>
        </span>
      </div>
    </div>
  );
}
export default Icon;
