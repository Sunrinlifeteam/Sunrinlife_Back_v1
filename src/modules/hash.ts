import crypto from 'crypto';

export function SHA256(data: string) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

export function MD5(data: string) {
    return crypto.createHash('md5').update(data).digest('hex');
}
