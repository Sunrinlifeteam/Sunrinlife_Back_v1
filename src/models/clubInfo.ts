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

export class ClubInfo implements IClubInfo {
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
    constructor(
        id: number,
        name: string,
        description: string,
        url: string,
        location: string,
        logo_url: string,
        facebook: string,
        instagram: string,
        leader: string,
        viceleader: string,
        leader_sns: string,
        vleader_sns: string,
        department: number,
        type: number,
        curriculum: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.location = location;
        this.logo_url = logo_url;
        this.facebook = facebook;
        this.instagram = instagram;
        this.leader = leader;
        this.viceleader = viceleader;
        this.leader_sns = leader_sns;
        this.vleader_sns = vleader_sns;
        this.department = department;
        this.type = type;
        this.curriculum = curriculum;
    }

    toObject(): IClubInfo {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            url: this.url,
            location: this.location,
            logo_url: this.logo_url,
            facebook: this.facebook,
            instagram: this.instagram,
            leader: this.leader,
            viceleader: this.viceleader,
            leader_sns: this.leader_sns,
            vleader_sns: this.vleader_sns,
            department: this.department,
            type: this.type,
            curriculum: this.curriculum
        };
    }

    toJSON(): string {
        return JSON.stringify(this.toObject);
    }

    static fromObject(data: IClubInfo): ClubInfo {
        return new ClubInfo(
            data.id,
            data.name,
            data.description,
            data.url,
            data.location,
            data.logo_url,
            data.facebook,
            data.instagram,
            data.leader,
            data.viceleader,
            data.leader_sns,
            data.vleader_sns,
            data.department,
            data.type,
            data.curriculum
        );
    }

    static fromJSON(data: string): ClubInfo {
        let object = JSON.parse(data);
        return ClubInfo.fromObject({
            id: +object['id'],
            name: object['name'],
            description: object['description'],
            url: object['url'],
            location: object['location'],
            logo_url: object['logo_url'],
            facebook: object['facebook'],
            instagram: object['instagram'],
            leader: object['leader'],
            viceleader: object['viceleader'],
            leader_sns: object['leader_sns'],
            vleader_sns: object['vleader_sns'],
            department: object['department'],
            type: object['type'],
            curriculum: object['curriculum']
        });
    }
}
