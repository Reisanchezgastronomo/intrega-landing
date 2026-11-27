/* UNA BUENA TAZA / EDICIÓN EMPRESARIAL 01 — sin dependencias de pago */
'use strict';
const $ = id => document.getElementById(id);
const FIELDS = [
 {id:'kg',label:'Precio del café por kg',unit:'USD/kg',values:[10,14],min:0.01,max:100000},
 {id:'dose',label:'Café dosificado por taza',unit:'g',values:[12,10],min:0.1,max:1000},
 {id:'waste',label:'Merma del café comprado',unit:'%',values:[12,3],min:0,max:99.9},
 {id:'price',label:'Precio neto de venta',unit:'USD',values:[1,1],min:0,max:100000},
 {id:'other',label:'Otros costes variables por taza',unit:'USD',values:[0.20,0.20],min:0,max:100000}
];
const FORMAT=(v,n=2)=>new Intl.NumberFormat('es-VE',{minimumFractionDigits:n,maximumFractionDigits:n,useGrouping:true}).format(v);
const DOLLAR=(v,n=2)=>'$'+FORMAT(v,n);
const clean=(v,max=90)=>String(v||'').trim().replace(/[<>\x00-\x1F]/g,'').slice(0,max);
const advice={
 Rendimiento:{title:'El rendimiento no empieza en el precio.',summary:'En tu establecimiento, la primera pregunta no es cuánto cuesta el kilo, sino cuántas tazas servibles produce y qué contribución conserva cada venta.',action:'Pesar dosis, merma y producción vendible por turno antes de modificar la receta.',evidence:'Registrar siete días de kilos utilizados, dosis promedio, tazas servidas y descartes.',next:'Separar pérdidas por dosificación, molienda, extracción y bebida repetida.'},
 Consistencia:{title:'La calidad debe poder repetirse.',summary:'Una buena bebida aislada no constituye un estándar. La estabilidad se prueba cuando distintas personas pueden preparar cinco tazas consecutivas comparables.',action:'Definir una receta de referencia y validar cinco extracciones consecutivas mediante sabor, dosis, rendimiento y tiempo.',evidence:'Comparar variaciones por operador, turno y equipo; registrar descartes y reclamaciones.',next:'Estandarizar solo después de una prueba sensorial consistente.'},
 Autonomía:{title:'El resultado debe sobrevivir a la persona.',summary:'Cuando una taza depende del mejor barista o de la intervención constante del dueño, existe una dependencia operativa que merece corregirse.',action:'Asignar responsable de receta, rutinas de apertura, limpieza, calibración y registro.',evidence:'Observar durante siete días el cumplimiento del estándar sin supervisión extraordinaria.',next:'Transferir competencias y verificar cierres de turno con indicadores simples.'},
 Recompra:{title:'La recompra se demuestra, no se presupone.',summary:'Una taza consistente puede favorecer la experiencia y el retorno, pero el vínculo con las ventas debe verificarse con información, no con impresiones.',action:'Documentar la experiencia y observar frecuencia de visita, incidencias y consistencia del servicio.',evidence:'Comparar recuentos de visitas repetidas y comentarios antes y después del estándar, sin atribuir causalidad automática.',next:'Contrastar los datos con horarios, precio, promoción y otros factores de demanda.'}
};
const businessFocus={
 'Panadería o cafetería':'Revisar variación entre turnos, bebidas con leche y control de inventario.',
 Restaurante:'Considerar el café dentro de la experiencia completa y medir el coste de las bebidas servidas.',
 Hotel:'Separar venta directa, desayunos incluidos y consumo por huésped.',
 'Grupo multisede':'Comparar recetas, proveedores y desempeño entre locales con un estándar común.',
 'Catering o cocina central':'Medir rendimiento, transporte, temperatura de servicio y consistencia por lote.',
 'Otro establecimiento':'Definir dónde se prepara, quién controla y cómo se registra cada servicio.'
};
let lastModel=null,lastProfile=null;
function makeInputs(){
 const root=$('model-fields');root.replaceChildren();
 FIELDS.forEach(field=>{for(let i=0;i<2;i++){
 const d=document.createElement('div');d.className='model-field';
 const l=document.createElement('label');l.htmlFor=field.id+i;l.textContent=field.label;
 const row=document.createElement('div');row.className='number-unit';
 const input=document.createElement('input');input.id=field.id+i;input.type='number';input.min=String(field.min);input.max=String(field.max);input.step='any';input.inputMode='decimal';input.value=String(field.values[i]);input.required=true;input.setAttribute('aria-label',field.label+' — '+(i?'objetivo':'actual'));
 const unit=document.createElement('b');unit.textContent=field.unit;row.append(input,unit);d.append(l,row);root.appendChild(d);
 }});
 root.addEventListener('input',()=>{calculate();invalidateGeneratedProfile();});
 $('volume').addEventListener('input',()=>{calculate();invalidateGeneratedProfile();});
 $('reset').addEventListener('click',()=>{FIELDS.forEach(f=>f.values.forEach((v,i)=>$(f.id+i).value=String(v)));$('volume').value='3000';calculate();invalidateGeneratedProfile();$('simulador').scrollIntoView({behavior:'smooth',block:'start'});});
}
function clearLiveNumbers(){
 for(const id of ['yield-start','yield-end','coffee-start','coffee-end','margin-start','margin-end','monthly-start','monthly-end','additional-sales','delta-pill'])$(id).textContent='—';
 $('reading').textContent='Corrige los valores para obtener un escenario válido.';
}
function calculate(){
 const inputs=[...document.querySelectorAll('#model-fields input'),$('volume')];
 if(inputs.some(e=>!e.checkValidity()||e.value.trim()===''||!Number.isFinite(e.valueAsNumber))){$('calculator-error').textContent='Corrige los valores: todos los campos económicos son obligatorios y deben permanecer dentro de sus límites.';$('calculator-error').hidden=false;lastModel=null;clearLiveNumbers();return null;}
 const volume=$('volume').valueAsNumber;
 const model=[0,1].map(i=>{
 const vals=Object.fromEntries(FIELDS.map(f=>[f.id,$(f.id+i).valueAsNumber]));
 const yieldPerKg=1000*(1-vals.waste/100)/vals.dose;
 const coffeeCost=vals.kg/yieldPerKg;
 const margin=vals.price-vals.other-coffeeCost;
 return {...vals,yieldPerKg,coffeeCost,margin,volume,monthly:margin*volume};
 });
 const [a,b]=model;
 const gap=a.monthly-b.monthly;
 const additional=gap>1e-8?(b.margin>1e-8?Math.ceil((gap-1e-9)/b.margin):null):0;
 const numbers=[a,b].flatMap(o=>[o.yieldPerKg,o.coffeeCost,o.margin,o.monthly]);
 if(numbers.some(n=>!Number.isFinite(n))){$('calculator-error').textContent='El cálculo no puede resolverse con esos valores.';$('calculator-error').hidden=false;lastModel=null;clearLiveNumbers();return null;}
 $('calculator-error').hidden=true;
 const setters={ 'yield-start':FORMAT(a.yieldPerKg,1),'yield-end':FORMAT(b.yieldPerKg,1),'coffee-start':DOLLAR(a.coffeeCost,3),'coffee-end':DOLLAR(b.coffeeCost,3),'margin-start':DOLLAR(a.margin,3),'margin-end':DOLLAR(b.margin,3),'monthly-start':DOLLAR(a.monthly,2),'monthly-end':DOLLAR(b.monthly,2),'additional-sales':additional===null?'—':FORMAT(additional,0)};
 for(const [k,v] of Object.entries(setters))$(k).textContent=v;
 $('delta-pill').textContent=(b.yieldPerKg/a.yieldPerKg-1>=0?'+':'')+FORMAT((b.yieldPerKg/a.yieldPerKg-1)*100,1)+' % tazas/kg';
 $('reading').textContent=gap>1e-8?`El escenario objetivo produce ${FORMAT(b.yieldPerKg-a.yieldPerKg,1)} tazas/kg más, pero reduce la contribución mensual en ${DOLLAR(gap,2)} a igual volumen.`:gap< -1e-8?`El escenario objetivo mejora la contribución mensual en ${DOLLAR(-gap,2)} a igual volumen; no necesita ventas compensatorias.`:'Ambos escenarios generan aproximadamente la misma contribución mensual al volumen indicado.';
 const threshold=$('additional-sales').nextElementSibling;
 threshold.textContent=additional===null?'El margen objetivo es nulo o negativo; más ventas no compensarían la diferencia.':additional===0?'No se necesitan ventas adicionales para compensar la contribución.':'tazas adicionales al mes, con el margen objetivo supuesto';
 lastModel={current:a,target:b,additional,gap,volume};
 return lastModel;
}
function invalidateGeneratedProfile(){if(lastProfile){$('personal-result').hidden=true;$('pdf-status').textContent='';lastProfile=null;}}
function selected(name){return document.querySelector(`input[name="${name}"]:checked`)?.value||'';}
function initQuestionnaire(){
 document.querySelectorAll('#profile-form input').forEach(el=>el.addEventListener('input',()=>{if(lastProfile)invalidateGeneratedProfile();}));
 $('profile-form').addEventListener('submit',e=>{
 e.preventDefault();let bus=selected('business'),priority=selected('priority');let consent=$('consent-delivery').checked;
 if(!bus||!priority||!consent){$('form-feedback').textContent=!bus?'Selecciona el tipo de establecimiento.':!priority?'Selecciona una prioridad empresarial.':'Autoriza el procesamiento local para generar la ficha.';$('form-feedback').style.color='#9b4b35';return;}
 const model=calculate();if(!model){$('form-feedback').textContent='Revisa primero los valores del simulador.';$('economia').scrollIntoView({behavior:'smooth'});return;}
 const a=advice[priority];const name=clean($('contact-name').value,70);const company=clean($('company').value,90);
 lastProfile={bus,priority,name,company,marketing:$('consent-marketing').checked,advice:a,businessNote:businessFocus[bus],model};
 $('personal-title').textContent=a.title;$('personal-summary').textContent=a.summary+' '+businessFocus[bus];$('personal-action').textContent=a.action;$('personal-evidence').textContent=a.evidence;
 $('personal-result').hidden=false;$('form-feedback').textContent='Orientación generada con tus respuestas.';$('form-feedback').style.color='';$('personal-result').scrollIntoView({behavior:'smooth',block:'start'});
 });
 $('download-pdf').addEventListener('click',()=>{
 if(!lastProfile||!$('consent-delivery').checked){$('pdf-status').textContent='Primero genera una ficha válida.';return;}
 try{const bytes=buildPDF(lastProfile);const blob=new Blob([bytes],{type:'application/pdf'});if(blob.size<4000)throw Error('El archivo PDF es demasiado pequeño.');const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='Una_buena_taza_ficha_'+(lastProfile.company||lastProfile.name||'ejecutiva').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\w-]+/g,'_').slice(0,35)+'.pdf';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),45000);$('pdf-status').textContent='Ficha PDF generada y descarga iniciada en este dispositivo.';}
 catch(err){$('pdf-status').textContent='No se pudo generar la ficha. Revisa los valores e inténtalo nuevamente.';console.error('PDF failure:',err);}
 });
}
/* Generador PDF propio: objetos PDF 1.4, streams y xref; no usa print() ni abre ventanas. */
function buildPDF(profile){
 const W=595.28,H=841.89;const pages=[];const C={ink:[.09,.11,.10],cream:[.96,.94,.90],sand:[.88,.83,.73],gray:[.42,.44,.41],white:[1,1,1],olive:[.23,.29,.25],line:[.76,.75,.71]};
 const rgb=c=>c.map(x=>Number(x).toFixed(3)).join(' ');
 const sanitize=s=>String(s).replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/[—–−]/g,'-').replace(/→/g,'>').replace(/€/g,'EUR').replace(/\u00a0/g,' ').replace(/[^\x20-\x7E\xA0-\xFF]/g,'?');
 const esc=s=>sanitize(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
 let content='';
 const rect=(x,y,w,h,color)=>{content+=`${rgb(color)} rg ${x} ${y} ${w} ${h} re f\n`;};
 const line=(x,y,x2,y2,color,width=1)=>{content+=`${rgb(color)} RG ${width} w ${x} ${y} m ${x2} ${y2} l S\n`;};
 const text=(s,x,y,size=12,font='F1',color=C.ink)=>{content+=`BT /${font} ${size} Tf ${rgb(color)} rg 1 0 0 1 ${x} ${y} Tm (${esc(s)}) Tj ET\n`;};
 const wrap=(str,maxWidth,size=12,serif=false)=>{
  const words=sanitize(str).split(/\s+/);const lines=[];let cur='';const factor=serif?.47:.50;const estimated=w=>w.length*size*factor;
  for(const word of words){const next=(cur?cur+' ':'')+word;if(cur&&estimated(next)>maxWidth){lines.push(cur);cur=word;}else cur=next;}if(cur)lines.push(cur);return lines;
 };
 const para=(s,x,y,width,size=12,leading=19,font='F1',color=C.ink)=>{for(const t of wrap(s,width,size,font==='F3')){text(t,x,y,size,font,color);y-=leading;}return y;};
 const page=(number,section)=>{content='';rect(0,0,W,H,C.cream);rect(0,H-13,W,13,C.ink);text('REI SÁNCHEZ  /  DIRECCIÓN EJECUTIVA  /  INTEGRA',44,H-39,9,'F2',C.ink);line(44,H-53,W-44,H-53,C.line,.6);line(44,57,W-44,57,C.line,.5);text('SIMPLIFICAR PARA TRANSFORMAR',44,40,8,'F2',C.gray);text(`CUADERNO 01  /  ${section}  /  ${String(number).padStart(2,'0')}`,W-233,40,8,'F2',C.gray);};
 const push=()=>pages.push(content);
 const safe=(value)=>sanitize(String(value));
 const focus=profile.advice,company=profile.company||'Establecimiento no indicado',user=profile.name||'Responsable de la operación',a=profile.model.current,b=profile.model.target;
 page(1,'ORIENTACIÓN');rect(44,301,W-88,435,C.ink);text('CUADERNO DE TRANSFORMACIÓN EMPRESARIAL  /  01',65,703,9,'F2',C.sand);text('Una buena',64,614,52,'F3',C.white);text('taza.',64,559,59,'F3',C.white);line(65,516,W-65,516,C.gray,1);let yy=para('No todos los cafés tienen que ser extraordinarios. Toda taza merece estar bien hecha.',65,481,438,18,26,'F3',C.white);text('UNA LECTURA OPERATIVA PARA DECIDIR MEJOR.',65,355,9,'F2',C.sand);
 text('FICHA PERSONALIZADA',44,270,10,'F2',C.gray);text(company,44,236,Math.min(27,495/(Math.max(company.length,1)*.53)),'F3',C.ink);text('Dirigida a: '+user,44,210,11,'F1',C.gray);line(44,194,W-44,194,C.line,.8);text('ESTABLECIMIENTO',44,173,8,'F2',C.gray);text(safe(profile.bus),44,152,13,'F2',C.ink);text('PRIORIDAD',327,173,8,'F2',C.gray);text(safe(profile.priority),327,152,13,'F2',C.ink);para('Orientación preliminar basada en las respuestas indicadas. No es un diagnóstico empresarial definitivo.',44,115,490,10,15,'F1',C.gray);push();
 page(2,'ECONOMÍA');text('02 / QUÉ DEJA CADA TAZA',44,729,10,'F2',C.gray);text('Dos formas',44,670,45,'F3');text('de operar.',44,623,45,'F3');para('Escenario ilustrativo calculado a partir de los valores introducidos. Se comparan los dos modelos al mismo volumen mensual.',45,586,490,11,16,'F1',C.gray);
 rect(44,450,245,98,C.ink);rect(301,450,250,98,C.olive);text('ACTUAL',60,524,10,'F2',C.sand);text('OBJETIVO',317,524,10,'F2',C.sand);text(FORMAT(a.yieldPerKg,1)+' tazas/kg',60,479,27,'F3',C.white);text(FORMAT(b.yieldPerKg,1)+' tazas/kg',317,479,27,'F3',C.white);
 const metrics=[['Precio de café por kg',DOLLAR(a.kg,2),DOLLAR(b.kg,2)],['Dosis de café por taza',FORMAT(a.dose,1)+' g',FORMAT(b.dose,1)+' g'],['Merma sobre café comprado',FORMAT(a.waste,1)+' %',FORMAT(b.waste,1)+' %'],['Coste de café por taza',DOLLAR(a.coffeeCost,3),DOLLAR(b.coffeeCost,3)],['Contribución por taza',DOLLAR(a.margin,3),DOLLAR(b.margin,3)],['Contribución mensual',DOLLAR(a.monthly,2),DOLLAR(b.monthly,2)]];
 let ry=415;metrics.forEach((m,i)=>{text(m[0],45,ry,11,'F1');text(m[1],302,ry,12,'F2');text(m[2],418,ry,12,'F2');line(44,ry-12,W-44,ry-12,C.line,.5);ry-=39;});
 const disc=profile.model.gap>1e-8?`El objetivo pierde ${DOLLAR(profile.model.gap,2)} de contribución al volumen base de ${FORMAT(profile.model.volume,0)} tazas.`:profile.model.gap< -1e-8?`El objetivo mejora ${DOLLAR(-profile.model.gap,2)} de contribución al volumen base.`:'La contribución mensual es equivalente en ambos escenarios.';
 text('LECTURA DE DIRECCIÓN',44,165,9,'F2',C.gray);para(disc,44,140,497,12,17,'F1',C.ink);
 const ext=profile.model.additional===null?'No compensable con el margen objetivo.':profile.model.additional===0?'No se requieren ventas adicionales.':`${FORMAT(profile.model.additional,0)} ventas adicionales permitirían compensar la diferencia, suponiendo el mismo margen objetivo.`;
 para(ext,44,100,497,10,14,'F1',C.gray);push();
 page(3,'SIGUIENTE DECISIÓN');text('03 / PRIMERAS OPORTUNIDADES',44,729,10,'F2',C.gray);text(safe(profile.priority),44,675,50,'F3',C.ink);let y=para(focus.title,44,628,495,20,26,'F3',C.ink)-10; y=para(focus.summary+' '+profile.businessNote,44,y,493,12,19,'F1',C.gray)-30;
 const blocks=[['PRIMER CONTROL',focus.action],['EVIDENCIA A RECOGER',focus.evidence],['SIGUIENTE DECISIÓN',focus.next]];
 blocks.forEach(([label,body])=>{line(44,y,W-44,y,C.line,1);y-=25;text(label,44,y,9,'F2',C.gray);y-=26;y=para(body,44,y,492,13,19,'F1',C.ink)-26;});
 rect(44,108,W-88,83,C.ink);text('LA CONVERSACIÓN CONTINÚA',60,164,9,'F2',C.sand);text('cal.com/rei-sanchez-direccion-ejecutiva',60,134,13,'F2',C.white);
 para('No incluye evaluación del personal, auditoría económica, ni pronóstico garantizado. Las recetas de espresso se validan sensorial y operativamente. Datos procesados localmente, sin envío a SCI en esta fase.',44,96,496,8,12,'F1',C.gray);push();
 // Correct byte offsets for Latin-1 PDF strings, and explicitly create the xref table.
 const objects=[];const add=s=>(objects.push(s),objects.length);
 const pageIds=[];for(let i=0;i<pages.length;i++)pageIds.push(add(''));
 const catalogId=add('');const pagesId=add('');
 const font1=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
 const font2=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
 const font3=add('<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>');
 pages.forEach((p,i)=>{const stream=add(`<< /Length ${p.length} >>\nstream\n${p}\nendstream`);objects[pageIds[i]-1]=`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${font1} 0 R /F2 ${font2} 0 R /F3 ${font3} 0 R >> >> /Contents ${stream} 0 R >>`;});
 objects[catalogId-1]=`<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
 objects[pagesId-1]=`<< /Type /Pages /Kids [${pageIds.map(id=>id+' 0 R').join(' ')}] /Count ${pages.length} >>`;
 let pdf='%PDF-1.4\n%âãÏÓ\n',offsets=[0];
 objects.forEach((obj,i)=>{offsets.push(pdf.length);pdf+=`${i+1} 0 obj\n${obj}\nendobj\n`;});
 const start=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
 for(const off of offsets.slice(1))pdf+=String(off).padStart(10,'0')+' 00000 n \n';
 pdf+=`trailer\n<< /Size ${objects.length+1} /Root ${catalogId} 0 R >>\nstartxref\n${start}\n%%EOF`;
 const bytes=new Uint8Array(pdf.length);for(let i=0;i<pdf.length;i++)bytes[i]=pdf.charCodeAt(i)&255;return bytes;
}
function start(){makeInputs();initQuestionnaire();calculate();$('credits-toggle').addEventListener('click',()=>{let hidden=$('image-credits').hidden;$('image-credits').hidden=!hidden;$('credits-toggle').setAttribute('aria-expanded',String(hidden));$('credits-toggle').textContent=hidden?'Ocultar créditos −':'Créditos fotográficos +';});const onScroll=()=>{let max=document.documentElement.scrollHeight-innerHeight;$('reading-progress').style.width=(max>0?scrollY/max*100:0)+'%';};document.addEventListener('scroll',onScroll,{passive:true});onScroll();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();