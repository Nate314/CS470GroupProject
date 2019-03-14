import { default as minimist } from "minimist";

export var process = { argv: [] }
export const getOptions = (process) => minimist(process.argv.slice(2));
export const dateToTimestamp = (date: Date) => JSON.parse(JSON.stringify(date.toJSON()).replace('Z', ''));
export const reload = (path: string) => {
    if (require.cache[path]) delete require.cache[path];
}

export const defaults = {
    dailyCurrency: 200,
}