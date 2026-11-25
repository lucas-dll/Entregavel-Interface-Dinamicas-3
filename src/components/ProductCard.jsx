import { useEffect, useRef, useState } from 'react';
export default function ProductCard({ product, onAdd, money }) {
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  function add() {
    onAdd(product); setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  }
  return <article className="panel overflow-hidden">
    <div className="flex h-36 items-center justify-center bg-slate-50 text-6xl" aria-hidden="true">{product.icon}</div>
    <div className="p-5">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{product.description}</p>
      <p className="mb-4 mt-4 text-xl font-semibold tabular-nums">{money(product.price)}</p>
      <button onClick={add} aria-label={`Adicionar ${product.name}`} className={`w-full rounded-xl px-3 py-2.5 font-medium ${added ? 'bg-emerald-100 text-emerald-800' : 'bg-brand text-white hover:bg-emerald-900'}`}>
        <span aria-live="polite">{added ? '✓ Adicionado' : 'Adicionar'}</span>
      </button>
    </div>
  </article>;
}
