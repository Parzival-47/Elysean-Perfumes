const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c=require('./sample-core.js'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync(__dirname+'/sample-products.js','utf8'),ctx);
const products=Array.from(ctx.window.ELYSEAN_PRODUCTS);
assert(products.length>200);assert.equal(new Set(products.map(p=>p.id)).size,products.length);
for(const value of [null,undefined,'','4','3foo','03','__proto__','constructor'])assert.equal(c.bundle(value),null);
for(const size of [3,5]){
 const b=c.bundle(String(size));assert.equal(b.price,size===3?219:299);let ids=[];
 for(const p of products.slice(0,size))ids=c.toggle(ids,p.id,size);
 assert.equal(ids.length,size);assert.deepEqual(c.toggle(ids,products[size].id,size),ids);
 ids=c.toggle(ids,ids[0],size);assert.equal(ids.length,size-1);
 ids=c.toggle(ids,products[size].id,size);assert.equal(ids.length,size);
 const restored=c.clean(JSON.parse(JSON.stringify([...ids,ids[0],99999])),products,size);
 assert.deepEqual(restored,ids);
 const items=ids.map(id=>products.find(p=>p.id===id)),msg=c.message(b,items);
 assert(msg.includes('R'+b.price));assert(msg.includes('PUDO locker delivery: included'));
 for(const p of items){assert(msg.includes(p.reference));assert(msg.includes(String(p.id).padStart(3,'0')))}
 assert.equal(decodeURIComponent(encodeURIComponent(msg)),msg);
 assert.throws(()=>c.message(b,items.slice(1)));assert.throws(()=>c.message(b,Array(size).fill(items[0])));
}
assert.deepEqual(c.clean({bad:'data'},products,3),[]);
const opium=products.find(p=>p.id===164);assert(opium);
assert(c.matches(opium,'BLACK opium','all'));assert(c.matches(opium,'164','all'));
assert(!c.matches(opium,'zzzz-no-match','all'));
assert.equal(c.matches(products[0],'','masculine'),products[0].category==='masculine');
const html=fs.readFileSync(__dirname+'/samples.html','utf8');
for(const m of html.matchAll(/(?:src|href)="([^"?#]+)(?:[^" ]*)"/g)){
 const path=m[1];if(path.startsWith('http')||['promo.html','privacy-policy.html'].includes(path))continue;
 assert(fs.existsSync(__dirname+'/'+path),'Missing asset '+path);
}
assert.equal((html.match(/fbq\('track','PageView'\)/g)||[]).length,1);
assert.equal((html.match(/gtag\('config','G-NT5SEGTN2N'\)/g)||[]).length,1);
assert(!html.includes('src="app.js"'));
console.log('PASS: catalogue integrity; Trio/Five selection limits, duplicates, removal, restoration, invalid bundles, search, message totals, assets and single base tags.');
