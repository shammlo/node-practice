export {};
const calculateTip = (total: number, tipPercent: number = 0.25) => total + total * tipPercent;
const fahrenheitToCelsius = (temp: number) => {
    return (temp - 32) / 1.8;
};

const celsiusToFahrenheit = (temp: number) => {
    return temp * 1.8 + 32;
};

const add = (a: number, b: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative');
            }

            resolve(a + b);
        }, 2000);
    });
};

module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add,
};
