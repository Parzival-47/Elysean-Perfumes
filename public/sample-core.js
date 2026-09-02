(function(root){
  'use strict';
  const bundles={3:{size:3,name:'Discovery Trio',price:219},5:{size:5,name:'Discovery Five',price:299}};
  const bundle=value=>Object.hasOwn(bundles,String(value))?bundles[String(value)]:null;
  const normal=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const clean=(ids,products,size)=>Array.isArray(ids)?[...new Set(ids.map(Number))].filter(id=>products.some(p=>p.id===id)).slice(0,size):[];
  const matches=(p,q,category)=> (category==='all'||p.category===category)&&normal(q).split(/\s+/).every(t=>normal([p.id,String(p.id).padStart(3,'0'),p.reference,p.variant,p.notes,p.description].join(' ')).includes(t));
  const toggle=(ids,id,size)=>ids.includes(id)?ids.filter(x=>x!==id):ids.length<size?[...ids,id]:ids;
  const message=(b,items)=>{
    if(!b||items.length!==b.size||new Set(items.map(p=>p.id)).size!==b.size)throw Error('Complete your bundle first.');
    return ['Hi Elysean Perfumes,','I would like to order the '+b.name+' ('+b.size+' × 2ml samples):','',...items.map((p,i)=>(i+1)+'. Elysean No. '+String(p.id).padStart(3,'0')+' · '+p.variant+' — Scent reference: '+p.reference),'','Bundle total: R'+b.price,'PUDO locker delivery: included','Please confirm availability and dispatch timing, then send me the Yoco payment link.'].join('\n');
  };
  const api={bundle,normal,clean,matches,toggle,message};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ElyseanSamples=api;
})(typeof window!=='undefined'?window:this);
