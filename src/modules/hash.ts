import crypto from 'crypto';

export function SHA256(data: string) {
    return crypto.createHash('sha256').update(data).digest('hex');
}
