import{a as L,S as w,i as n}from"./assets/vendor-03da8548.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(s){if(s.ep)return;s.ep=!0;const l=e(s);fetch(s.href,l)}})();async function m(r,t=1,e=15){const c="https://pixabay.com",s="/api/",l=new URLSearchParams({key:"43104270-906b33b14dade84df1c23efb2",q:r,image_type:"photo",page:t,per_page:e,orientation:"horizontal",safesearch:!0}),o=c+s+"?"+l;try{const i=await L.get(o);if(!i.data.hits)throw new Error("Error fetching data");return i.data}catch(i){throw console.error("Error fetching data",i),i}}const h=document.querySelector(".userList");document.querySelector(".areaForLoader");const p=new w(".gallery a",{captionDelay:250,captionsData:"alt"});function v(r){r.length;const t=r.map(e=>(console.log(e),`<div class="blockForAllElements">
          <li>
          <a href=${e.largeImageURL} download="false">
          <img src=${e.webformatURL} alt="${e.tags}" class ="imgOfUser">
          </a>
          </li>
          <div class = "divForDescription"> 
          <ul class="blockOfInfo"> 
            <li class="title">Likes</li>
            <li class="info">${e.likes}</li>
          </ul>
          <ul class="block">
            <li class="title">Views</li>
            <li class="info">${e.views}</li>
          </ul>
          <ul class="block">
            <li class="title">Comments</li>
            <li class="info">${e.comments}</li>
          </ul>
          <ul class="block">
            <li class="title">Downloads</li>
            <li class="info">${e.downloads}</li>
          </ul>
          </div>
        </div>`)).join("");h.insertAdjacentHTML("beforeend",t),p.refresh()}function k(r){r.length;const t=r.map(e=>(console.log(e),`<div class="blockForAllElements">
          <li>
          <a href=${e.largeImageURL} download="false">
          <img src=${e.webformatURL} alt="${e.tags}" class ="imgOfUser">
          </a>
          </li>
          <div class = "divForDescription"> 
          <ul class="blockOfInfo"> 
            <li class="title">Likes</li>
            <li class="info">${e.likes}</li>
          </ul>
          <ul class="block">
            <li class="title">Views</li>
            <li class="info">${e.views}</li>
          </ul>
          <ul class="block">
            <li class="title">Comments</li>
            <li class="info">${e.comments}</li>
          </ul>
          <ul class="block">
            <li class="title">Downloads</li>
            <li class="info">${e.downloads}</li>
          </ul>
          </div>
        </div>`)).join("");h.insertAdjacentHTML("beforeend",t),p.refresh()}const S=document.querySelector(".formForInput"),y=document.querySelector(".inputOfWords"),u=document.querySelector(".buttonLoadMore"),f=document.querySelector(".userList"),a=document.querySelector(".areaForLoader");let d=1,g="",b=0;S.addEventListener("submit",$);u.addEventListener("click",E);async function $(r){r.preventDefault();const t=y.value.trim();if(!t){n.warning({title:"Warning",message:"Please enter a search images"});return}a.style.display="block",u.style.display="none",d=1,g=t;try{const e=await m(t,d);e.hits.length===0?n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}):(b=e.totalHits,f.innerHTML="",v(e.hits),e.hits.length>=15&&(u.style.display="block"),y.value="")}catch{(f.innerHTML="")&&n.error({title:"Error",message:"An error occurred while searching for images!"})}finally{a.style.display="none"}}async function E(r){r.preventDefault(),a.style.display="block";try{d+=1;const t=await m(g,d);if(t.hits.length>0){const e=document.querySelector(".blockForAllElements").getBoundingClientRect().height;k(t.hits),window.scrollBy({top:e*2,behavior:"smooth"})}}catch{a.style.display="none",n.warning({title:"Warning",message:"No more images"})}finally{f.querySelectorAll(".blockForAllElements").length>=b&&(u.style.display="none",n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})),a.style.display="none"}}
//# sourceMappingURL=commonHelpers.js.map
