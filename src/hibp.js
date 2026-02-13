export function initHIBP() {
  return {
    async checkPassword(password) {
      try {
        // HIBP truncated SHA-1 lookup (safe, anonymous)
        const hash = await sha1(password);
        const prefix = hash.slice(0, 5).toUpperCase();
        const suffix = hash.slice(5).toLowerCase();
        
        // Fetch breach count (production HIBP endpoint)
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();
        
        // Check if our suffix exists in breaches
        const pwned = data.split('\n').some(line => 
          line.split(':')[0].toLowerCase() === suffix
        );
        
        return {
          isPwned: pwned,
          prefix,
          breachCount: data.split('\n').filter(line => line.includes(suffix)).length
        };
      } catch (error) {
        console.log('HIBP unavailable, continuing...');
        return { isPwned: false };
      }
    }
  };
}

// Simple SHA-1 (production ready)
async function sha1(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
