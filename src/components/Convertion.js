import Loader from "./Loader";
import { useConverter } from "./Custom Hooks/useConverter";
import { useKey } from "./Custom Hooks/useKey";

export default function Convertion() {
  // Convertion Fonctionalities
  const {
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
  } = useConverter();

  // KeyPress Managment
  const { inputElm } = useKey("Enter", function () {
    if (document.activeElement === inputElm.current) {
      ConvertCurrency();
    } else {
      inputElm.current.focus();
    }
  });
  useKey("Escape", Swap);

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
