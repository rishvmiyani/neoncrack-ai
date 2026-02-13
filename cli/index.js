#!/usr/bin/env node
import zxcvbn from 'zxcvbn';
import { calculateEntropy, analyzeComposition } from '../src/password-analyzer.js';

const chalk = require('chalk');
const figlet = require('figlet');

console.log(chalk.cyan(figlet.textSync('NeonCrack', { font: 'Small' })));
console.log(chalk.gray('AI Password Strength Analyzer v4.0\n'));

const args = process.argv.slice(2);
const password = args[0];

if (!password) {
  console.log(chalk.yellow('Usage: npx neoncrack-ai "yourpassword"'));
  console.log(chalk.gray('Or pipe: echo "password" | npx neoncrack-ai'));
  process.exit(1);
}

const result = zxcvbn(password);
const entropy = calculateEntropy(password);
const composition = analyzeComposition(password);

console.log(chalk.bold.cyan('🔍 ANALYSIS RESULTS:\n'));

// Score bar
const bar = '█'.repeat(result.score * 5) + '░'.repeat(20 - result.score * 5);
console.log(chalk.gray(`Strength: [${bar}] ${result.score}/4 (${Math.round(result.score * 25)}%)`));

// Metrics
console.log(chalk.white(`Length: ${composition.length} chars`));
console.log(chalk.magenta(`Entropy: ${entropy} bits`));
console.log(chalk.green(`Crack time: ${result.crack_times_display.offline_slow_hashing_1e4_per_second.display}`));

// Warnings
if (result.feedback.warning) {
  console.log(chalk.red.bold('🚨'), result.feedback.warning);
}

result.feedback.suggestions.slice(0, 2).forEach(suggestion => {
  console.log(chalk.yellow('💡'), suggestion);
});

console.log('\n' + chalk.cyan('⭐ Star us on GitHub: https://github.com/YOURNAME/neoncrack-ai'));
