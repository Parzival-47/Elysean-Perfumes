(()=>{
 'use strict';
 const $=id=>document.getElementById(id), core=window.ElyseanSamples;
 const params=new URLSearchParams(location.search), b=core.bundle(params.get('bundle'));
 const products=Array.isArray(window.ELYSEAN_PRODUCTS)?window.ELYSEAN_PRODUCTS:[];
 // Keep campaign attribution when switching bundles, without forwarding arbitrary parameters.
 document.querySelectorAll('[data-bundle]').forEach(a=>{const u=new URL(a.href);['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k=>{if(params.has(k))u.searchParams.set(k,params.get(k));});a.href=u.href;if(b&&Number(a.dataset.bundle)===b.size)a.setAttribute('aria-current','page');});
 if(!b){$('bundle-notice').hidden=false;return;}
 if(!products.length){$('bundle-notice').textContent='The fragrance list could not load. Please refresh or contact Elysean on WhatsApp at 077 463 8001.';$('bundle-notice').hidden=false;return;}
 $('workspace').hidden=false;$('selection-bar').hidden=false;
 document.title=b.name+' — Choose '+b.size+' samples | Elysean Perfumes';
 $('bundle-label').textContent=b.name.toUpperCase()+' · '+b.size+' × 2ML · R'+b.price;
 $('total-label').textContent=b.name+' · '+b.size+' × 2ml';$('total').textContent='R'+b.price;$('progress').max=b.size;
 const key='elysean-samples-v1-'+b.size;let ids=[],category='all',limit=12,timer;
 try{ids=core.clean(JSON.parse(localStorage.getItem(key)||'[]'),products,b.size);}catch{$('storage-notice').hidden=false;}
 const track=(name,extra={})=>{const data={bundle_name:b.name,sample_count:b.size,currency:'ZAR',value:b.price,...extra};try{if(typeof window.gtag==='function')window.gtag('event',name,data);if(typeof window.fbq==='function')window.fbq('trackCustom',name,data);}catch{/* Tracking must never block choosing or ordering. */}};
 const el=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x;};
 function persist(){try{localStorage.setItem(key,JSON.stringify(ids));}catch{$('storage-notice').hidden=false;}}
 function change(id){const adding=!ids.includes(id);if(adding&&ids.length>=b.size)return;ids=core.toggle(ids,id,b.size);persist();render();track(adding?'sample_added':'sample_removed',{item_id:String(id)});if(adding&&ids.length===b.size){$('summary-title').focus({preventScroll:true});$('summary').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}else{const button=document.querySelector('[data-add="'+id+'"]');if(button)button.focus({preventScroll:true});}}
 function renderCards(){
  const list=products.filter(p=>core.matches(p,$('search').value,category));$('results-count').textContent=list.length+' fragrances found';$('empty').hidden=list.length!==0;$('more').hidden=list.length<=limit;
  const fragment=document.createDocumentFragment();
  list.slice(0,limit).forEach(p=>{const selected=ids.includes(p.id),card=el('article','card'+(selected?' selected':''));card.append(el('div','meta','ELYSEAN NO. '+String(p.id).padStart(3,'0')+' · '+p.category.toUpperCase()),el('h3','',p.variant),el('p','','Scent reference: '+p.reference),el('p','notes',p.notes));const button=el('button','button '+(selected?'outline':'gold'),selected?'✓ Selected — remove':ids.length===b.size?'Set full — remove a choice first':'Add 2ml sample');button.type='button';button.dataset.add=p.id;button.setAttribute('aria-pressed',String(selected));button.setAttribute('aria-label',(selected?'Remove ':'Add ')+'Elysean No. '+p.id+', '+p.reference);button.disabled=!selected&&ids.length===b.size;button.addEventListener('click',()=>change(p.id));card.append(button);fragment.append(card);});$('products').replaceChildren(fragment);
 }
 function render(){
  renderCards();const left=b.size-ids.length,complete=left===0;$('remaining').textContent=complete?'Your set is complete. Review your choices below.':ids.length+' of '+b.size+' selected · Choose '+left+' more';$('progress').value=ids.length;$('bar-count').textContent=ids.length+' of '+b.size+' selected';$('bar-remaining').textContent=complete?'Ready to review':left+' sample'+(left===1?'':'s')+' remaining';$('summary-title').textContent=complete?'Ready for your discovery?':'Your selection';$('send').disabled=!complete;$('review-note').textContent=complete?'Please check your choices before continuing.':'Choose exactly '+b.size+' samples to continue. You can remove or swap any choice.';
  const frag=document.createDocumentFragment();ids.forEach(id=>{const p=products.find(x=>x.id===id),li=el('li'),text=el('div');text.append(el('strong','','Elysean No. '+String(p.id).padStart(3,'0')),el('span','',p.reference),el('small','',p.variant+' · 2ml'));const remove=el('button','','×');remove.type='button';remove.setAttribute('aria-label','Remove Elysean No. '+p.id+', '+p.reference);remove.addEventListener('click',()=>change(id));li.append(text,remove);frag.append(li);});$('chosen').replaceChildren(frag);
 }
 $('search').addEventListener('input',()=>{limit=12;renderCards();clearTimeout(timer);timer=setTimeout(()=>track('search',{search_term:$('search').value.trim()}),800);});
 $('clear-search').addEventListener('click',()=>{$('search').value='';category='all';limit=12;document.querySelectorAll('[data-filter]').forEach(a=>a.setAttribute('aria-pressed',String(a.dataset.filter===category)));renderCards();$('search').focus();});
 document.querySelectorAll('[data-filter]').forEach(a=>a.addEventListener('click',()=>{category=a.dataset.filter;limit=12;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===a)));renderCards();track('sample_filter',{category});}));
 $('more').addEventListener('click',()=>{limit+=12;renderCards();});
 $('send').addEventListener('click',()=>{
  const items=ids.map(id=>products.find(p=>p.id===id));if(items.length!==b.size||items.some(p=>!p))return;
  const message=core.message(b,items);
  // This records contact intent, not payment or a completed purchase.
  try{if(typeof window.gtag==='function')window.gtag('event','generate_lead',{currency:'ZAR',value:b.price,bundle_name:b.name,item_ids:ids.join(',')});if(typeof window.fbq==='function')window.fbq('track','Contact',{content_name:b.name,content_ids:ids.map(String),currency:'ZAR',value:b.price});}catch{}
  location.href='https://wa.me/27774638001?text='+encodeURIComponent(message);
 });
 render();track('sample_bundle_view');
})();
