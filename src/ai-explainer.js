export function initAI() {
  return {
    explain(result) {
      if (!result) return;
      const explanation = generateExplanation(result);
      document.getElementById('aiExplanation').textContent = explanation;
    }
  };
}

function generateExplanation(result) {
  const scoreLabels = ['🛑 CRITICAL', '⚠️ WEAK', '⚡ FAIR', '✅ GOOD', '🔒 STRONG'];
  
  let explanation = `${scoreLabels[result.score] || '🔒'} STRENGTH\n\n`;
  
  // Score breakdown
  explanation += `Score: ${result.score}/4 (${Math.round(result.score * 25)}%)\n`;
  explanation += `Length: ${result.passwordLength} chars\n`;
  explanation += `Entropy: ${result.entropy} bits\n\n`;
  
  // Critical warnings
  if (result.feedback?.warning) {
    explanation += `🚨 ${result.feedback.warning}\n\n`;
  }
  
  // Pattern analysis
  if (result.passwordLength < 12) {
    explanation += `📏 SHORT: <12 chars vulnerable to GPU attacks\n`;
  }
  
  if (result.entropy < 60) {
    explanation += `🎲 LOW ENTROPY: Needs more randomness\n`;
  }
  
  // Specific improvements
  const suggestions = result.feedback?.suggestions || [];
  if (suggestions.length > 0) {
    explanation += `\n💡 FIX: ${suggestions[0]}\n`;
  }
  
  // Pentester recommendation
  const recs = {
    0: 'REPLACE IMMEDIATELY - Dictionary word detected',
    1: 'UPGRADE - Common pattern + short length', 
    2: 'MINIMUM - Add symbols + length',
    3: 'ACCEPTABLE - Good for most sites',
    4: 'EXCELLENT - Corporate/government grade'
  };
  explanation += `\n🎯 PENTESTER: ${recs[result.score] || 'UNBREAKABLE'}`;
  
  return explanation;
}
