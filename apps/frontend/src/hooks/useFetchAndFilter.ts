import { useState, useEffect } from 'react';

function useFetchData<T>(endpoint: string, dataKey?: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(Error || null);

  useEffect(() => {
    setIsLoading(true);

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        return response.json();
      })

      .then(receivedData => {
        const formattedData = dataKey ? receivedData[dataKey] : receivedData;
        setData(formattedData);
      })

      .catch(err => {
        console.log(`Error ftching data: ${err}`);
        setIsLoading(false);
        setError(err);
        setData([]);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }, [endpoint, dataKey]);
  return { data, isLoading, error };
}

export default useFetchData;
