import { Component, createSignal, createEffect } from 'solid-js';

const App: Component = () => {
  const [count, setCount] = createSignal<number>(0);

  const countUp = () => {
    setCount(count() + 1);
  };

  createEffect(() => {
    // 自動検知
    console.log(count());
  });

  return (
    <>
      <div>Count: {count()}</div>
      <button onClick={() => countUp()}>up</button>
    </>
  );
};

export default App;
