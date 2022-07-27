#!/usr/bin/env node

import 'dotenv/config';
import yargs from 'yargs';

import { parse } from './lib/parser.js';

const argv = yargs(process.argv.slice(2))
      .env('SKELAPI')
      .usage('Usage: $0 <command> [options]')
      .command({ command: 'get <resource> <resource-id> [options]',
                 desc: 'run a GET request on <resource> using the relevant <resource-id>',
                 builder: (yargs) =>
                 { return yargs
                   .option('within',
                           { alias: ['w', 'i'],
                             describe: 'The id of the target endpoint, if needed'
                           })
                   .option('pretty-print',
                           { alias: ['p'],
                             describe: 'Pretty-print the output',
                           })
                 }
               })
      .command({ command: 'mass-delete <resource> <resource-id> [options]',
                 desc: 'delete all of <resource> with given <resource-id>',
                 builder: (yargs) =>
                 { return yargs
                   .option('within',
                           { alias: ['w', 'i'],
                             describe: 'The id of the target endpoint, if needed',
                           })
                 }
               })
      .option('env',
              { describe: 'Environment to run request in.',
                requiresArg: true,
                demandOption: true,
                alias: ['e']
              })
      .option('access-token',
              { describe: 'Developer access token.',
                requiresArg: true,
                demandOption:true,
                alias: ['a','t', 'token']
              })
      .help('h')
      .alias('h', 'help')
      .count('verbose')
      .alias('v', 'verbose')
      .argv;

if (argv.version) {
    console.log(process.version);
    process.exit(0);
}

(async () => {

    parse(argv);
 
})();
