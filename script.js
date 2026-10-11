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
let youtubePromise;
function youtubeReady(){
 if(window.YT?.Player)return Promise.resolve();
 if(!youtubePromise)youtubePromise=new Promise((resolve,reject)=>{
  window.onYouTubeIframeAPIReady=resolve;
  const api=document.createElement('script');api.src='https://www.youtube.com/iframe_api';api.onerror=reject;document.head.append(api);
 });
 return youtubePromise;
}
const grid=document.querySelector('#clips-grid');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
(window.portfolioVideos||[]).forEach((item,index)=>{
  const article=document.createElement('article');article.className='clip';
  const media=document.createElement(item.preview?'button':'div');media.className='clip-media';media.setAttribute('aria-label',item.preview?item.title:`${item.title} · 영상 추가 예정`);
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
    media.addEventListener('click',()=>{stop();openViewer({src:item.src||item.preview,title:item.title});});
    new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();}).observe(media);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  }else if(!item.poster){
    const empty=document.createElement('div');empty.className='clip-empty';empty.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="6" width="26" height="20" rx="3"/><path d="m13 11 8 5-8 5z"/></svg>';media.append(empty);
  }
  article.append(media);grid.append(article);
});
// Opening reel: local video first, YouTube fallback until a source file is supplied.
const opening=document.querySelector('.opening-reel');
const heroMount=document.querySelector('#hero-player');
const pauseButton=document.querySelector('#hero-pause');
const heroConfig=window.portfolioHero||{};
let heroPause=()=>{},heroResume=()=>{},userPaused=false,heroVisible=true;
function playing(){opening.classList.add('is-playing');opening.dataset.playback='playing';pauseButton.hidden=false;}
function unavailable(){opening.classList.remove('is-playing');opening.dataset.playback='unavailable';pauseButton.hidden=true;}
if(heroConfig.poster)document.querySelector('.hero-poster').src=heroConfig.poster;
if(!reducedMotion.matches){
 if(heroConfig.src){
  const video=document.createElement('video');video.src=heroConfig.src;video.muted=true;video.autoplay=true;video.loop=true;video.playsInline=true;video.preload='auto';video.tabIndex=-1;heroMount.append(video);
  video.addEventListener('playing',playing);video.addEventListener('error',unavailable);
  heroPause=()=>video.pause();heroResume=()=>{video.play().catch(unavailable);};heroResume();
 }else if(heroConfig.youtubeId){
  const target=document.createElement('div');target.id='youtube-hero';heroMount.append(target);
  youtubeReady().then(()=>{
   const player=new window.YT.Player('youtube-hero',{videoId:heroConfig.youtubeId,playerVars:{autoplay:1,mute:1,controls:0,playsinline:1,loop:1,playlist:heroConfig.youtubeId,rel:0,disablekb:1,iv_load_policy:3,origin:location.origin},events:{
    onReady:()=>{player.mute();if(heroVisible&&!userPaused&&!viewer.open&&!reducedMotion.matches)player.playVideo();const frame=player.getIframe();frame.tabIndex=-1;frame.title='무음 포트폴리오 배경 영상';},
    onStateChange:event=>{if(event.data===1){playing();if(!heroVisible||userPaused||viewer.open||reducedMotion.matches)player.pauseVideo();}},
    onError:unavailable
   }});
   heroPause=()=>{if(typeof player.pauseVideo==='function')player.pauseVideo();};heroResume=()=>{if(typeof player.playVideo==='function'){player.mute();player.playVideo();}};
  }).catch(unavailable);
 }
}
pauseButton.addEventListener('click',()=>{userPaused=!userPaused;pauseButton.textContent=userPaused?'재생':'일시정지';userPaused?heroPause():heroResume();});
new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;if(!heroVisible)heroPause();else if(!userPaused&&!viewer.open&&!reducedMotion.matches)heroResume();},{threshold:.1}).observe(opening);
document.addEventListener('visibilitychange',()=>{if(document.hidden)heroPause();else if(heroVisible&&!userPaused&&!viewer.open&&!reducedMotion.matches)heroResume();});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){heroPause();opening.classList.remove('is-playing');pauseButton.hidden=true;}});
if(!reducedMotion.matches){
 const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-wait');reveal.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.portfolio-title,.category-item,.clip,.about-grid').forEach(el=>{el.classList.add('reveal-item','reveal-wait');reveal.observe(el);});
}

// Site-owned fullscreen viewer. Native files take priority over the reel embed.
const viewer=document.createElement('dialog');viewer.className='video-viewer';viewer.setAttribute('aria-label','Video player');
viewer.innerHTML='<button class="viewer-close" type="button" aria-label="Close video">✕</button><div class="viewer-content"></div>';
document.body.append(viewer);
const viewerContent=viewer.querySelector('.viewer-content');
function openViewer({src,youtubeId,start=0,end,title='Portfolio'}){
 heroPause();viewerContent.replaceChildren();viewer.showModal();document.body.classList.add('viewer-open');
 if(viewer.requestFullscreen)viewer.requestFullscreen().catch(()=>{});
 if(src){const v=document.createElement('video');v.src=src;v.controls=true;v.autoplay=true;v.playsInline=true;v.setAttribute('aria-label',title);viewerContent.append(v);v.play().catch(()=>{});}
 else{const frame=document.createElement('iframe');frame.title=title;frame.allow='autoplay; fullscreen; picture-in-picture';frame.allowFullscreen=true;frame.src=`https://www.youtube.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0&start=${start}${end?'&end='+end:''}`;viewerContent.append(frame);}
 viewer.querySelector('button').focus();
}
function closeViewer(){if(document.fullscreenElement===viewer)document.exitFullscreen().catch(()=>{});viewer.close();}
viewer.querySelector('button').addEventListener('click',closeViewer);
viewer.addEventListener('close',()=>{viewerContent.replaceChildren();document.body.classList.remove('viewer-open');if(heroVisible&&!userPaused&&!reducedMotion.matches)heroResume();});
viewer.addEventListener('click',e=>{if(e.target===viewer)closeViewer();});
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&viewer.open)viewer.close();});
document.querySelectorAll('.category-link').forEach((link,i)=>{link.removeAttribute('target');link.setAttribute('aria-haspopup','dialog');link.addEventListener('click',e=>{e.preventDefault();openViewer({youtubeId:'g9bOLQV_CiQ',start:i?70:0,end:i?147:70,title:i?'Film VFX':'Realtime VFX'});});});
