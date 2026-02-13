export function initAnalyzer(zxcvbn) {
  return {
    analyze(password) {
      if (!password) return null;
      
      const result = zxcvbn(password);
      
      // Custom calculations
      const entropy = calculateEntropy(password);
      const crackTimes = calculateCrackTimes(entropy);
      const composition = analyzeComposition(password);
      
      return {
        score: result.score,
        entropy,
        crackTimes,
        composition,
        feedback: result.feedback,
        passwordLength: password.length
      };
    }
  };
}

function calculateEntropy(password) {
  const freq = {};
  for (let char of password) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  let entropy = 0;
  const total = password.length;
  for (let count of Object.values(freq)) {
    const p = count / total;
    entropy -= p * Math.log2(p);
  }
  return Math.round(entropy * total);
}

function calculateCrackTimes(entropy) {
  const guesses = Math.pow(2, entropy);
  return {
    online: formatTime(guesses / 10000),  // Throttled
    offlineSlow: formatTime(guesses / 1e4),
    offlineFast: formatTime(guesses / 1e12)  // GPU
  };
}

function analyzeComposition(password) {
  return {
    length: password.length,
    lowercase: (password.match(/[a-z]/g) || []).length,
    uppercase: (password.match(/[A-Z]/g) || []).length,
    numbers: (password.match(/\d/g) || []).length,
    symbols: (password.match(/[^a-zA-Z0-9]/g) || []).length
  };
}

function formatTime(seconds) {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds/60)}m`;
  if (seconds < 86400) return `${Math.round(seconds/3600)}h`;
  if (seconds < 31536000) return `${Math.round(seconds/86400)}d`;
  return '∞ centuries';
}
