// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global._ = require("lodash4");
console.log(`Custom lodash version: ${_.VERSION}, loading lodash took ${Game.cpu.getUsed()} CPU.`);
