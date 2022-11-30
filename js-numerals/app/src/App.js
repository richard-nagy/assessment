import React, { useState } from "react";
import "./App.css";

const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
];

const App = () => {
    const [number, setNumber] = useState("");

    const onInput = (e) => {
        setNumber(e.target.value);
    };

    const toMillions = (num) => {
        if (num >= 1000000) {
            return toMillions(Math.floor(num / 1000000)) + " million " + toThousands(num % 1000000);
        } else {
            return toThousands(num);
        }
    };

    const toThousands = (num) => {
        if (num >= 1000) {
            return toHundreds(Math.floor(num / 1000)) + " thousand " + toHundreds(num % 1000);
        } else {
            return toHundreds(num);
        }
    };

    const toHundreds = (num) => {
        if (num > 99) {
            return ones[Math.floor(num / 100)] + " hundred " + toTens(num % 100);
        } else {
            return toTens(num);
        }
    };

    const toTens = (num) => {
        if (num < 10 && num > 0) {
            return " and " + ones[num];
        }
        if (num < 10) {
            return "";
        } else if (num >= 10 && num < 20) {
            return " and " + teens[num - 10];
        } else {
            return " and " + tens[Math.floor(num / 10)] + "-" + ones[num % 10];
        }
    };

    const toText = (number) => {
        if (isNaN(number)) {
            return <span className="warning">Input can only contain numbers!</span>;
        } else if (number === 0) {
            return 0;
        } else if (!number) {
            return "...";
        }

        const num = parseInt(number);
        if (number === 0) return "zero";

        let result = toMillions(num);

        // There might be unnecessary characthers or words left
        // We filter them out with the code belove
        if (result.startsWith(" and ")) {
            result = result.substring(4);
        }
        if (result.endsWith("-")) {
            result = result.substring(0, result.length - 1);
        }
        if (result.endsWith(" and ")) {
            result = result.substring(0, result.length - 5);
        }
        result = result.replace("- ", " ");

        return result;
    };

    return (
        <div className="App">
            <div>
                <h1>Enter a number below:</h1>
                <input data-testid="input" className="input" onChange={onInput} value={number} />
                <div className="text">{toText(number)}</div>
            </div>
        </div>
    );
};

export default App;
