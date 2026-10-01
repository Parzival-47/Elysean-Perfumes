'use strict';

const fs = require('fs');
const path = require('path');

function loadProducts() {
  const sourcePath = path.join(__dirname, 'public', 'products.js');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const match = source.match(/^\s*window\.ELYSEAN_PRODUCTS\s*=\s*([\s\S]*);\s*$/);

  if (!match) {
    throw new Error('Could not parse public/products.js');
  }

  const products = JSON.parse(match[1]);
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('The Elysean catalogue is empty');
  }

  return Object.freeze(products.map((product) => Object.freeze({
    id: Number(product.id),
    category: String(product.category || 'unisex'),
    reference: String(product.reference || ''),
    variant: String(product.variant || 'Elysean Inspired Interpretation'),
    description: String(product.description || ''),
    notes: String(product.notes || ''),
    concentration: String(product.concentration || 'Eau de Parfum — 20%'),
    price100: Number(product.price100),
  })));
}

const products = loadProducts();
const productsById = new Map(products.map((product) => [product.id, product]));

module.exports = { products, productsById };
