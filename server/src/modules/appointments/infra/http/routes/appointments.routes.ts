/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();


appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {

    const appointmentsRepository = new AppointmentRepository();

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const creeateAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = await creeateAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
