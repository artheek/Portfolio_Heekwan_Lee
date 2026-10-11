'use strict';
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{if(!img.dataset.fallback){img.dataset.fallback='true';img.src='https://i.ytimg.com/vi/g9bOLQV_CiQ/hqdefault.jpg';}}));
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');nav.classList.remove('open');document.body.classList.remove('menu-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
matchMedia('(min-width:769px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
