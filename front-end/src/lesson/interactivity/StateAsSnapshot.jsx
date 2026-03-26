import React, { useState } from "react";
const CounterWithAlert = () => {
  // 1
  const [count, setCount] = useState(0); //0

  const handleClick = () => {
    setCount(count + 1); // 1
    setCount((prev) => prev + 1); // 2
    setCount((prev) => {
      return prev + 1;
    }); // 3

    // This alert will show the count from when this handler was called,
    // not the updated count
    setTimeout(() => {
      alert(
        // 0
        `You clicked ${count + 1} times, but count was ${count} when this timeout was set!`,
      );
    }, 3000);
  };

  return (
    <div
      style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
    >
      <p>Count: {count}</p>
      <button className="bg-[#333] text-white" onClick={handleClick}>
        Click me and wait 3 seconds
      </button>
    </div>
  );
};

export default function StateAsSnapshot() {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Example 1: Counter with Delayed Alert</h2>
      <CounterWithAlert />
      <p>
        <em>
          Click the button and then quickly click the alert button. Notice the
          alert shows the count at the time the alert was scheduled, not the
          current count!
        </em>
      </p>
    </div>
  );
}
