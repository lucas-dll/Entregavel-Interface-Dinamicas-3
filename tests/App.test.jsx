import { test, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App.jsx';

test('contador incrementa, decrementa e zera', async () => {
  const user = userEvent.setup(); render(<App />);
  const counter = within(screen.getByRole('region', { name: 'Contador' }));
  await user.click(counter.getByRole('button', { name: 'Aumentar' }));
  expect(counter.getByRole('status')).toHaveTextContent('1');
  await user.click(counter.getByRole('button', { name: 'Diminuir' }));
  expect(counter.getByRole('status')).toHaveTextContent('0');
  await user.click(counter.getByRole('button', { name: 'Aumentar' }));
  await user.click(counter.getByRole('button', { name: 'Zerar' }));
  expect(counter.getByRole('status')).toHaveTextContent('0');
});

test('adiciona repetidos, atualiza total e remove uma unidade por vez', async () => {
  const user = userEvent.setup(); render(<App />);
  const add = screen.getByRole('button', { name: 'Adicionar Caderno' });
  await user.click(add); expect(add).toHaveTextContent('Adicionado');
  await user.click(add);
  expect(screen.getByTestId('total')).toHaveTextContent('49,80');
  await user.click(screen.getByRole('button', { name: 'Remover uma unidade de Caderno' }));
  expect(screen.getByTestId('total')).toHaveTextContent('24,90');
  await user.click(screen.getByRole('button', { name: 'Remover uma unidade de Caderno' }));
  expect(screen.getByText('Seu carrinho está vazio.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Finalizar pedido' })).toBeDisabled();
});

test('valida nome vazio e espaços, corrige o erro e finaliza', async () => {
  const user = userEvent.setup(); render(<App />);
  await user.click(screen.getByRole('button', { name: 'Adicionar Caderno' }));
  const submit = screen.getByRole('button', { name: 'Finalizar pedido' });
  const name = screen.getByRole('textbox', { name: 'Nome' });
  await user.click(submit);
  expect(name).toHaveAttribute('aria-invalid', 'true');
  expect(name).toHaveClass('border-red-500');
  expect(screen.getByRole('alert')).toHaveTextContent('Informe seu nome.');
  await user.type(name, '   '); await user.click(submit);
  expect(name).toHaveAttribute('aria-invalid', 'true');
  await user.clear(name); await user.type(name, 'Ana');
  expect(name).toHaveAttribute('aria-invalid', 'false');
  await user.click(submit);
  expect(screen.getByText('Pedido confirmado, Ana!')).toBeInTheDocument();
  expect(screen.getByTestId('total')).toHaveTextContent('0,00');
});
