import { useState, useEffect } from 'react';

function userFetchAndFilterData<T>(endpoint: string, dataKey?: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(endpoint)
      .then(response => response.json())
      .then(receivedData => {
        const formattedData = dataKey ? receivedData[dataKey] : receivedData;
        setData(formattedData);
      })
      .catch(err => {
        console.log('Error fetching data:', err);
        setError(err);
        setData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [endpoint, dataKey]);

  return { data, isLoading, error };
}

export default userFetchAndFilterData;
