const menu=document.querySelector(".menu"),nav=document.querySelector(".nav-links");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close menu":"Open menu")});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));
document.querySelectorAll("[data-plan]").forEach(link=>link.addEventListener("click",()=>{document.querySelector("#service").value="1-on-1 mentorship";document.querySelector("#goals").value=`I'm interested in the ${link.dataset.plan} plan. `}));
document.querySelector("#inquiry-form").addEventListener("submit",event=>{event.preventDefault();const data=new FormData(event.currentTarget),subject=`MDCS coaching request — ${data.get("name")}`,body=`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nAthlete age / level: ${data.get("athlete")||"Not provided"}\nService: ${data.get("service")}\n\nGoals and details:\n${data.get("goals")||"Not provided"}`;window.location.href=`mailto:mitchellday33@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`});
document.querySelector("#year").textContent=new Date().getFullYear();

const heads = document.querySelectorAll(".price-head");
const mq = window.matchMedia("(max-width:820px)");

function setPlan(target){
  heads.forEach(h => h.setAttribute("aria-expanded", String(h === target)));
}
heads.forEach(h => h.addEventListener("click", () => {
  if (!mq.matches) return;
  setPlan(h.getAttribute("aria-expanded") === "true" ? null : h);
}));

function syncPlans(){
  if (mq.matches) {
    const openCount = [...heads].filter(h => h.getAttribute("aria-expanded") === "true").length;
    if (openCount !== 1)
      setPlan(document.querySelector(".price-card.featured .price-head"));
  } else {
    heads.forEach(h => h.setAttribute("aria-expanded","true"));
  }
}
mq.addEventListener("change", syncPlans);
syncPlans();

const bar = document.getElementById("mobile-bar");
const hero = document.querySelector(".hero");
if (bar && hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => {
    const show = !e.isIntersecting && mq.matches;
    bar.classList.toggle("show", show);
    bar.setAttribute("aria-hidden", String(!show));
    bar.querySelectorAll("a").forEach(a => a.tabIndex = show ? 0 : -1);
  }, { rootMargin: "-60px 0px 0px 0px" }).observe(hero);
}

const goals = document.getElementById("goals");
const deskPlaceholder = goals.placeholder;
function syncPlaceholder(){
  goals.placeholder = mq.matches ? goals.dataset.mobilePlaceholder : deskPlaceholder;
}
mq.addEventListener("change", syncPlaceholder);
syncPlaceholder();

window.addEventListener("scroll", () => {
  if (nav.classList.contains("open") && window.scrollY > 240) {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded","false");
  }
}, { passive: true });
