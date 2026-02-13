export function initVisuals() {
  return {
    update(result) {
      if (!result) return;
      
      updateCrackTimeBar(result);
      updateScoreDisplay(result.score);
      updateEntropyDisplay(result.entropy);
    }
  };
}

function updateCrackTimeBar(result) {
  const bar = document.getElementById('crackTimeBar');
  const display = document.getElementById('crackTimeDisplay');
  
  // Score 0-4 → Bar 0-100%
  const strength = Math.min(result.score * 25, 100);
  bar.style.width = strength + '%';
  
  // Dynamic color gradient (red→green)
  const hue = 120 - (strength / 100) * 120; // Red(0) → Green(120)
  bar.style.background = `linear-gradient(90deg, hsl(${hue}, 80%, 50%), hsl(${hue + 30}, 80%, 60%))`;
  
  // Neon glow intensity
  const glow = Math.min(strength / 20, 1);
  bar.style.boxShadow = `0 0 ${20 + glow * 40}px hsl(${hue}, 100%, 50%)`;
  
  // Crack time text (fastest scenario)
  const crackTimes = result.crackTimes || {};
  const fastest = Object.values(crackTimes).sort().shift() || 'Instant';
  display.textContent = fastest;
}

function updateScoreDisplay(score) {
  const display = document.getElementById('scoreDisplay');
  display.textContent = `${Math.round(score * 25)}%`;
  
  // Color code score
  const colors = ['#ff4444', '#ff8844', '#ffdd44', '#88ff44', '#44ff44'];
  display.style.color = colors[score] || '#44ff44';
}

function updateEntropyDisplay(entropy) {
  const display = document.getElementById('entropyDisplay');
  display.textContent = entropy || 0;
}
