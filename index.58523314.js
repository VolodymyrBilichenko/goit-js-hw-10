const e={headers:{"x-api-key":"live_SQaMb78X6e2HQyuWGiJMLYhVdCF2JW3TGjBlkUxwJK4JNYYlgKyqgOiHyaGe8Mw7"}};function t(t){return fetch(`https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${t}`,e).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))}const n={selectInp:document.querySelector(".breed-select"),loadingData:document.querySelector(".loader"),errorMes:document.querySelector(".error"),infoCat:document.querySelector(".cat-info")};n.selectInp.addEventListener("change",(function(){t(this.value).then((e=>{const t=function(e){return e.map((({url:e,breeds:[{name:t,temperament:n,description:o}]})=>`\n        <div id="container">\t\n            <div class="product-details">\n                <h1>${t}</h1>\n                <p class="information">${n}</p>\n                <p class="information">${o}</p>\n            </div>\n            \n            <div class="product-image">\n                <img src="${e}" alt="cat photo">\n            </div>\n        </div>`)).join("")}(e);n.infoCat.innerHTML=t})).catch((e=>{throw console.log(e),e}))})),fetch("https://api.thecatapi.com/v1/breeds?limit=10",e).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>{!function(e){e.forEach((e=>{const t=document.createElement("option");t.value=e.id,t.textContent=e.name,n.selectInp.append(t)}))}(e),console.log(e)})).catch((e=>{throw console.log(e),e}));
//# sourceMappingURL=index.58523314.js.map
