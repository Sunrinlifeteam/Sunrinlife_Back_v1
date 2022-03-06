import { DateTime } from 'luxon';

export class DateTimeBody {
    year: number;
    month: number;
    day: number;

    toDateTime() {
        return DateTime.fromObject(this);
    }
}
