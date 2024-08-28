// API => https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "./Loader";

const API_URL = `https://api.frankfurter.app`;

export default function Convertion() {
  const [fromInput, setFromInput] = useState(1);
  const [toInput, setToInput] = useState("");
  const [selectFromInput, setSelectFromInput] = useState("EUR");
  const [selectToInput, setSelectToInput] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const inputElm = useRef(null);

  // Handle Convert Currencies - we use callback bcs normal function when we called it inside an effect not work
  const ConvertCurrency = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      async function fetchCurrencies() {
        try {
          setIsLoading(true);

          // delay next part execution
          await new Promise((resolve) => setTimeout(resolve, 3000)); //3-second delay

          const res = await fetch(
            `${API_URL}/latest?amount=${fromInput}&from=${selectFromInput}&to=${selectToInput}`
          );
          const data = await res.json();
          setToInput(data.rates[selectToInput]);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (selectFromInput === selectToInput) return setToInput(fromInput);

      fetchCurrencies();
    },
    [fromInput, selectFromInput, selectToInput]
  );

  // Swap Currencies
  function Swap() {
    const currentFromInput = fromInput;
    const currentToInput = toInput;
    const currentSelectFromInput = selectFromInput;
    const currentSelectToInput = selectToInput;

    setFromInput(currentToInput);
    setToInput(currentFromInput);
    setSelectFromInput(currentSelectToInput);
    setSelectToInput(currentSelectFromInput);
  }

  // Fech Currencies
  useEffect(function () {
    async function fetchCurrencies() {
      try {
        const res = await fetch(`${API_URL}/currencies`);
        const data = await res.json();
        // Object.keys : Get Object Keys
        setCurrencies(Object.keys(data));
        // console.log(Object.keys(data));
      } catch (err) {
        console.log("Error fetching currencies:", err.message);
      }
    }
    fetchCurrencies();
  }, []);

  // Focus on Input When Enter Was Pressed
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Enter") {
          console.log("enter");
          if (document.activeElement === inputElm.current) {
            ConvertCurrency();
          } else {
            inputElm.current.focus();
          }
        }
      }
      document.addEventListener("keydown", callback);

      return () => {
        document.removeEventListener("keydown", callback);
      };
    },
    [ConvertCurrency]
  );

  return (
    <div className="convertion">
      {isLoading && <Loader />}
      <div
        className="conversion-box"
        style={isLoading ? { opacity: "0.2" } : {}}
      >
        <div className="conversion__item">
          <label>From</label>
          <div className="conversion__item__input">
            <input
              type="number"
              value={fromInput}
              min={1}
              onChange={(e) => setFromInput(Number(e.target.value))}
              ref={inputElm}
              disabled={isLoading}
            />
            <select
              value={selectFromInput}
              onChange={(e) => setSelectFromInput(e.target.value)}
              disabled={isLoading}
            >
              {currencies.map((currency) => (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <span
          rule="button"
          className="swap"
          onClick={Swap}
          disabled={isLoading}
        >
          Swap
        </span>
        <div className="conversion__item">
          <label>to</label>
          <div className="conversion__item__input">
            <input
              type="number"
              value={toInput}
              onChange={(e) => setToInput(Number(e.target.value))}
              disabled={true}
            />
            <select
              value={selectToInput}
              onChange={(e) => setSelectToInput(e.target.value)}
            >
              {currencies.map((currency) => (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="button" className="btn-convert" onClick={ConvertCurrency}>
          Convert {selectFromInput} to {selectToInput}
        </button>
      </div>
    </div>
  );
}
