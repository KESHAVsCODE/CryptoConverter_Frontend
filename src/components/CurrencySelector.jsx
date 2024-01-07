/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import useCryptoDataAPI from "../hooks/useCryptoDataAPI";

const CurrencySelector = ({ endpoint, onSelect }) => {
  const { response, loading, error } = useCryptoDataAPI(endpoint);

  const [currencySymbol, setCurrencySymbol] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue);
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedId = selectedOption.id;
    setCurrencySymbol(selectedId);
  };

  useEffect(() => {
    if (response) setCurrencySymbol(response[0]?.symbol);
  }, [response]);

  if (loading) return <p className="px-2 w-full text-center">Loading...</p>;

  if (error)
    return <p className="px-2 w-full text-center text-red-500">error</p>;

  return (
    <div className="px-4 py-2 w-full flex bg-darkBlack rounded-2xl border border-lightGray">
      <p className="font-medium">{currencySymbol}</p>
      <select
        onChange={handleSelectChange}
        className="px-2 w-full bg-darkBlack text-darkGray text-sm outline-none"
      >
        {response.map(({ id, name, symbol }, index) => {
          return (
            <option id={symbol} value={id} key={index} className="px-4 my-2">
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencySelector;
