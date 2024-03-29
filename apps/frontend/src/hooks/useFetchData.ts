import { useState, useEffect } from 'react';

function useFetchData<T>(endpoint: string, dataKey = 'data') {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(Error || null);

  useEffect(() => {
    setIsLoading(true);

    fetch(endpoint)
      .then(response => response.json())
      .then(receivedData => {
        if (receivedData.isError) {
          throw new Error('Error fetching data');
        }

        const formattedData = receivedData[dataKey];
        setData(formattedData);
      })

      .catch(err => {
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
