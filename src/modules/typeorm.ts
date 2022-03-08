import { DateTime } from 'luxon';
import { Between } from 'typeorm';

export function Today() {
    return DateTime.now().toFormat('yyyy-MM-dd');
}

export function Week(start: DateTime) {
    return Between(
        start.toFormat('yyyy-MM-dd'),
        start.plus({ weeks: 1 }).toFormat('yyyy-MM-dd')
    );
}

export function Month(start: DateTime) {
    return Between(
        start.toFormat('yyyy-MM-dd'),
        start.plus({ months: 1 }).toFormat('yyyy-MM-dd')
    );
}
