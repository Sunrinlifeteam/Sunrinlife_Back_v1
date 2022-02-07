import { Attachment, Notice } from '../../src/services/notice'

test.each([
    [1,'notice title','notice content',new Date(),new Date(),[]],
    [2,'notice titlee','notice contentee',new Date(2022, 2, 3),new Date(2022, 2, 3),[]],
    [3,'notice titleee','notice contenteee',new Date(2005, 1, 21),new Date(2005, 1, 21),[new Attachment("notice.txt", Buffer.from("Testt"), "text/plain")]]
])("", (id, title, content, created, updated, attachment) => {
    const original = { id, title, content, created, updated, attachment };
    const obj = new Notice(id, title, content, created, updated, attachment)
    expect(obj.id).toBe(id)
    expect(obj.title).toBe(title)
    expect(obj.content).toBe(content)
    expect(obj.created).toBe(created)
    expect(obj.updated).toBe(updated)
    expect(obj.attachment).toBe(attachment)
    expect(obj.toObject()).toEqual(original)
    expect(obj.toJSON()).toBe(JSON.stringify(original))
    expect(Notice.fromObject(original)).toEqual(original)
    expect(Notice.fromJSON(JSON.stringify(original))).toEqual(original)
})