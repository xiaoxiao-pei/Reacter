import { AiFillHeart } from "react-icons/ai";

function Icon() {
  return (
    <div style={{ position: "relative" }}>
      <AiFillHeart style={{ color: "red", position: "absolute" }} />
      <AiFillHeart
        style={{ color: "yellow", position: "absolute", left: "-0.5rem" }}
      />
      <AiFillHeart
        style={{ color: "green", position: "absolute", left: "-1rem" }}
      />
    </div>
  );
}
export default Icon;
