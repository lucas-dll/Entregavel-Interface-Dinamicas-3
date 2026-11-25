import { useState } from 'react';
import Counter from './components/Counter.jsx';
import ProductCard from './components/ProductCard.jsx';

const products = [
  { id: 1, name: 'Caderno', description: 'Capa dura · 80 folhas', price: 2490, icon: '📓' },
  { id: 2, name: 'Canetas', description: 'Conjunto com 3 unidades', price: 1290, icon: '🖊️' },
  { id: 3, name: 'Lápis', description: 'Conjunto com 6 unidades', price: 990, icon: '✏️' },
  { id: 4, name: 'Marcadores', description: 'Conjunto com 4 cores', price: 1890, icon: '🖍️' },
];
const money = cents => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function App() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const cartProducts = products.filter(product => cart.some(item => item.id === product.id));
  function add(product) {
    setCart(current => [...current, product]);
    setConfirmation('');
  }
  function remove(id) {
    setCart(current => {
      const index = current.findIndex(item => item.id === id);
      return index === -1 ? current : [...current.slice(0, index), ...current.slice(index + 1)];
    });
  }
  function checkout(event) {
    event.preventDefault();
    if (!cart.length) return;
    if (!name.trim()) { setError(true); return; }
    setConfirmation(`Pedido confirmado, ${name.trim()}!`);
    setCart([]); setName(''); setError(false);
  }
  return <>
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <h1 className="text-xl font-bold tracking-tight">Papelaria<span className="text-brand">.</span></h1>
        <a href="#carrinho" className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">Carrinho <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-white">{cart.length}</span></a>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        <section aria-labelledby="products-title">
          <h2 id="products-title" className="mb-5 text-2xl font-semibold tracking-tight">Produtos</h2>
          <div className="grid gap-4 sm:grid-cols-2">{products.map(product => <ProductCard key={product.id} product={product} onAdd={add} money={money} />)}</div>
          <Counter />
        </section>
        <section id="carrinho" aria-labelledby="cart-title" className="panel scroll-mt-5 p-6 lg:sticky lg:top-6">
          <h2 id="cart-title" className="text-xl font-semibold">Seu carrinho</h2>
          {cart.length === 0 ? <p className="py-8 text-sm text-gray-500">Seu carrinho está vazio.</p> :
            <ul className="my-5 divide-y divide-gray-100">{cartProducts.map(product => {
              const quantity = cart.filter(item => item.id === product.id).length;
              return <li key={product.id} className="flex items-center justify-between gap-3 py-4">
                <div><h3 className="text-sm font-medium">{product.name}</h3><p className="mt-1 text-sm text-gray-500">{quantity} × {money(product.price)}</p></div>
                <button className="secondary text-sm" aria-label={`Remover uma unidade de ${product.name}`} onClick={() => remove(product.id)}>−</button>
              </li>;
            })}</ul>}
          <div className="flex justify-between border-t border-gray-200 py-5 font-semibold"><span>Total</span><span data-testid="total" aria-live="polite" className="text-xl tabular-nums">{money(total)}</span></div>
          <form onSubmit={checkout} noValidate>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">Nome</label>
            <input id="name" name="name" autoComplete="name" placeholder="Seu nome" value={name} aria-required="true" aria-invalid={error} aria-describedby={error ? 'name-error' : undefined}
              onChange={event => { setName(event.target.value); if (event.target.value.trim()) setError(false); }}
              className={`w-full rounded-xl border bg-white px-3 py-3 ${error ? 'border-red-500' : 'border-gray-300'}`} />
            {error && <p id="name-error" role="alert" className="mt-2 text-sm text-red-600">Informe seu nome.</p>}
            <button type="submit" disabled={!cart.length} className="primary mt-4 w-full">Finalizar pedido</button>
          </form>
          <div role="status" aria-live="polite">{confirmation && <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{confirmation}</p>}</div>
        </section>
      </div>
    </main>
  </>;
}
