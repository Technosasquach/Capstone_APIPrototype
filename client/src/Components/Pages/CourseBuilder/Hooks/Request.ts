import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRequest = (query: any, dependencies: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(<any>null);

  useEffect(() => {
    setIsLoading(true);
      axios.post("/graphql/", query)
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading, fetchedData];
};