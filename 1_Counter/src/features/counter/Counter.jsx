import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
} from "./counterSlice";
import { useState } from "react";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const amountValue = Number(amount) || 0;

  console.log(amountValue);

  const resetAll = () => {
    setAmount(0);
    dispatch(reset());
  };

  return (
    <div>
      <p>The count is {count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <button onClick={() => dispatch(incrementByAmount(amountValue))}>
          Add Amount by {amountValue}
        </button>
        <button onClick={() => dispatch(decrementByAmount(amountValue))}>
          Substract Amount by {amountValue}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // outline: "red solid 1px",
        }}
      >
        <button onClick={() => resetAll()}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
