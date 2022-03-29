export interface IClubInfo {
    id: number;
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
    type: number;
    curriculum: string;
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
    type: number;
    curriculum: string;
}
