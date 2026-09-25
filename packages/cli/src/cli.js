import path from 'node:path';
import { addComponents } from './commands/add.js';
import { doctorProject } from './commands/doctor.js';
import { initProject } from './commands/init.js';
import { componentNames } from './registry.js';

const help = `Sillar CLI

Usage:
  sillar init [--cwd <path>] [--force]
  sillar add <component...> [--cwd <path>] [--force]
  sillar doctor [--cwd <path>]
  sillar list
  sillar --help
`;

function parseArguments(argv) {
  const positionals = [];
  let cwd = process.cwd();
  let force = false;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--cwd') {
      const value = argv[index + 1];
      if (!value || value.startsWith('-')) throw new Error('--cwd requires a path.');
      cwd = path.resolve(value);
      index += 1;
    } else if (argument === '--force') force = true;
    else if (argument === '--help' || argument === '-h') positionals.push('help');
    else if (argument.startsWith('-')) throw new Error(`Unknown option: ${argument}`);
    else positionals.push(argument);
  }
  return { command: positionals[0] ?? 'help', values: positionals.slice(1), cwd, force };
}

export async function run(argv, output = console.log) {
  const { command, values, cwd, force } = parseArguments(argv);
  if (command === 'help') return output(help);
  if (command === 'list') return output(componentNames.join('\n'));
  if (command === 'init') return initProject({ cwd, force, output });
  if (command === 'add') return addComponents({ cwd, names: values, force, output });
  if (command === 'doctor') {
    const result = await doctorProject({ cwd, output });
    if (!result.healthy) process.exitCode = 1;
    return result;
  }
  throw new Error(`Unknown command: ${command}. Run "sillar --help".`);
}
