/* eslint-disable prettier/prettier */
import { SchoolNotice } from '../../src/models/schoolNotice';
import { SaveFile } from '../save';

test.each([
    [1, 'notice title', 'notice content', new Date(), []],
    [2, 'notice titlee', 'notice contentee', new Date(2022, 2, 3), []],
    [
        3,
        'notice titleee',
        'notice contenteee',
        new Date(2005, 1, 21),
        [SaveFile('notice.txt', 'Testt', 'text/plain')],
    ],
])('', (id, title, content, created, attachment) => {
    const original = { id, title, content, created, attachment };
    const obj = new SchoolNotice(id, title, content, created, attachment);
    expect(obj.id).toBe(id);
    expect(obj.title).toBe(title);
    expect(obj.content).toBe(content);
    expect(obj.created).toBe(created);
    expect(obj.attachment).toBe(attachment);
    expect(obj.toObject()).toEqual(original);
    expect(obj.toJSON()).toBe(JSON.stringify(original));
    expect(SchoolNotice.fromObject(original)).toEqual(original);
    expect(SchoolNotice.fromJSON(JSON.stringify(original))).toEqual(original);
});
