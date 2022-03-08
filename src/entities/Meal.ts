import { Injectable } from '@decorators/di';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('meal')
@Injectable()
export class MealEntity {
    @PrimaryColumn({ type: 'date', nullable: false })
    date: string;

    @Column({ nullable: false })
    mealType: string;

    @Column({ nullable: false })
    meal: string;
}
