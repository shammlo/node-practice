const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

describe('Math', () => {
    test('Should calculate the tip correctly', () => {
        const total = calculateTip(10, 0.3);

        expect(total).toBe(13);
    });

    test('Should calculate the default tip', () => {
        const total = calculateTip(10);
        expect(total).toBe(12.5);
    });
});
describe('Convert temperature', () => {
    it('should convert the temperature from fahrenheit to celsius', () => {
        const temp = fahrenheitToCelsius(32);
        expect(temp).toBe(0);
    });
    it('should convert the temperature from celsius to fahrenheit', () => {
        const temp = celsiusToFahrenheit(0);
        expect(temp).toBe(32);
    });
});

describe('Async/await', () => {
    it('should add 2 numbers and wait for the result', async () => {
        const sum = await add(1, 2);
        expect(sum).toBe(3);
    });
});
