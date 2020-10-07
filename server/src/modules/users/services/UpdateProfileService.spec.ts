import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository :FakeUsersRepository;
let fakeHashProvider :FakeHashProvider;
let updateProfile : UpdateProfileService;

describe('UpdateProfile', ()=>{
    beforeEach(() =>{
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
           fakeUsersRepository,
           fakeHashProvider,
       );
    });

    it('should be able update the profile ', async ()=>{

        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondon@gmail.com',
            password: '123123'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Trê',
            email: 'johntre@gmail.com'
        });

        expect(updatedUser.name).toBe('Jhon Trê');
        expect(updatedUser.email).toBe('johntre@gmail.com');

    });

    it('should not be able update the profile from non-existing user ', async ()=>{

        expect(updateProfile.execute({
            user_id: 'non-existing-user-id',
            name: 'teste',
            email: 'teste@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to change to another user email', async ()=>{

        await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@gmail.com',
            password: '123123'
        })

        const user = await fakeUsersRepository.create({
            name: 'teste',
            email: 'teste@gmail.com',
            password: '123123'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Trê',
            email: 'jhondoe@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should be able to update the password', async ()=>{

        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondon@gmail.com',
            password: '123456'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Trê',
            email: 'johntre@gmail.com',
            old_password: '123456',
            password: '123123'
        });

        expect(updatedUser.password).toBe('123123');

    });

    it('should not be able to update the password without old password', async ()=>{

        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondon@gmail.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Trê',
            email: 'johntre@gmail.com',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to update the password with wrong old password', async ()=>{

        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondon@gmail.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Trê',
            email: 'johntre@gmail.com',
            old_password: 'wrong-old-password',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);

    });
});
