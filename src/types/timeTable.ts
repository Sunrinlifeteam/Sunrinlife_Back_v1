export interface ITimeTable extends ITimeTableBody {
    id: number;
}

export interface ITimeTableBody {
    alias: string;
    timeJson: string;
    current: boolean;
}
