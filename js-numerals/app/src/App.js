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
    const [number, setNumber] = useState(0);

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
            return (
                ones[Math.floor(num / 100)] +
                " hundred " +
                (num % 100 ? " and " + toTens(num % 100) : "")
            );
        } else {
            return toTens(num);
        }
    };

    const toTens = (num) => {
        if (num < 10) return ones[num];
        else if (num >= 10 && num < 20) return teens[num - 10];
        else {
            return tens[Math.floor(num / 10)] + " " + ones[num % 10];
        }
    };

    const toText = (num) => {
        if (num === 0) return "zero";
        else return toMillions(num);
    };

    return (
        <div className="App">
            <input type="number" onChange={onInput} value={number} />
            <h3>{toText(number)}</h3>
        </div>
    );
};

export default App;
