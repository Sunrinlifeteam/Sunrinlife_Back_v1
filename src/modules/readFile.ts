import fs from 'fs';

export function readFileSync(path: string): string | null {
    try {
        return fs.readFileSync(path, { encoding: 'utf8' });
    } catch (err) {
        console.log(err);
        return null;
    }
}
