import cfg from "config";
import { ErrorMapper } from "utils/errorMapper";
import Logger from "utils/logger";

function loadScript() {
    global.age = 0;
    Logger.prompt(`Restarting (build @ ${cfg.BUILD_TIME})...`);
    Logger.info(`Current game tick is ${Game.time}`);
    Logger.info(`Last load lasted for ${Memory.age} ticks.`);
}

if (Game) {
    ErrorMapper.wrap(loadScript, "loading script.")();
} else {
    Logger.error(`It seems that the code is running in wrong environment...`)
}

function clearMemory() {
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const runLoop = ErrorMapper.wrap(() => {
    Memory.age = ++global.age;

    if (Game.cpu.generatePixel && Game.cpu.bucket == 10000 && global.age > 10 && Memory.genPixel) {
        Game.cpu.generatePixel();
        Logger.info(`Used CPU in bucket to generate 1 pixel.`);
    }

    clearMemory();
}, "main loop");
