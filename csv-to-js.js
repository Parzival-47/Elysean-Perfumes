// csv-to-js.js
// Converts products-full.csv into products-updated.js
// Run with: node csv-to-js.js

const fs = require('fs');

function parseCSVLine(line) {
    // Proper CSV parser handling quoted fields with embedded commas
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Escaped quote inside quoted field
                current += '"';
                i++; // skip the next quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current); // push the last value
    return values;
}

function cleanPrice(val) {
    if (!val) return 0;
    // Remove quotes and commas from numbers like "1,014"
    const cleaned = val.toString().replace(/[",]/g, '').trim();
    return parseInt(cleaned, 10) || 0;
}

function csvToProducts(csvPath = 'products-full.csv') {
    const csv = fs.readFileSync(csvPath, 'utf8');

    // Normalize line endings (handles \r\n from Excel/Windows)
    const lines = csv.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n');

    const headers = parseCSVLine(lines[0]).map(h => h.trim());
    const products = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue; // skip blank lines

        const values = parseCSVLine(line);
        const row = {};

        headers.forEach((header, index) => {
            row[header] = (values[index] || '').trim();
        });

        const product = {
            id: parseInt(row.id, 10) || 0,
            cat: row.cat || '',
            name: row.name || '',
            type: row.Type || row.type || '', // ← NEW: Type field included
            brand: row.brand || 'Elysean Perfumes',
            desc: row.desc || '',
            notes: row.notes
                ? row.notes.split(',').map(n => n.trim()).filter(Boolean)
                : [],
            conc: row.conc || 'Eau de Parfum — 20%',
            img: row.img || '',
            sizes: [
                { ml: 'Sample', label: '', price: cleanPrice(row.sample_price) || 40 },
                { ml: '30ml',   label: '', price: cleanPrice(row['30ml_price']) },
                { ml: '50ml',   label: '', price: cleanPrice(row['50ml_price']) },
                { ml: '100ml',  label: '', price: cleanPrice(row['100ml_price']) },
                { ml: '250ml',  label: '', price: cleanPrice(row['250ml_price']) }
            ]
        };

        products.push(product);
    }

    // Generate the JS file content
    const jsCode = `const PRODUCTS = ${JSON.stringify(products, null, 4)};\n`;

    fs.writeFileSync('products-updated.js', jsCode);

    console.log(`✅ Successfully converted ${products.length} products!`);
    console.log(`   File created: products-updated.js`);
    console.log(`   "type" field has been included for every product.`);

    // Quick sanity check on the first product
    if (products.length > 0) {
        console.log('\n📋 Sample of first product:');
        console.log(JSON.stringify(products[0], null, 2));
    }
}

csvToProducts();

