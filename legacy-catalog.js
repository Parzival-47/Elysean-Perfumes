'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function arrayLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Missing catalogue marker: ${marker}`);
  const start = source.indexOf('[', markerIndex);
  let depth = 0;
  let quote = '';
  let escaped = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '[') depth += 1;
    if (char === ']') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error('Unterminated regular-shop catalogue');
}

const source = fs.readFileSync(path.join(__dirname, 'public', 'product-page.js'), 'utf8');
const literal = arrayLiteral(source, 'const PRODUCTS =');
const products = vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000 });
const productsById = new Map(products.map((product) => [Number(product.id), product]));

module.exports = { products, productsById };
