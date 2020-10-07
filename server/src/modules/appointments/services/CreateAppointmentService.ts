/* eslint-disable camelcase */
import { startOfHour, isBefore, getHours } from 'date-fns';
import {injectable, inject} from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}
@injectable()
class CreateAppointmentService {
    constructor (
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {

        const appointmentData = startOfHour(date);

        if(isBefore(appointmentData, Date.now())){
            throw new AppError("You can't create an appointment on a past date");
        };

        if(user_id === provider_id){
            throw new AppError("You can't create an appointment with yourself");
        }

        if(getHours(appointmentData) <8 || getHours(appointmentData) > 17){
            throw new AppError('You can only create appointments between 8am and 5pm');
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentData,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked', 401);
        }
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentData,
        });

        return appointment;
    }
}
export default CreateAppointmentService;
