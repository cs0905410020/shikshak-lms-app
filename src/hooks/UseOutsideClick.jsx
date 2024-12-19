import { useEffect } from "react";
import $ from 'jquery';
const UseOutsideClick = (ref,preventElementArray = [], callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target) && !$(e.target).closest(preventElementArray.toString()).length) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });
};

export default UseOutsideClick;