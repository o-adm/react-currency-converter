import { useState, useCallback, useEffect } from "react";

const API_URL = `https://api.frankfurter.app`;

export function useConverter() {
  const [fromInput, setFromInput] = useState(1);
  const [toInput, setToInput] = useState("");
  const [selectFromInput, setSelectFromInput] = useState("EUR");
  const [selectToInput, setSelectToInput] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

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

  return {
    isLoading,
    fromInput,
    setFromInput,
    toInput,
    setToInput,
    selectFromInput,
    setSelectFromInput,
    selectToInput,
    setSelectToInput,
    ConvertCurrency,
    Swap,
    currencies,
  };
}
