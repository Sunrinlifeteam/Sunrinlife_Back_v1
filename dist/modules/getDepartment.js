"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentByClass = void 0;
const constants_1 = require("../constants");
function getDepartmentByClass(userClass) {
    if (userClass < 4)
        return constants_1.departments[0];
    else if (userClass < 7)
        return constants_1.departments[1];
    else if (userClass < 10)
        return constants_1.departments[2];
    return constants_1.departments[3];
}
exports.getDepartmentByClass = getDepartmentByClass;
//# sourceMappingURL=getDepartment.js.map