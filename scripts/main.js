/** 
 Este ficheiro cria os objetos (instâncias) a partir dos moldes:

const store = new Store();

const cart = new Cart();

Depois de criados, o main.js usa os métodos desses objetos (ex: store.list(), cart.add(), cart.total()) para fazer o site funcionar. */

import { Store } from './store-data.js';
import { Cart } from './cart.js';
import { formatPrice } from './utils.js';

const store = new Store();
const cart = new Cart();

const booksGrid = document.getElementById('booksGrid');
const bookTpl = document.getElementById('bookTpl');
const badge = document.getElementById('badge');
const cartPanel = document.getElementById('cartPanel');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const btnCart = document.getElementById('btnCart');
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const sortBy = document.getElementById('sortBy');
const btnClearFilters = document.getElementById('btnClearFilters');
const catalogSubtitle = document.getElementById('catalogSubtitle');

function renderBooks(list){
  booksGrid.innerHTML = '';
  list.forEach(book => {
    const node = bookTpl.content.cloneNode(true);
    node.querySelector('.cover').src = book.image;
    node.querySelector('.title').textContent = book.title;
    node.querySelector('.author').textContent = book.author;
    node.querySelector('.desc').textContent = book.summary;
    node.querySelector('.price').textContent = formatPrice(book.price);
    const btn = node.querySelector('.add');
    btn.addEventListener('click', () => {
      cart.add(book);
      renderCart();
      updateBadge();
    });
    booksGrid.appendChild(node);
  });
}

function renderCart(){
  cartList.innerHTML = '';
  const items = cart.list();
  if(items.length === 0){
    cartList.innerHTML = '<p class="muted">Carrinho vazio</p>';
  } else {
    items.forEach(it => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `<div><strong>${it.title}</strong><div class="muted small">${it.author}</div></div>
                       <div><span class="muted">${formatPrice(it.price)}</span><div><button class="btn outline remove">Remover</button></div></div>`;
      div.querySelector('.remove').addEventListener('click', () => {
        cart.remove(it.id);
        renderCart();
        updateBadge();
      });
      cartList.appendChild(div);
    });
  }
  cartTotal.textContent = formatPrice(cart.total());
}

function updateBadge(){
  const count = cart.count();
  badge.textContent = count;
  if(count === 0) badge.classList.add('hidden'); else badge.classList.remove('hidden');
}

btnCart.addEventListener('click', () => {
  cartPanel.scrollIntoView({behavior:'smooth'});
});

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = store.list().filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  catalogSubtitle.textContent = filtered.length + ' resultados';
  renderBooks(filtered);
});

filterCategory.addEventListener('change', () => applyFilters());
sortBy.addEventListener('change', () => applyFilters());
btnClearFilters.addEventListener('click', () => {
  filterCategory.value = 'all';
  sortBy.value = 'popular';
  renderBooks(store.list());
  catalogSubtitle.textContent = 'Explore nossa seleção';
});

function applyFilters(){
  let list = store.list();
  if(filterCategory.value !== 'all'){
    list = list.filter(b => b.category === filterCategory.value);
  }
  if(sortBy.value === 'price_asc') list = list.sort((a,b)=>a.price-b.price);
  if(sortBy.value === 'price_desc') list = list.sort((a,b)=>b.price-a.price);
  renderBooks(list);
}

// checkout: basic simulated flow (opens printable receipt)
document.getElementById('btnCheckout').addEventListener('click', () => {
  if(cart.count() === 0){ alert('Carrinho vazio'); return; }
  const total = cart.total();
  const items = cart.list().map(i=>`<li>${i.title} — ${formatPrice(i.price)}</li>`).join('');
  const w = window.open('', '_blank');
  w.document.write(`<html><head><title>Recibo</title><style>body{font-family:Arial;padding:20px}</style></head><body>
    <h2>Recibo — BookVerse</h2>
    <p>Data: ${new Date().toLocaleString()}</p>
    <ul>${items}</ul>
    <p><strong>Total: ${formatPrice(total)}</strong></p>
    <script>window.print()</script>
  </body></html>`);
  cart.clear();
  renderCart();
  updateBadge();
});

// initial render
renderBooks(store.list());
renderCart();
updateBadge();
