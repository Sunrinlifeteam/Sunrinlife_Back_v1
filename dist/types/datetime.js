"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeBody = void 0;
const luxon_1 = require("luxon");
class DateTimeBody {
    toDateTime() {
        return luxon_1.DateTime.fromObject(this);
    }
}
exports.DateTimeBody = DateTimeBody;
//# sourceMappingURL=datetime.js.map