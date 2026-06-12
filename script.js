/* ====================================
   SPOTLIGHT CURSOR
==================================== */

const spotlight = document.getElementById("spotlight");

document.addEventListener("mousemove", (e) => {

  spotlight.style.left = e.clientX + "px";
  spotlight.style.top = e.clientY + "px";

});

/* ====================================
   TYPING EFFECT
==================================== */

const typingElement =
document.getElementById("typing-text");

const roles = [

  "Cybersecurity Engineer",

  "Security Researcher",

  "Secure Software Developer",

  "Threat Detection Enthusiast",

  "AI Security Explorer"

];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  const currentRole =
  roles[roleIndex];

  if (!deleting) {

    typingElement.textContent =
    currentRole.substring(
      0,
      charIndex + 1
    );

    charIndex++;

    if (
      charIndex === currentRole.length
    ) {

      deleting = true;

      setTimeout(typeEffect, 1500);

      return;
    }

  } else {

    typingElement.textContent =
    currentRole.substring(
      0,
      charIndex - 1
    );

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      roleIndex++;

      if (
        roleIndex >= roles.length
      ) {
        roleIndex = 0;
      }

    }

  }

  setTimeout(
    typeEffect,
    deleting ? 50 : 100
  );

}

typeEffect();

/* ====================================
   SCROLL REVEAL
==================================== */

const revealElements =
document.querySelectorAll(

  ".glass-card," +
  ".project-card," +
  ".skill-card," +
  ".timeline-item," +
  ".cert-card"

);

function revealOnScroll() {

  revealElements.forEach(el => {

    const top =
    el.getBoundingClientRect().top;

    if (
      top <
      window.innerHeight - 100
    ) {

      el.classList.add("show");

    }

  });

}

window.addEventListener(
  "scroll",
  revealOnScroll
);

revealOnScroll();

/* ====================================
   ACHIEVEMENT COUNTERS
==================================== */

const counters =
document.querySelectorAll(
".achievement h3"
);

let counterStarted = false;

function startCounters() {

  if(counterStarted) return;

  const section =
  document.querySelector(
    ".achievement-bar"
  );

  const top =
  section.getBoundingClientRect().top;

  if(top > window.innerHeight)
  return;

  counterStarted = true;

  counters.forEach(counter => {

    const target =
    parseInt(
      counter.innerText
      .replace("+","")
    );

    let count = 0;

    const increment =
    Math.ceil(target / 40);

    const timer =
    setInterval(() => {

      count += increment;

      if(count >= target){

        counter.innerText =
        counter.innerText.includes("+")
        ? target + "+"
        : target;

        clearInterval(timer);

      } else {

        counter.innerText =
        counter.innerText.includes("+")
        ? count + "+"
        : count;

      }

    },30);

  });

}

window.addEventListener(
  "scroll",
  startCounters
);

startCounters();

/* ====================================
   NAVBAR SCROLL EFFECT
==================================== */

const navbar =
document.querySelector(".navbar");

window.addEventListener(
  "scroll",
  () => {

    if(window.scrollY > 50){

      navbar.style.background =
      "rgba(5,8,22,.95)";

      navbar.style.boxShadow =
      "0 10px 40px rgba(0,0,0,.3)";

    }

    else{

      navbar.style.background =
      "rgba(5,8,22,.7)";

      navbar.style.boxShadow =
      "none";

    }

  }
);

/* ====================================
   CYBER NETWORK BACKGROUND
==================================== */

const grid =
document.getElementById(
"cyber-grid"
);

const network =
document.createElement(
"canvas"
);

network.id = "network";

document.body.appendChild(
network
);

const ctx =
network.getContext("2d");

function resizeCanvas(){

  network.width =
  window.innerWidth;

  network.height =
  window.innerHeight;

}

resizeCanvas();

window.addEventListener(
  "resize",
  resizeCanvas
);

const nodes = [];

for(let i=0;i<70;i++){

  nodes.push({

    x:Math.random()*
      window.innerWidth,

    y:Math.random()*
      window.innerHeight,

    vx:(Math.random()-0.5)*0.4,

    vy:(Math.random()-0.5)*0.4

  });

}

function animateNetwork(){

  ctx.clearRect(
    0,
    0,
    network.width,
    network.height
  );

  nodes.forEach(node=>{

    node.x += node.vx;
    node.y += node.vy;

    if(
      node.x < 0 ||
      node.x > network.width
    ){
      node.vx *= -1;
    }

    if(
      node.y < 0 ||
      node.y > network.height
    ){
      node.vy *= -1;
    }

    ctx.beginPath();

    ctx.arc(
      node.x,
      node.y,
      2,
      0,
      Math.PI*2
    );

    ctx.fillStyle =
    "#00E5FF";

    ctx.fill();

  });

  for(let i=0;i<nodes.length;i++){

    for(let j=i+1;
        j<nodes.length;
        j++){

      const dx =
      nodes[i].x -
      nodes[j].x;

      const dy =
      nodes[i].y -
      nodes[j].y;

      const distance =
      Math.sqrt(
        dx*dx +
        dy*dy
      );

      if(distance < 130){

        ctx.beginPath();

        ctx.moveTo(
          nodes[i].x,
          nodes[i].y
        );

        ctx.lineTo(
          nodes[j].x,
          nodes[j].y
        );

        ctx.strokeStyle =
        `rgba(0,229,255,${
          1-distance/130
        })`;

        ctx.stroke();

      }

    }

  }

  requestAnimationFrame(
    animateNetwork
  );

}

animateNetwork();

/* ====================================
   PROJECT CARD TILT
==================================== */

document
.querySelectorAll(
".project-card"
)
.forEach(card=>{

  card.addEventListener(
    "mousemove",
    e=>{

      const rect =
      card.getBoundingClientRect();

      const x =
      e.clientX - rect.left;

      const y =
      e.clientY - rect.top;

      const rotateX =
      ((y / rect.height)-0.5)
      * -12;

      const rotateY =
      ((x / rect.width)-0.5)
      * 12;

      card.style.transform =
      `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
      `;

    }
  );

  card.addEventListener(
    "mouseleave",
    ()=>{

      card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    }
  );

});

/* ====================================
   ACTIVE NAV LINK
==================================== */

const sections =
document.querySelectorAll(
"section"
);

const navLinks =
document.querySelectorAll(
".navbar nav a"
);

window.addEventListener(
"scroll",
()=>{

  let current = "";

  sections.forEach(sec=>{

    const top =
    window.scrollY;

    const offset =
    sec.offsetTop - 150;

    const height =
    sec.offsetHeight;

    if(
      top >= offset &&
      top < offset + height
    ){

      current =
      sec.getAttribute("id");

    }

  });

  navLinks.forEach(link=>{

    link.classList.remove(
      "active"
    );

    if(
      link.href.includes(current)
    ){

      link.classList.add(
        "active"
      );

    }

  });

});