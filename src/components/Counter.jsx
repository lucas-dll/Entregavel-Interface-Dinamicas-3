import { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  return <section aria-label="Contador" className="panel mt-8 flex flex-wrap items-center justify-between gap-4 p-5">
    <h2 className="font-semibold">Contador</h2>
    <div className="flex items-center gap-3">
      <button className="secondary" aria-label="Diminuir" onClick={() => setCount(value => value - 1)}>−</button>
      <output className="min-w-10 text-center text-xl font-semibold tabular-nums" aria-live="polite">{count}</output>
      <button className="secondary" aria-label="Aumentar" onClick={() => setCount(value => value + 1)}>+</button>
      <button className="ml-2 text-sm text-gray-600 underline underline-offset-4" onClick={() => setCount(0)}>Zerar</button>
    </div>
  </section>;
}
