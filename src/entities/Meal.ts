import { Entity, Column, BaseEntity } from 'typeorm';

@Entity()
export class Meal extends BaseEntity {
    @Column({ type: 'string', nullable: false })
    date: string;

    @Column({ type: 'string', nullable: false })
    mealType: string;

    @Column({ type: 'string', nullable: false })
    meal: string;
}
