import path from 'node:path';
import { addComponents } from './commands/add.js';
import { doctorProject } from './commands/doctor.js';
import { initProject } from './commands/init.js';
import { migrateRadix } from './commands/migrate.js';
import { checkTokens, initTokens } from './commands/tokens.js';
import { componentNames } from './registry.js';

const help = `Sillar CLI

Usage:
  sillar init [--cwd <path>] [--force]
  sillar add <component...> [--cwd <path>] [--force]
  sillar doctor [--cwd <path>]
  sillar migrate radix [--cwd <path>] [--report] [--force]
  sillar tokens init [--brand <hex>] [--cwd <path>] [--force]
  sillar tokens check [--cwd <path>]
  sillar list
  sillar --help
`;

function parseArguments(argv) {
  const positionals = [];
  let cwd = process.cwd();
  let force = false;
  let report = false;
  let brand;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--cwd') {
      const value = argv[index + 1];
      if (!value || value.startsWith('-')) throw new Error('--cwd requires a path.');
      cwd = path.resolve(value);
      index += 1;
    } else if (argument === '--force') force = true;
    else if (argument === '--report') report = true;
    else if (argument === '--brand') {
      const value = argv[index + 1];
      if (!value || value.startsWith('-')) throw new Error('--brand requires a hex color.');
      brand = value;
      index += 1;
    }
    else if (argument === '--help' || argument === '-h') positionals.push('help');
    else if (argument.startsWith('-')) throw new Error(`Unknown option: ${argument}`);
    else positionals.push(argument);
  }
  return { command: positionals[0] ?? 'help', values: positionals.slice(1), cwd, force, report, brand };
}

export async function run(argv, output = console.log) {
  const { command, values, cwd, force, report, brand } = parseArguments(argv);
  if (command === 'help') return output(help);
  if (command === 'list') return output(componentNames.join('\n'));
  if (command === 'init') return initProject({ cwd, force, output });
  if (command === 'add') return addComponents({ cwd, names: values, force, output });
  if (command === 'migrate') {
    if (values[0] !== 'radix') throw new Error('Choose a migration target. Available: radix.');
    return migrateRadix({ cwd, report, force, output });
  }
  if (command === 'tokens') {
    if (values[0] === 'init') return initTokens({ cwd, brand, force, output });
    if (values[0] === 'check') return checkTokens({ cwd, output });
    throw new Error('Choose a tokens command. Available: init, check.');
  }
  if (command === 'doctor') {
    const result = await doctorProject({ cwd, output });
    if (!result.healthy) process.exitCode = 1;
    return result;
  }
  throw new Error(`Unknown command: ${command}. Run "sillar --help".`);
}
