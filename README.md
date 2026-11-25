# Entregável 3 — Interfaces Dinâmicas e Reativas

Semana 10 — Interatividade e `useState`.

Carrinho de uma papelaria feito com React, Vite e Tailwind CSS.

## Executar

Requer Node.js 20.19+.

```bash
npm install
npm run dev
```

```bash
npm test
npm run build
```

## Funcionalidades

- Contador independente com incremento, decremento e botão de zerar.
- Lista de produtos, adição e remoção de uma unidade por vez com spread operator.
- Quantidade e total atualizados a cada alteração. Valores calculados em centavos.
- Feedback “Adicionado” no botão por 1,4 segundo.
- Checkout: nome vazio ou contendo apenas espaços recebe borda vermelha e mensagem de erro.
- Confirmação visual e limpeza do carrinho após checkout válido.

A compra é uma simulação local, sem pagamento ou envio de dados. Recarregar a página reinicia o estado.

## Reflexão

**Por que não devemos mutar o estado diretamente (ex.: `carrinho.push(item)`) e qual a importância do spread operator (`[...carrinho, item]`) no React?**

`push` modifica o array existente e mantém a mesma referência. Além de alterar o estado de uma renderização anterior, essa operação não chama a função atualizadora. Mesmo passando o mesmo array ao setter, o React pode ignorar a atualização porque compara os valores com `Object.is`.

O spread cria um novo array preservando o anterior. Com `setCart(current => [...current, product])`, o React recebe uma nova referência e pode renderizar a interface com o estado atualizado. A forma funcional usa o estado mais recente, inclusive quando várias atualizações são enfileiradas.

Na remoção, dois trechos produzidos por `slice` são reunidos com spread, sem alterar o array original. O spread faz uma cópia superficial: para editar um objeto dentro do array, também é preciso criar uma cópia desse objeto.

O setter agenda uma nova renderização do componente. O React calcula a interface a partir do novo estado e atualiza no DOM o que mudou, mantendo contador, carrinho e total sincronizados.

## Repositório

https://github.com/lucas-dll/Entregavel-Interface-Dinamicas-3
