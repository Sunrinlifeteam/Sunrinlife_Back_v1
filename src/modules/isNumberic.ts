export function isNumberic(string: any): boolean {
    return !isNaN(string) && !isNaN(parseInt(string));
}
