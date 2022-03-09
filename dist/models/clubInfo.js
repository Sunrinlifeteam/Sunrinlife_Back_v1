"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubInfo = void 0;
class ClubInfo {
    constructor(id, name, description, url, location, logo_url, facebook, instagram, leader, viceleader, leader_sns, vleader_sns, department, type, curriculum) {
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
    toObject() {
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
            curriculum: this.curriculum,
        };
    }
    toJSON() {
        return JSON.stringify(this.toObject);
    }
    static fromObject(data) {
        return new ClubInfo(data.id, data.name, data.description, data.url, data.location, data.logo_url, data.facebook, data.instagram, data.leader, data.viceleader, data.leader_sns, data.vleader_sns, data.department, data.type, data.curriculum);
    }
    static fromJSON(data) {
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
            curriculum: object['curriculum'],
        });
    }
}
exports.ClubInfo = ClubInfo;
//# sourceMappingURL=clubInfo.js.map