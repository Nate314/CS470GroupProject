import { default as minimist } from "minimist";

export declare function require(moduleName: string): any;
export var process = { argv: [] }
export const getOptions = (process)=>minimist(process.argv.slice(2));