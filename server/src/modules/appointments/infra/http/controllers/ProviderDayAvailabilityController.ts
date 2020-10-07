import{Request, Response} from 'express';
import {container} from 'tsyringe';

import ListProviderDayAvailabilityController from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController{
    public async index(request :Request,response: Response): Promise<Response>{
        const {provider_id,day, month, year} = request.body;

        const listProviderDayAvailabilityController = container.resolve(ListProviderDayAvailabilityController);

        const providers = await listProviderDayAvailabilityController.execute({
            provider_id,
            day,
            month,
            year,
        });

        return response.json(providers);
    }
}
