'use strict';
document.querySelector('#year').textContent = new Date().getFullYear();
const poster=document.querySelector('.reel-poster img');
poster.addEventListener('error',()=>{if(!poster.dataset.fallback){poster.dataset.fallback='true';poster.src='https://i.ytimg.com/vi/g9bOLQV_CiQ/hqdefault.jpg';}});
