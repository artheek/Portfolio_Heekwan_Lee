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
const grid=document.querySelector('#clips-grid');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
(window.portfolioVideos||[]).forEach((item,index)=>{
  const article=document.createElement('article');article.className='clip';
  const media=document.createElement(item.url?'a':item.preview?'button':'div');media.className='clip-media';
  if(item.url){media.href=item.url;media.target='_blank';media.rel='noopener noreferrer';media.setAttribute('aria-label',`${item.title} 영상 보기, 새 탭`);}
  const label=document.createElement('div');label.className='clip-label';
  const title=document.createElement('h3');title.textContent=item.title;
  const category=document.createElement('span');category.textContent=item.category;label.append(title,category);
  if(item.poster){const image=document.createElement('img');image.src=item.poster;image.alt=item.title;image.loading='lazy';media.append(image);}
  if(item.preview){
    if(!item.url)media.setAttribute('aria-label',`${item.title} 미리보기 재생 또는 정지`);
    const video=document.createElement('video');video.src=item.preview;video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-hidden','true');if(item.poster)video.poster=item.poster;media.append(video);
    const status=document.createElement('span');status.className='clip-status';status.textContent='미리보기';media.append(status);
    let wanted=false;
    const play=async()=>{wanted=true;try{await video.play();if(wanted){media.classList.add('previewing');status.textContent='재생 중';}else video.pause();}catch{status.textContent='미리보기 재생 불가';}};
    const stop=()=>{wanted=false;video.pause();media.classList.remove('previewing');status.textContent='미리보기';};
    media.addEventListener('mouseenter',()=>{if(!reducedMotion.matches)play();});media.addEventListener('mouseleave',stop);
    media.addEventListener('focus',()=>{if(!reducedMotion.matches)play();});media.addEventListener('blur',stop);
    if(!item.url)media.addEventListener('click',()=>video.paused?play():stop());
    new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();}).observe(media);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  }else if(!item.poster){
    const empty=document.createElement('div');empty.className='clip-empty';empty.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="6" width="26" height="20" rx="3"/><path d="m13 11 8 5-8 5z"/></svg><span>영상 추가 예정</span>';media.append(empty);
  }
  article.append(media,label);grid.append(article);
});
