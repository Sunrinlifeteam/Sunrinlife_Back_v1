"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const luxon_1 = require("luxon");
const synchronizer_1 = require("../modules/synchronizer");
/**
 * @param interval 다음 실행까지 대기하는 시간(초)
 */
exports.default = async (interval) => {
    const run = () => {
        synchronizer_1.NeisOpenAPI.SchoolSchedule(luxon_1.DateTime.now().minus({ months: 1 }), luxon_1.DateTime.now().plus({ months: 1 }));
    };
    run();
    setInterval(run, interval * 1000);
};
//# sourceMappingURL=neisSyncer.js.map