import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
}

interface Item {
  tasks: Task[];
}

interface Num {
  a: number | null;
  b: number | null;
}

function ToDoList({ tasks }: Item) {
  const [data, setData] = useState<Num>({
    a: null,
    b: null,
  });
  const [result, setResult] = useState<number | null>(null);

  const add = (a: number | null, b: number | null) => {
    if (a !== null && b !== null) {
      return a + b;
    }
    return null;
  };

  const handleCalculate = () => {
    const sum = add(data.a, data.b);
    setResult(sum);
  };

  return (
    <div>
      {tasks.map((task) => (
        <ul key={task.id}>
          <li>{task.id}</li>
          <li>{task.title}</li>
        </ul>
      ))}
      <input
        type="text"
        onChange={(e) => setData((prev) => ({ ...prev, a: +e.target.value }))}
      />
      <input
        type="text"
        onChange={(e) => setData((prev) => ({ ...prev, b: +e.target.value }))}
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
}

export default ToDoList;
