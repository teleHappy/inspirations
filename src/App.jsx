import { useEffect, useRef } from "react";
import "./App.css";
import useFetchQuote from "./hooks/useFetchQuote";

function App() {
  const { data, isPending, error } = useFetchQuote();
  const targetDiv = useRef(null);

  useEffect(() => {
    if (isPending) {
      targetDiv.current.classList.add("hide");
    } else {
      targetDiv.current.classList.remove("hide");
    }
  }, [isPending]);

  return (
    <>
      <div className="quote" ref={targetDiv}>
        {data && (
          <>
            <h1>{data.quote}</h1>
            <h2>{data.author}</h2>
          </>
        )}
      </div>
    </>
  );
}

export default App;
