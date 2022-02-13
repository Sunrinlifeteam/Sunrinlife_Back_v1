import 'dotenv/config';
import { DateTime } from 'luxon';
import { NeisOpenAPI } from '../modules/synchronizer';

/**
 * @param interval 다음 실행까지 대기하는 시간(초)
 */
export default async (interval: number) => {
    const run = () => {
        NeisOpenAPI.SchoolSchedule(
            DateTime.now().minus({ months: 1 }),
            DateTime.now().plus({ months: 1 })
        );
    };
    run();
    setInterval(run, interval * 1000);
};
