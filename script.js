// CHANGE THESE 3 LINES ONLY
const EVENT_DATE = '2026-11-13T15:00:00'; // Rolling Loud date/time
const COUPLE_MESSAGE = 'Counting down till we outside together 🌴🎡🎤';
const APP_NAME = 'Rolling Loud Countdown';

document.title = APP_NAME;
document.getElementById('loveNote').textContent = COUPLE_MESSAGE;

const ids = ['days','hours','minutes','seconds'];
function pad(n){ return String(n).padStart(2,'0'); }
function tick(){
  const target = new Date(EVENT_DATE).getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000); diff %= 3600000;
  const m = Math.floor(diff / 60000); diff %= 60000;
  const s = Math.floor(diff / 1000);
  [d,h,m,s].forEach((v,i)=> document.getElementById(ids[i]).textContent = i ? pad(v) : v);
  if(target - now <= 0) document.getElementById('loveNote').textContent = 'IT’S TIME. FESTIVAL MODE ACTIVATED 🔥';
}
tick(); setInterval(tick,1000);

// Animated stars/confetti canvas
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
addEventListener('resize', resize); resize();
function resetParticle(){
  return { x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*2+0.4, vx:(Math.random()-.5)*.25, vy:Math.random()*.45+.08, hue:Math.random()*360 };
}
for(let i=0;i<130;i++) particles.push(resetParticle());
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.y > canvas.height+10 || p.x < -10 || p.x > canvas.width+10) Object.assign(p, resetParticle(), {y:-10});
    ctx.beginPath();
    ctx.fillStyle = `hsla(${p.hue},100%,70%,.75)`;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// WebAudio festival beat. No copyrighted audio files needed.
let audioCtx, beatTimer, playing = false;
const btn = document.getElementById('musicBtn');
function tone(freq, dur, type='sine', gain=.08){
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type; osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + dur);
  osc.connect(g); g.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + dur);
}
function kick(){ tone(70,.18,'sine',.18); }
function hat(){ tone(9500,.035,'square',.025); }
function bass(){ tone([110,130,98,146][Math.floor(Math.random()*4)],.12,'sawtooth',.045); }
function startBeat(){
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  let step = 0;
  beatTimer = setInterval(()=>{
    if(step % 4 === 0) kick();
    if(step % 2 === 0) hat();
    if(step % 8 === 4) bass();
    step++;
  },150);
}
btn.addEventListener('click',()=>{
  playing = !playing;
  if(playing){ startBeat(); btn.textContent = '⏸ Stop Beat'; }
  else { clearInterval(beatTimer); btn.textContent = '▶ Festival Beat'; }
});

const vibes = [
  ['#ff2bd6','#00f5ff','#b8ff32'],
  ['#ff5f1f','#7c3cff','#00ffd5'],
  ['#ffcc00','#ff006e','#3a86ff'],
  ['#00ff87','#60efff','#ff2e63']
];
let vibe = 0;
document.getElementById('vibeBtn').addEventListener('click',()=>{
  vibe = (vibe + 1) % vibes.length;
  document.documentElement.style.setProperty('--hot', vibes[vibe][0]);
  document.documentElement.style.setProperty('--cyan', vibes[vibe][1]);
  document.documentElement.style.setProperty('--lime', vibes[vibe][2]);
});
