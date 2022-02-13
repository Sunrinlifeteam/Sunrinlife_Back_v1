/* eslint-disable prettier/prettier */
import { MySchedule } from '../../src/models/mySchedule';
import { SaveFile } from '../save';

test.each([
    [new Date(), 'today schedule', 'nothing', []],
    [new Date(2022, 2, 3), 'schedule 1', 'nothing', []],
    [
        new Date(1999, 12, 30),
        'schedule 2',
        'attachment',
        [SaveFile('school.txt', 'Sunrin Internet High School', 'text/plain')],
    ],
])('', (date, title, body, attachment) => {
    const original = { date, title, body, attachment };
    const obj = new MySchedule(date, title, body, attachment);
    expect(obj.date).toBe(date);
    expect(obj.title).toBe(title);
    expect(obj.body).toBe(body);
    expect(obj.attachment).toBe(attachment);
    expect(obj.toObject()).toEqual(original);
    expect(JSON.stringify(obj)).toBe(JSON.stringify(original));
    expect(MySchedule.fromObject(original)).toEqual(original);
    expect(MySchedule.fromJSON(JSON.stringify(original))).toEqual(original);
});
