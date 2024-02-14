'use client';
import { useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(100);

  return (
    <div>
      <div>Hello React</div>
      <button onClick={() => {setCounter(counter + 1)}}>Count {counter}</button>
    </div>
  );
}
