import React, { useState, useEffect } from "react";

export default function useFetchQuote() {
  const getRandom = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const [random, setRandom] = useState(getRandom());
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let randomTimer;
    let responseTimer;

    const fetchQuote = async () => {
      setIsPending(true);

      try {
        const res = await fetch(`http://localhost:3000/${random}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();

        responseTimer = setTimeout(() => {
          setIsPending(false);
          setData(data);
          setError(null);
          clearTimeout(responseTimer);
        }, 1000);
      } catch (err) {
        setIsPending(false);
        setError("Could not fetch the data");
      }
    };

    fetchQuote();
    clearTimeout(randomTimer);

    randomTimer = setTimeout(() => {
      let currentRandom = random;
      let newRandom = getRandom();
      while (currentRandom === newRandom) {
        newRandom = getRandom();
      }
      setRandom(newRandom);
    }, 8000);

    return () => clearTimeout(randomTimer);
  }, [random]);

  return { data, isPending, error };
}
