import{Request, Response} from 'express';
import {container} from 'tsyringe';

import ListProviderMonthAvailabilityController from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController{
    public async index(request :Request,response: Response): Promise<Response>{
        const {provider_id} = request.params;
        const { month, year} = request.body;

        const listProviderMonthAvailabilityController = container.resolve(ListProviderMonthAvailabilityController);

        const availability = await listProviderMonthAvailabilityController.execute({
            provider_id,
            month,
            year,
        });

        return response.json(availability);
    }
}
