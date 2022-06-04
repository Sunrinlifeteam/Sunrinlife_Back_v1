export function isNumberic(value: any): boolean {
    return !isNaN(value) && !isNaN(parseInt(value));
}
