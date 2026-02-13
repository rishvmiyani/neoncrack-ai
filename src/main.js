import zxcvbn from "zxcvbn";
import { initAnalyzer } from "./password-analyzer.js";
import { initVisuals } from "./visualizations.js";
import { initAI } from "./ai-explainer.js";
import { initHIBP } from "./hibp.js";
import { initCharts } from "./charts.js";
import { utils } from "./utils.js";
import { NeuralAnalyzer } from './ai-neural.js';

console.log("🚀 NeonCrack AI v3.0 - ENTERPRISE FEATURES");

document.addEventListener("DOMContentLoaded", () => {
  initMatrixBackground();

  // Initialize ALL modules
  const analyzer = initAnalyzer(zxcvbn);
  const visuals = initVisuals();
  const ai = initAI();
  const hibp = initHIBP();
  const charts = initCharts();

  window.NeonCrack = { analyzer, visuals, ai, hibp, charts, utils };

  const input = document.getElementById("passwordInput");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const results = document.getElementById("results");
  const toggleBtn = document.getElementById("togglePassword");

  let debounceTimer;

  async function analyzeFull(password) {
    const result = analyzer.analyze(password);
    visuals.update(result);
    ai.explain(result);
    charts.updateComposition(result.composition);

    // HIBP breach check
    const breachData = await hibp.checkPassword(password);
    // Replace HIBP result line in analyzeFull():
    document.getElementById("hibpResult").innerHTML = breachData.isPwned
      ? `<span class="text-red-400 font-bold animate-pulse">🚨 COMPROMISED!</span><br><span class="text-orange-400">${breachData.breachCount || "25M+"} known appearances</span><br><span class="text-sm text-slate-400 mt-1">in major breaches worldwide</span>`
      : `<span class="text-emerald-400 font-bold">✅ CLEAN</span><br><span class="text-emerald-300/80">No known leaks detected</span>`;

    results.classList.remove("hidden");
    return result;
  }

  // MAIN BUTTON
  analyzeBtn.addEventListener("click", () => {
    const password = input.value.trim();
    if (password) {
      analyzeBtn.disabled = true;
      analyzeBtn.innerHTML = "🔄 Scanning Breaches...";

      analyzeFull(password).finally(() => {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML =
          '✅ ANALYZED <span class="ml-2 text-sm opacity-75">(click again)</span>';
        setTimeout(() => {
          analyzeBtn.innerHTML = "🔍 Analyze Password Strength";
        }, 3000);
      });
    }
  });

  // ENTER KEY + EYE TOGGLE (unchanged)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      analyzeBtn.click();
    }
  });

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    toggleBtn.textContent = isPassword ? "🙈" : "👁️";
  });

  // LIVE PREVIEW (no HIBP for perf)
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const password = input.value;

    if (password.length >= 4) {
      debounceTimer = setTimeout(() => {
        const result = analyzer.analyze(password);
        visuals.update(result);
        ai.explain(result);
        charts.updateComposition(result.composition);
        results.classList.remove("hidden");
      }, 400);
    } else {
      results.classList.add("hidden");
    }
  });
});

// Matrix (unchanged from Phase 2)
function initMatrixBackground() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const chars = "01アイウエオカキクケコサシスセソタチツテト";
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(10, 15, 30, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
      const text = chars[(Math.random() * chars.length) | 0];
      const brightness = 50 + Math.random() * 40;
      ctx.fillStyle = `hsl(180, 100%, ${brightness}%)`;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 60);
}

// GRAND MASTER IMPORTS + TRIPLE ENGINE

document.addEventListener('DOMContentLoaded', () => {
  // Initialize TRIPLE systems
  const neural = new NeuralAnalyzer();
  const canvasSystems = initTripleCanvas();
  const metrics = initHyperMetrics();
  
  window.NeonCrackAI = { neural, canvasSystems, metrics };
  
  // HYPER EVENT SYSTEM
  const input = document.getElementById('passwordInput');
  const analyzeBtn = document.getElementById('analyzeBtn');
  
  let analysisQueue = [];
  
  async function quantumAnalyze(password) {
    analyzeBtn.disabled = true;
    document.getElementById('btnIcon').textContent = '⚛️';
    document.getElementById('btnText').textContent = 'QUANTUM ANALYSIS...';
    
    // TRIPLE ANALYSIS PIPELINE
    const neuralResult = neural.analyze(password);
    const hibpResult = await checkDarkWeb(password);
    const quantumResult = simulateQuantumAttack(neuralResult.entropy);
    
    // UPDATE HYPER DASHBOARD
    updateHyperDashboard({ neuralResult, hibpResult, quantumResult });
    
    // ANIMATION CASCADE
    await animateScoreCascade(neuralResult.overall);
    await animateQuantumOrb(neuralResult.entropy);
    
    analyzeBtn.disabled = false;
    document.getElementById('btnIcon').textContent = '✅';
    document.getElementById('btnText').textContent = 'FORTRESS SECURED';
  }
  
  // BIND EVENTS
  analyzeBtn.onclick = () => quantumAnalyze(input.value);
  input.onkeydown = (e) => e.key === 'Enter' && quantumAnalyze(input.value);
  
  // LIVE NEURAL SCANNING
  input.oninput = debounce(() => {
    if (input.value.length > 3) {
      const result = neural.analyze(input.value);
      updateLivePreview(result);
      document.getElementById('results').classList.remove('hidden');
    }
  }, 200);
});

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
