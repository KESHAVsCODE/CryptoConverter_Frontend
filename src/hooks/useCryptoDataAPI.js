import { useEffect, useState } from "react";

const useCryptoDataAPI = (endpoint = "crypto", initialParams = {}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [response, setResponse] = useState({});
  const [queryParams, setQueryParams] = useState(initialParams);

  const fetchCryptoData = async () => {
    const queryParamsString = new URLSearchParams(queryParams).toString();
    const apiUrl = `http://localhost:2000/currency/${endpoint}?${queryParamsString}`;
    try {
      setLoading(true);
      setError("");
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message);
      }
      console.log(data);
      setResponse(data?.data);
      setLoading(false);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, [queryParams]);

  return { loading, response, error, setQueryParams };
};

export default useCryptoDataAPI;
