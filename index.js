"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
const child_process_1 = require("child_process");
function zip(entries, output, options) {
    return new Promise((resolve, reject) => {
        const args = ['-r'];
        if (options === null || options === void 0 ? void 0 : options.password) {
            args.push('-P');
            args.push(options.password);
        }
        args.push(output);
        if (typeof entries === 'string') {
            args.push(entries);
        }
        else {
            args.push(...entries);
        }
        const statement = (0, child_process_1.spawn)('zip', args, {
            cwd: options === null || options === void 0 ? void 0 : options.workingDirectory
        });
        statement.on('exit', (code, signal) => {
            resolve();
        });
        statement.on('error', (e) => {
            if (options === null || options === void 0 ? void 0 : options.stopOnError) {
                reject(e);
            }
            else {
                console.error(e);
            }
        });
    });
}
exports.zip = zip;
