import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=623904b06511be8c7529b707825535e9";
function App() {
  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);
  // http://api.exchangeratesapi.io/v1/latest?access_key=623904b06511be8c7529b707825535e9&symbols=USD,AUD,CAD,PLN,MXN&format=1
  let toAmount, fromAmount;
  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  useEffect(() => {
    axios.get(BASE_URL).then((response) => {
      const firstCurrency = Object.keys(response.data.rates)[0];
      setCurrencyOption([
        response.data.base,
        ...Object.keys(response.data.rates),
      ]);
      setFromCurrency(response.data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(response.data.rates[firstCurrency]);
    });
  }, []);
  // Subscription Plan needed to Update currencies.
  // useEffect(() => {
  //   if (fromCurrency != null && toCurrency != null) {
  //     axios
  //       .get(
  //         `http://api.exchangeratesapi.io/v1/convert?access_key=623904b06511be8c7529b707825535e9&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
  //       )
  //       .then((response) => setExchangeRate(response.data.rates[toCurrency]));
  //   }
  // }, [fromCurrency, toCurrency, amount]);
  //https://api.exchangeratesapi.io/v1/convert?access_key=623904b06511be8c7529b707825535e9&from=${fromCurrency}&to=${toCurrency}&amount=${amount}
  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountFromCurrency(true);
  };
  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountFromCurrency(false);
  };
  return (
    <div className="App">
      <h1>Convert</h1>
      <CurrencyRow
        currencyOption={currencyOption}
        selectCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOption={currencyOption}
        selectCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
