import { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import useCryptoDataAPI from "../hooks/useCryptoDataAPI";

const CurrencyConverter = () => {
  const [cryptoCurrencyId, setCryptoCurrencyId] = useState("1");
  const [fiatCurrencyId, setFiatCurrencyId] = useState("2781");

  const [cryptoCurrencyValue, setCryptoCurrencyValue] = useState("1");
  const [fiatCurrencyValue, setFiatCurrencyValue] = useState("");

  const { response, loading, error, setQueryParams } = useCryptoDataAPI(
    "conversion/crypto-to-fiat",
    {
      id: "1",
      convert_id: "2781",
      amount: "1",
    }
  );

  useEffect(() => {
    setFiatCurrencyValue(response.price);
  }, [response, loading, error]);

  const handleConversion = () => {
    const newParams = {
      id: cryptoCurrencyId,
      convert_id: fiatCurrencyId,
      amount: cryptoCurrencyValue,
    };
    setQueryParams(newParams);
  };

  const handleCryptoCurrencyChange = (selectedValue) => {
    setCryptoCurrencyId(selectedValue);
  };

  const handleFiatCurrencyChange = (selectedValue) => {
    setFiatCurrencyId(selectedValue);
  };

  return (
    <div className="text-lightGray bg-extraLightBlack border border-lightGray rounded-xl">
      <h1 className="px-4 py-3 text-lg text-[#aaa] font-medium border-b border-lightGray">
        Currency Converter
      </h1>

      <div className="p-4 flex flex-col gap-2">
        <div className="p-2 flex justify-between  gap-2 bg-lightBlack rounded-2xl">
          <input
            type="text"
            value={cryptoCurrencyValue}
            onChange={(e) => setCryptoCurrencyValue(e.target.value)}
            className="w-full px-4  bg-[#2a2a2a] rounded-2xl outline-none"
          />
          <CurrencySelector
            endpoint="crypto"
            onSelect={handleCryptoCurrencyChange}
          />
        </div>
        <div className="p-2 flex justify-between  gap-2 bg-lightBlack rounded-2xl">
          <input
            type="text"
            disabled
            value={fiatCurrencyValue}
            className="w-full px-4  bg-[#2a2a2a] rounded-2xl outline-none"
          />
          <CurrencySelector
            endpoint="fiat"
            onSelect={handleFiatCurrencyChange}
          />
        </div>

        {!loading ? (
          <button onClick={handleConversion}>Convert</button>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>

      {true && <p className="px-4  text-center text-red-500 py-2">{error}</p>}
    </div>
  );
};

export default CurrencyConverter;
