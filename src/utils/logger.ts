Memory.logLevel = Memory.logLevel || "info";

const LOG_LEVEL: { [level in LogLevel]: number } = {
    prompt: 0,
    assert: 1,
    error: 1,
    report: 2,
    info: 3,
    debug: 4,
    silly: 5
}

const LOG_COLOR: { [level in LogLevel]?: string } = {
    prompt: "yellow",
    assert: "red",
    error: "red",
    report: "white"
}

let origLogFunc = console.log;
function logConsole(level: LogLevel, message: string) {
    if (LOG_LEVEL[level] <= LOG_LEVEL[Memory.logLevel]) {
        if (LOG_COLOR[level]) {
            message = `<span style='color:${LOG_COLOR[level]}'>${message}</span>`;
        }
        origLogFunc(message);
    }
}

let operationToConfirm: {
    ok: () => void;
    cancel?: () => void;
    description: string;
    expire: number;
    key: number
};

const Logger = {
    prompt(message: string) {
        logConsole("prompt", message);
    },

    assert(message: string) {
        logConsole("assert", "Assertion Fail: " + message);
    },

    error(message: string) {
        logConsole("error", "Error: " + message);
    },

    report(message: string) {
        logConsole("report", message);
    },

    info(message: string) {
        logConsole("info", "[info ] " + message);
    },

    debug(message: string) {
        logConsole("debug", "[debug] " + message);
    },

    silly(message: string) {
        logConsole("silly", "[silly] " + message);
    },

    confirm(message: string, description: string, ok: () => void, cancel?: () => void) {
        if (operationToConfirm?.expire <= Game.time) {
            this.prompt(`Last operation (${operationToConfirm.description}) cancaled.`);
            if (operationToConfirm.cancel) operationToConfirm.cancel();
        }
        this.prompt(message);
        const key = _.random(1, 1000);
        this.prompt(`Type yes(${key}) to confirm operation ${description}.`);
        operationToConfirm = {
            description,
            ok,
            cancel,
            expire: Game.time + 30,
            key
        }
    }
}

global.yes = (key: number) => {
    if (!operationToConfirm) {
        Logger.prompt("Nothing to confirm.");
    } else if (operationToConfirm.expire < Game.time) {
        Logger.prompt(`Can't confirm operation ${operationToConfirm.description}. Expired.`);
    } else if (key !== operationToConfirm.key) {
        Logger.prompt(`Can't confirm operation ${operationToConfirm.description}. Wrong key.`);
    } else {
        Logger.prompt(`Operation ${operationToConfirm.description} confirmed`);
        operationToConfirm.ok();
        operationToConfirm = undefined;
    }
}

export default Logger;
