export const utils = {
  formatTime(seconds) {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds/60)}m`;
    if (seconds < 86400) return `${Math.round(seconds/3600)}h`;
    if (seconds < 31536000) return `${Math.round(seconds/86400)}d`;
    if (seconds < 3.156e13) return `${Math.round(seconds/31536000)}y`;
    return '∞ eons';
  },
  
  getScoreColor(score) {
    const colors = ['#ff4444', '#ff8844', '#ffdd44', '#88ff44', '#44ff44'];
    return colors[score] || '#44ff44';
  }
};
