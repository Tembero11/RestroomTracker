import { useEffect, useState } from "react";

interface IUseApiOptions {
  fetchImmediately: boolean;
}

export default function useApi<T>(
  apiFunc: (...args: any[]) => Promise<T>,
  ...args: any[]
): [T | null, any, boolean, (() => void)] {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function reFetch() {
    setLoading(true);
    apiFunc(...args)
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }

  // Fetch api instantly
  useEffect(() => reFetch(), []);

  return [data, error, loading, reFetch];
}
