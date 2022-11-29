import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("Renders correctly", async () => {
    render(<App />);
    const linkElement = screen.getByText(/Enter a number below:/i);
    expect(linkElement).toBeInTheDocument();
});

test("Check numbers", async () => {
    render(<App />);

    const input = await screen.findAllByTestId(/input/i);

    const numbers = [7, 42, 1999, 2001, 17999, 100001, 342251, 1300420];
    const texts = [
        "seven",
        "forty-two",
        "one thousand nine hundred and ninety-nine",
        "two thousand and one",
        "seventeen thousand nine hundred and ninety-nine",
        "one hundred thousand and one",
        "three hundred and forty-two thousand two hundred and fifty-one",
        "one million three hundred thousand four hundred and twenty",
    ];

    numbers.forEach((number, i) => {
        fireEvent.change(input[0], { target: { value: number } });
        const linkElement = screen.getByText(texts[i]);
        expect(linkElement).toBeInTheDocument();
    });
});
