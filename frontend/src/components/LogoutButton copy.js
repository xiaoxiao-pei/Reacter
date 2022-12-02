import { ThemeContext } from "../App";
import React from 'react';
import Button from 'react-bootstrap/Button';


function ThemeButton() {

    const [isBasic, setIsBasic] = React.useContext(ThemeContext);

    const handler = (event) => {
        isBasic ? alert("Basic Theme") : alert("Fancy Theme");
    }

    return (
        <div>
            {
                isBasic
                    ? <button onclick={handler}  >Basic button</button>
                    : <Button variant="primary" onclick={handler}  > bootstrap button</Button>
            }
        </div>
    );
};

export default ThemeButton;
