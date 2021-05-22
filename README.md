# Revolut Task


## Description

1. Open the current Revolut app, on either iOS or Android, and navigate to the exchange screen.
2. If the app is not available in your country, you can observe how the application works in this video: https://youtu.be/c0zPSiKYipc?t=29s. (Exchange screen is at the 29th second of the video). 
P.S. It is not required to implement the rates screen (1:05 in the video).
3. Implement the functionality of this screen only in your own custom web widget, using FX rates from any of these sources:
    1. http://www.ecb.int/stats/exchange/eurofxref/html/index.en.html#dev
    2. https://openexchangerates.org/
    3. your preferred source of FX rates.

## Business requirements

1. Refresh the rate every 10s (we do not expect the rate to change every 10s as most free rate sources won't provide live rates).

2. Contain at least three currency accounts with USD, EUR, GBP

3. Make it possible to make an exchange between accounts.

4. Contain two inputs on the exchange screen for both accounts. Each input should be validated to let the user type only numbers with two digits after the dot.

5. Give all the necessary information: exchange rate between active accounts and account balances.

## Tech requirements

1. The app is written in React.
2. Typed JavaScript (we love TypeScript).
3. Test your application with Jest.
4. Use any libraries that you think are a reasonable choice for this task.
5. Don't hesitate to use the latest technologies and design patterns. Only the latest modern browsers (Chrome/Safari) are your limitation.
6. Please make sure your package.json contains:
    1. "start" script -- should launch the app on localhost.
    2. "test" script -- should run tests in your app.

## Implicit requirements

1. The widget must work and produce correct results.
2. Test your app before writing to us that it is ready.
3. The code produced is expected to be of a high standard.
4. You can implement the widget with any design you want, but you should make it look nice.


