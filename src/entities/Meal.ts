import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class Meal extends BaseEntity {
    @PrimaryColumn({ type: 'date', nullable: false })
    date: string;

    @Column({ nullable: false })
    mealType: string;

    @Column({ nullable: false })
    meal: string;
}
