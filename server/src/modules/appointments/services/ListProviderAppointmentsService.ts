
import {injectable, inject} from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { classToClass } from 'class-transformer';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderAppointmenstService {

    constructor (
        @inject('AppointmentsRepository')
        private appointmentRepository : IAppointmentRepository,

        @inject('CacheProvider')
        private cacheProvider : ICacheProvider,
    ){}

    public async execute({
        provider_id,
        day,
        month,
        year
    }: IRequest): Promise<Appointment[]> {

        const cacheKey = `providers-appointments:${provider_id}:${year}-${month}-${day}`

        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey
        );

        if (!appointments){
            appointments = await this.appointmentRepository.findAllInDayFromProvider({
                provider_id,
                day,
                month,
                year
            });

            await this.cacheProvider.save(
                cacheKey,
                classToClass(appointments)
            );
        }


        return appointments;
    }
}
export default ListProviderAppointmenstService;
