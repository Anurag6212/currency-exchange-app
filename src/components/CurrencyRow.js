import React from "react";

function CurrencyRow(props) {
  const {
    currencyOption,
    selectCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectCurrency} onChange={onChangeCurrency}>
        {currencyOption.map((option) => (
          <option keys={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyRow;
