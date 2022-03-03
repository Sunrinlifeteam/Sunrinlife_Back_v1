/* eslint-disable prettier/prettier */
import { MySchedule } from '../../src/models/mySchedule';

test.each([
    [new Date(), 'today schedule'],
    [new Date(2022, 2, 3), 'schedule 1'],
    [new Date(1999, 12, 30), 'schedule 2'],
])('', (date, body) => {
    const original = { date, body };
    const obj = new MySchedule(date, body);
    expect(obj.date).toBe(date);
    expect(obj.body).toBe(body);
    expect(obj.toObject()).toEqual(original);
    expect(JSON.stringify(obj)).toBe(JSON.stringify(original));
    expect(MySchedule.fromObject(original)).toEqual(original);
    expect(MySchedule.fromJSON(JSON.stringify(original))).toEqual(original);
});
