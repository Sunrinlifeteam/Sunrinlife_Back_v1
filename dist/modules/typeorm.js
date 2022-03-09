"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Month = exports.Week = exports.Today = void 0;
const luxon_1 = require("luxon");
const typeorm_1 = require("typeorm");
function Today() {
    return luxon_1.DateTime.now().toFormat('yyyy-MM-dd');
}
exports.Today = Today;
function Week(start) {
    return (0, typeorm_1.Between)(start.toFormat('yyyy-MM-dd'), start.plus({ weeks: 1 }).toFormat('yyyy-MM-dd'));
}
exports.Week = Week;
function Month(start) {
    return (0, typeorm_1.Between)(start.toFormat('yyyy-MM-dd'), start.plus({ months: 1 }).toFormat('yyyy-MM-dd'));
}
exports.Month = Month;
//# sourceMappingURL=typeorm.js.map