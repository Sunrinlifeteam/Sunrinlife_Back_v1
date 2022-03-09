"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeisOpenAPI = void 0;
const di_1 = require("@decorators/di");
const neis_1 = require("../constants/neis");
const Schedule_1 = require("../entities/Schedule");
const logger_1 = __importDefault(require("./logger"));
const neis_2 = require("./neis");
class NeisOpenAPI {
    static async SchoolSchedule(start, end) {
        const scheduleRepository = di_1.Container.get(Schedule_1.ScheduleEntity);
        const result = await this.parser.fetchByMonthRange(neis_1.DefaultParameterPreset, {
            SD_SCHUL_CODE: '',
            ...neis_1.SchoolParameterPreset,
        }, start, end);
        const old_records = await scheduleRepository.find();
        const records = [];
        for (let row of result.SchoolSchedule[1].row) {
            let obj = new Schedule_1.ScheduleEntity();
            obj.date = row.AA_YMD.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1-$2-$3');
            obj.type = row.SBTR_DD_SC_NM;
            if (row.SBTR_DD_SC_NM == '')
                obj.type = '해당없음';
            obj.name = row.EVENT_NM;
            obj.content = row.EVENT_CNTNT;
            obj.grade = [];
            if (row.ONE_GRADE_EVENT_YN == 'Y')
                obj.grade.push(1);
            if (row.TW_GRADE_EVENT_YN == 'Y')
                obj.grade.push(2);
            if (row.THREE_GRADE_EVENT_YN == 'Y')
                obj.grade.push(3);
            if (row.FR_GRADE_EVENT_YN == 'Y')
                obj.grade.push(4);
            if (row.FIV_GRADE_EVENT_YN == 'Y')
                obj.grade.push(5);
            if (row.SIX_GRADE_EVENT_YN == 'Y')
                obj.grade.push(6);
            records.push(obj);
        }
        logger_1.default.debug('synchronizer.NeisOpenAPI.SchoolSchedule', 'Schedule Loaded: ', records.length);
        scheduleRepository.save(records);
        scheduleRepository.remove(old_records);
        return result;
    }
}
exports.NeisOpenAPI = NeisOpenAPI;
NeisOpenAPI.parser = new neis_2.SchoolSchedule();
//# sourceMappingURL=synchronizer.js.map