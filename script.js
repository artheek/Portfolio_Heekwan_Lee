"use strict";
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const heroConfig=window.portfolioHero;
const opening=document.querySelector('.opening-reel');
const pauseButton=document.querySelector('#hero-pause');
const pauseIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>';
const playIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>';
let userPaused=false,heroVisible=true;
document.querySelector('#year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');nav.classList.remove('open');document.body.classList.remove('menu-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
matchMedia('(min-width:769px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
function attachSource(video,src,startPosition=-1){
 if(video.dataset.source)return;
 video.dataset.source=src;
 if(src.endsWith('.m3u8')&&window.Hls?.isSupported()){
  const hls=new Hls({startPosition,maxBufferLength:12,maxMaxBufferLength:24,backBufferLength:8});
  video.stream=hls;hls.loadSource(src);hls.attachMedia(video);
  hls.on(Hls.Events.ERROR,(_,data)=>{if(data.fatal){video.dataset.error=data.type;video.dispatchEvent(new Event('error'));}});
 }else video.src=src;
}
const viewer=document.createElement('dialog');viewer.className='video-viewer';viewer.setAttribute('aria-label','Video player');
viewer.innerHTML='<button class="viewer-close" type="button" aria-label="Close video"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><div class="viewer-content"></div>';
document.body.append(viewer);
const viewerContent=viewer.querySelector('.viewer-content');
const hero=document.createElement('video');hero.muted=true;hero.loop=true;hero.playsInline=true;hero.preload='metadata';hero.tabIndex=-1;hero.poster=heroConfig.poster;hero.setAttribute('aria-hidden','true');
document.querySelector('#hero-player').append(hero);
hero.addEventListener('loadedmetadata',()=>{hero.currentTime=26;},{once:true});
hero.addEventListener('timeupdate',()=>{if(hero.currentTime<.2)hero.currentTime=26;});
function heroResume(){if(!document.hidden&&heroVisible&&!userPaused&&!viewer.open&&!reducedMotion.matches){attachSource(hero,heroConfig.src,26);hero.stream?.startLoad(-1);hero.play().catch(()=>{});}}
hero.addEventListener('playing',()=>{opening.classList.add('is-playing');opening.dataset.playback='playing';pauseButton.hidden=false;});
hero.addEventListener('error',()=>{opening.classList.remove('is-playing');opening.dataset.playback='unavailable';});
pauseButton.innerHTML=pauseIcon;pauseButton.setAttribute('aria-label','Pause background video');
pauseButton.addEventListener('click',()=>{userPaused=!userPaused;pauseButton.innerHTML=userPaused?playIcon:pauseIcon;pauseButton.setAttribute('aria-label',userPaused?'Play background video':'Pause background video');userPaused?hero.pause():heroResume();});
new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;heroVisible?heroResume():hero.pause();},{threshold:.1}).observe(opening);
document.addEventListener('visibilitychange',()=>{document.hidden?hero.pause():heroResume();});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)hero.pause();else heroResume();});
const stopPreviews=[];
(window.portfolioVideos||[]).forEach(item=>{
 const article=document.createElement('article');article.className='clip';
 const button=document.createElement('button');button.type='button';button.className='clip-media';button.setAttribute('aria-label',`Play ${item.title}`);button.setAttribute('aria-haspopup','dialog');
 const img=document.createElement('img');img.src=item.poster;img.alt='';img.loading='lazy';button.append(img);
 const video=document.createElement('video');video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-hidden','true');button.append(video);
 video.addEventListener('loadedmetadata',()=>{video.currentTime=item.previewStart||0;},{once:true});
 let wanted=false;
 const stop=()=>{wanted=false;video.pause();video.stream?.stopLoad();button.classList.remove('previewing');button.dataset.playback='paused';};stopPreviews.push(stop);
 const play=()=>{if(reducedMotion.matches||viewer.open)return;wanted=true;attachSource(video,item.preview);video.stream?.startLoad(-1);video.play().catch(()=>{});};
 video.addEventListener('playing',()=>{if(wanted){button.classList.add('previewing');button.dataset.playback='playing';}else video.pause();});
 video.addEventListener('error',stop);
 button.addEventListener('pointerenter',play);button.addEventListener('pointerleave',stop);button.addEventListener('focus',play);button.addEventListener('blur',stop);
 button.addEventListener('click',()=>{stop();openViewer({src:item.src,title:item.title});});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)stop();});
 new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();}).observe(button);
 article.append(button);document.querySelector('#clips-grid').append(article);
});
function openViewer({src=heroConfig.fullSrc,title='Heekwan Lee VFX Portfolio',start=0,end,loop=false}){
 hero.pause();stopPreviews.forEach(stop=>stop());viewerContent.replaceChildren();viewer.showModal();document.body.classList.add('viewer-open');
 const video=document.createElement('video');video.controls=true;video.autoplay=true;video.loop=loop;video.playsInline=true;video.preload='auto';video.setAttribute('aria-label',title);viewerContent.append(video);
 video.addEventListener('loadedmetadata',()=>{if(start)video.currentTime=start;video.play().catch(()=>{});},{once:true});
 if(end)video.addEventListener('timeupdate',()=>{if(video.currentTime>=end){video.pause();}});
 attachSource(video,src,start);video.play().catch(()=>{});
 if(viewer.requestFullscreen)viewer.requestFullscreen().catch(()=>{});
 else if(viewer.webkitRequestFullscreen)viewer.webkitRequestFullscreen();
 else if(video.webkitEnterFullscreen)video.addEventListener('loadedmetadata',()=>video.webkitEnterFullscreen(),{once:true});
 viewer.querySelector('button').focus();
}
function closeViewer(){if(document.fullscreenElement===viewer)document.exitFullscreen().catch(()=>{});viewer.close();}
viewer.querySelector('button').addEventListener('click',closeViewer);
viewer.addEventListener('close',()=>{viewerContent.querySelectorAll('video').forEach(v=>{v.pause();v.stream?.destroy();});viewerContent.replaceChildren();document.body.classList.remove('viewer-open');heroResume();});
viewer.addEventListener('click',e=>{if(e.target===viewer)closeViewer();});
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&viewer.open)viewer.close();});
document.querySelectorAll('.category-link').forEach((link,i)=>{
 const item=window.portfolioCategories[i],start=item.start||0;
 link.href=item.src;link.removeAttribute('target');link.setAttribute('aria-haspopup','dialog');
 link.querySelector('.thumbnail-image img').src=item.poster;
 const video=document.createElement('video');video.muted=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-hidden','true');link.querySelector('.thumbnail-image').append(video);
 let wanted=false;
 video.addEventListener('loadedmetadata',()=>{video.currentTime=start;},{once:true});
 video.addEventListener('ended',()=>{if(wanted){video.currentTime=0;video.play().catch(()=>{});}});
 video.addEventListener('timeupdate',()=>{if(item.previewEnd&&video.currentTime>=item.previewEnd)video.currentTime=start;});
 const stop=()=>{wanted=false;video.pause();video.stream?.stopLoad();link.classList.remove('previewing');};stopPreviews.push(stop);
 const play=()=>{if(viewer.open||reducedMotion.matches)return;wanted=true;attachSource(video,item.preview,start);if(video.readyState>=1)video.currentTime=start;video.stream?.startLoad(start);video.play().catch(()=>{});};
 video.addEventListener('playing',()=>{if(wanted)link.classList.add('previewing');else video.pause();});
 link.addEventListener('pointerenter',play);link.addEventListener('pointerleave',stop);link.addEventListener('focus',play);link.addEventListener('blur',stop);
 new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();}).observe(link);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 link.addEventListener('click',e=>{e.preventDefault();openViewer({src:item.src,start,end:item.end,loop:item.loop,title:item.title});});
});
document.querySelectorAll('#hero-full,.reel-link').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();openViewer({});}));
if(!reducedMotion.matches){const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-wait');reveal.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.portfolio-title,.category-item,.clip,.about-grid').forEach(el=>{el.classList.add('reveal-item','reveal-wait');reveal.observe(el);});}
heroResume();


