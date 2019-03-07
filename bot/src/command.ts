import "./resources/config";
import { Collection, RichEmbed } from "discord.js";
import { reload } from "./resources/config";

export type Alias = {
    isAlias: boolean,
    commandAlias?: string,
    commandOptions?: Collection<string, any>
}

interface Dictionary<T> {
    [index: string]: T;
}

export class RichCommand {
    constructor(
        public title:                   string,
        public category:                string,
        public description: string | RichEmbed,
        public hasArgs:                boolean,
        public alias:                    Alias,
        public fileReference:           string,
    ) {
    }
}

export class RichCommandManager {
    private commandCollection: Collection<string, RichCommand>;
    constructor(public file: string, public commandPath?: string) {

    }
    get(command: string): Promise<RichCommand> {
        return new Promise((resolve, reject) => {
            if (Object.keys(this.commandCollection).includes(command))
                return resolve(this.commandCollection[command]);
            else
                return reject(`Command '${command}' not found in command collection from module '${this.commandPath}${this.file}'`);
        });
    }
    set(command: RichCommand): this {
        this.commandCollection[command.title] = command;
        return this;
    }
    remove(command: RichCommand): this {
        delete this.commandCollection[command.title];
        return this;
    }
    add(command: RichCommand): this {
        if (!this.has(command)) this.commandCollection[command.title] = command;
        return this;
    }
    update(command: RichCommand): this {
        if (this.has(command)) this.commandCollection[command.title] = command;
        return this;
    }
    has(command: string | RichCommand): boolean {
        const index = command instanceof RichCommand ? command.title : command;
        return Object.keys(this.commandCollection).includes(index);
    }
    includes(commands: Array<string | RichCommand>) {
        return commands.reduce((acc: boolean, cur: string | RichCommand) => acc && this.has(cur), true);
    }
    launch(): this {
        reload(this.file);
        this.commandCollection = require(this.file);
        return this;
    }
    execute(command: string, options?: Object): Promise<any> {
        if (!this.has(command)) return Promise.reject(`Command '${command}' not found in command collection from module '${this.commandPath}${this.file}'`);
    
        let item = this.commandCollection[command];
        const args = options;

        if (item.alias && item.alias.isAlias) {
            Object.assign(args, item.alias.commandOptions);
            item = this.commandCollection[item.alias.commandAlias];
        }

        const path = this.commandPath + item.fileReference;
        reload(path);
        const commandFunction = require(path);

        return commandFunction(args);
    }

}