import { CLUB_TYPE_VALUES } from '../constants';

export interface IClubInfo extends IClubInfoBody {
    id: number;
}

export interface IClubInfoBody {
    name: string;
    description: string;
    url: string;
    location: string;
    logo_url: string;
    facebook: string;
    instagram: string;
    leader: string;
    viceleader: string;
    leader_sns: string;
    vleader_sns: string;
    department: number;
    type: CLUB_TYPE_VALUES;
    curriculum: string;
}
