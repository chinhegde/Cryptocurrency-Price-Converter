"use strict";

const SHOW = "SHOW_PRICE";
const UPDATE = "UPDATE_USD_PRICE";

let fs = require('fs');
let EventEmitter = require('events');

function readJsonFromFile(fileName) {
  const res = fs.readFileSync(fileName);
  return JSON.parse(res.toString());
  
  throw new Error("***FIXME***  readJsonFromFile not implemented.");
}

class CurrencyConverter extends EventEmitter {

  static calculateRates(usdPrices) {
    let rates = {};
    for (let i in usdPrices) {
      let o = usdPrices[i];
      let sym = o['asset_id_quote'];
      let usdRate = o['rate'];

      rates[`USD-${sym}`] = usdRate;
      rates[`${sym}-USD`] = 1/usdRate;

      for (let j in usdPrices) {
        let p = usdPrices[j];
        let sym2 = p['asset_id_quote'];
        let usdRate2 = p['rate'];
        if (sym !== sym2) {
          rates[`${sym}-${sym2}`] = usdRate2 / usdRate;
          rates[`${sym2}-${sym}`] = usdRate / usdRate2;
        }
      }
    }
    return rates;
  }

  // Prices must be in terms of USD.
  // Filter out date property.
  constructor(coin2USD) {
    super();
    this.rates = this.constructor.calculateRates(coin2USD.rates);

    this.on(SHOW, (o) => {
      if (o['from'] === o['to']) {
        console.log('The "from" and "to" currencies are the same unit.')
        return;
      }
	    let result = this.rates[o['from'].concat('-',o['to'])];
      console.log(`1 ${o['from']} = ${result} ${o['to']}`);

    });

	this.on(UPDATE, (o) => {
      // Given an amount of 1 coin, print out what the equivalent
      // amount of a different coin would be.
      // Sample 'emit' events are given at the end of this file.
    for (let i in coin2USD['rates']){
      if (coin2USD['rates'][i]['asset_id_quote'] === o['sym']){
        coin2USD['rates'][i]['rate'] = 1/o['usdPrice'];
        break;
      }
    }
    this.rates = this.constructor.calculateRates(coin2USD.rates);
    
    });

  }

  convert(amount, fromUnits, toUnits) {
    let tag = `${fromUnits}-${toUnits}`;
    let rate = this.rates[tag];
    if (rate === undefined) {
      throw new Error(`Rate for ${tag} not found`);
    }
    return rate * amount;
  }

}

// All prices listed are in USD
let cnv = new CurrencyConverter(readJsonFromFile('./rates.json'));

console.log(cnv.rates);


// Uncomment the following lines when you have the first part of the lab working.
console.log();

function test(amt, from, to) {
  console.log(`${amt} ${from} is worth ${cnv.convert(amt, from, to)} ${to}.`);
}


test(4000, 'ETH', 'BTC');
test(200, 'BTC', 'EOS');

//


 // Uncomment to test the third part of the lab

cnv.emit(SHOW, {from: "EOS", to: "BTC"});
cnv.emit(SHOW, {from: "EOS", to: "ETH"});
cnv.emit(SHOW, {from: "ETC", to: "ETH"});
cnv.emit(SHOW, {from: "LTC", to: "BTC"});
cnv.emit(UPDATE, {sym: "BTC", usdPrice: 50000});
cnv.emit(SHOW, {from: "LTC", to: "BTC"});

//*/

