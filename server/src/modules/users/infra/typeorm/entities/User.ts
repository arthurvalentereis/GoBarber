import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    avatar: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    // eslint-disable-next-line camelcase
    created_at: Date;

    @UpdateDateColumn()
    // eslint-disable-next-line camelcase
    updated_at: Date;

    @Expose({ name: 'avatar_url'})
    getAvatar_url(): string | null{
        return this.avatar
            ? `${process.env.APP_API_URL}/files/${this.avatar}`
            : null

    }
}

export default User;
