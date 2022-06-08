import fs from 'fs';

export default async () => {
    const folders = ['./tmp', './data'];
    for (const folder of folders) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    }
};
