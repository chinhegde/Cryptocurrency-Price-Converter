# Cryptocurrency-Price-Converter
Exploring features of JavaScript through Cryptocurrency Price Converter

The Currency Converter application is a command line tool that converts cryptocurrency prices in USD to other popular cryptocurrencies. The application has three parts:

* `rates.json`: contains the prices for several popular cryptocurrencies in terms of US dollars (USD).
* `currencyConverter.js`: contains the implementation of the `CurrencyConverter` class that performs the conversion.
* `index.js`: contains the code that reads in the rates.json file and creates a new instance of the CurrencyConverter class.

## Part 1: Parsing JSON Data

Reading the `rates.json` file and parsing it into a JavaScript object using the `readJsonFromFile` function in the `currencyConverter.js` file. The `readJsonFromFile` function uses the `fs.readFileSync` method to read the contents of the file and then `JSON.parse` to convert the data to a JavaScript object.

## Part 2: Calculate Pricing Information

Calculating the pricing information for the different cryptocurrencie using the `calculateRates` method in the `CurrencyConverter` class.

The `calculateRates` method adds the conversion rates between different cryptocurrencies based on the USD values of both currencies.

For example, if the USD price of BTC is known and the USD price of ETH is known, the BTC-ETH exchange rate can be calculated by dividing the USD price of BTC by the USD price of ETH.

## Part 3: Adding Event Handlers

Adding event handlers to the CurrencyConverter class.

The `CurrencyConverter` class is a subclass of EventEmitter, which means it can use the on method to register event listeners and the emit method to trigger an event.

Two event listeners are added in this part of the application:

* The "SHOW_PRICE" event listener prints out the exchange rate between two currencies specified in the event arguments.
* The "UPDATE_USD_PRICE" event listener updates the USD price for a specified cryptocurrency, which in turn updates the exchange rates for that cryptocurrency with all other cryptocurrencies.
