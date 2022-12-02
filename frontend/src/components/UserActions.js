function UserActions(props) {
    const handelOnClick = () => {
        props.setColor(props.color === "blue" ? "red" : (props.color === 'red' ? "green" : "blue"));
        props.setCount(props.count + 1)
    };
    const buttonStyle={
        backgroundColor: "blue",
        border: "none",
        color: "white",
        padding: "15px 32px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
    }
    return <button style = {buttonStyle} onClick={handelOnClick}>
        Click me React
    </button>
}
export default UserActions;