import{S as d,i as c}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const a=document.querySelector(".inputOfWords"),f=document.querySelector(".buttonForInput"),u=document.querySelector(".userList"),p=document.querySelector(".areaForLoader");let i="";const m=new d(".gallery a",{captionDelay:250,captionsData:"alt"});f.addEventListener("click",e=>{e.preventDefault(),L(),u.innerHTML="",setTimeout(()=>{i=a.value.trim(),h()},2e3)});function h(){g().then(e=>{i===""?c.show({color:"red",message:"Sorry, the input field must be filled in to start the photo search.",position:"topRight"}):e.length===0?c.show({color:"red",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):y(e)}).catch(e=>console.log(e)).finally(()=>b()),a.value=""}function y(e){e.length;const s=e.map(r=>`<div class="blockForAllElements">
          <li>
          <a href=${r.largeImageURL} download="false">
          <img src=${r.webformatURL} alt = "${r.tags}" class = "imgOfUser">
          </a>
          </li>
          <div class = "divForDescription"> 
          <ul class="blockOfInfo"> 
            <li class="title">Likes</li>
            <li class="info">${r.likes}</li>
          </ul>
          <ul class="block">
            <li class="title">Views</li>
            <li class="info">${r.views}</li>
          </ul>
          <ul class="block">
            <li class="title">Comments</li>
            <li class="info">${r.comments}</li>
          </ul>
          <ul class="block">
            <li class="title">Downloads</li>
            <li class="info">${r.downloads}</li>
          </ul>
          </div>
        </div>`).join("");u.insertAdjacentHTML("beforeend",s),m.refresh()}function g(){return fetch(`https://pixabay.com/api/?key=42977219-0f6c9f9217f976d8651793c3a&q=${i}&image_type=photo&per_page=15&orientation=horizontal&safesearch=true`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>e.hits)}function L(){const e=document.createElement("span");p.appendChild(e),e.classList.add("loader")}function b(){document.querySelector(".loader").remove()}
//# sourceMappingURL=commonHelpers.js.map
