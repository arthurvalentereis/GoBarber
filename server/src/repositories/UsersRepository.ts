import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async findByDate(date: Date): Promise<User | null> {
        const findUser = await this.findOne({
            where: { date },
        });

        return findUser || null;
    }
}

export default UserRepository;