// Scroll-linked focus dissolve: opening reel to the Portfolio section.
(()=>{
 const opening=document.querySelector('.opening-reel'),grid=document.querySelector('#work'),cue=document.querySelector('.scroll-cue');
 if(!opening||!grid)return;
 const canvas=document.createElement('canvas');canvas.className='reel-transition';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
 const ctx=canvas.getContext('2d');if(!ctx)return;
 let width=0,height=0,frame=0,origin=null,travel=false,wheelAmount=0,wheelTimer=0,settleTimer=0;
 function resize(){width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);requestDraw();}
 function destination(){return Math.max(0,grid.getBoundingClientRect().top+scrollY-(innerWidth<=768?24:32));}
 function draw(){
  frame=0;ctx.clearRect(0,0,width,height);
  const base=opening.offsetTop,target=destination();
  const progress=Math.max(0,Math.min(1,(scrollY-base)/Math.max(1,target-base)));
  const p=reducedMotion.matches?0:progress;
  opening.style.setProperty('--reel-exit',p.toFixed(4));
  grid.style.setProperty('--work-enter',reducedMotion.matches?'1':String(Math.max(0,Math.min(1,(progress-.15)/.72))));
  if(reducedMotion.matches||progress<=0||progress>=1||viewer.open){canvas.style.opacity='0';return;}
  const strength=Math.pow(Math.sin(progress*Math.PI),1.6);canvas.style.opacity=String(strength*.58);
  ctx.globalCompositeOperation='lighter';
  const fields=[{x:.25+progress*.3,y:.65-progress*.35,r:.6,c:'92,132,214'}, {x:.78-progress*.2,y:.35+progress*.18,r:.47,c:'130,106,194'}];
  fields.forEach(f=>{const x=width*f.x,y=height*f.y,r=Math.max(width,height)*f.r;const light=ctx.createRadialGradient(x,y,0,x,y,r);light.addColorStop(0,'rgba('+f.c+',.42)');light.addColorStop(.42,'rgba('+f.c+',.18)');light.addColorStop(1,'rgba('+f.c+',0)');ctx.fillStyle=light;ctx.fillRect(0,0,width,height);});
  ctx.globalCompositeOperation='source-over';
 }
 function requestDraw(){if(!frame)frame=requestAnimationFrame(draw);}
 function goToWork(){
  if(travel||viewer.open)return;travel=true;
  window.scrollTo({top:destination(),behavior:reducedMotion.matches?'instant':'smooth'});
  clearTimeout(settleTimer);settleTimer=setTimeout(()=>{travel=false;},1500);
 }
 cue.href='#work';cue.setAttribute('aria-label','포트폴리오 보기');cue.addEventListener('click',event=>{event.preventDefault();goToWork();});
 opening.addEventListener('pointerdown',event=>{if(event.target.closest('a,button')||event.button!==0)return;origin={x:event.clientX,y:event.clientY,type:event.pointerType};});
 window.addEventListener('pointerup',event=>{
  if(!origin)return;const dx=event.clientX-origin.x,dy=event.clientY-origin.y;
  const intent=origin.type==='mouse'?Math.abs(dy)>75:dy< -75;
  if(intent&&Math.abs(dy)>Math.abs(dx)*1.3)goToWork();origin=null;
 });
 opening.addEventListener('pointercancel',()=>{origin=null;});
 // Touch scrolling cancels pointer gestures; preserve the native swipe, then settle.
 let touchStart=null;
 opening.addEventListener('touchstart',e=>{touchStart=e.target.closest('a,button')?null:e.touches[0].clientY;},{passive:true});
 opening.addEventListener('touchend',e=>{if(touchStart!==null&&touchStart-e.changedTouches[0].clientY>90)goToWork();touchStart=null;},{passive:true});
 opening.addEventListener('wheel',event=>{
  if(event.ctrlKey||event.deltaY<=0||travel)return;
  wheelAmount+=event.deltaY*(event.deltaMode===1?16:1);clearTimeout(wheelTimer);
  wheelTimer=setTimeout(()=>{if(wheelAmount>100&&scrollY<destination()*.7)goToWork();wheelAmount=0;},140);
 },{passive:true});
 window.addEventListener('scroll',requestDraw,{passive:true});window.addEventListener('resize',resize,{passive:true});
 reducedMotion.addEventListener('change',requestDraw);resize();
})();
