import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository :FakeUsersRepository;
let listProviders : ListProvidersService;

describe('UpdateProfile', ()=>{
    beforeEach(() =>{
        fakeUsersRepository = new FakeUsersRepository();
        listProviders = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the profile ', async ()=>{

        const user1 = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondon@gmail.com',
            password: '123123'
        })

        const user2 = await fakeUsersRepository.create({
            name: 'Jhon Trê',
            email: 'jhondon@gmail.com',
            password: '123123'
        })

        const loggedUser = await fakeUsersRepository.create({
            name: 'Jhon Qua',
            email: 'jhondon@gmail.com',
            password: '123123'
        })

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);

    });

});
