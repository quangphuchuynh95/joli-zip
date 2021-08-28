import { spawn } from 'child_process';
import { lstatSync } from 'fs';

export interface ZipOptions {
  stopOnError?: boolean
  password?: string
  workingDirectory?: string
}

export function zip(
  entries: string[]|string,
  output: string,
  options?: ZipOptions,
) {
  return new Promise<void>((resolve, reject) => {
    const args = ['-r'];
    if (options?.password) {
      args.push('-P')
      args.push(options.password)
    }
    args.push(output)
    if (typeof entries === 'string') {
      args.push(entries)
    } else {
      args.push(...entries)
    }
    const statement = spawn('zip', args, {
      cwd: options?.workingDirectory
    });
    statement.on('exit', (code, signal) => {
      resolve();
    })
    statement.on('error', (e: Error) => {
      if (options?.stopOnError) {
        reject(e);
      } else {
        console.error(e);
      }
    })
  })
}

