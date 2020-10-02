/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    constructor (private appointmentsRepository: IAppointmentsRepository ){}

    public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

        const appointmentData = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentData,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked', 401);
        }
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentData,
        });

        return appointment;
    }
}
export default CreateAppointmentService;
