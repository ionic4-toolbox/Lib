import { InMemoryDbService } from 'angular-in-memory-web-api';

import { INuPnPResponse } from './INuPnPResponse';

export class EnvironmentData implements InMemoryDbService {

    createDb() {
        //let sensors: ISensor[] = [
        let nupnp: INuPnPResponse[] = [{"id":"001788fffe7168c6","internalipaddress":"192.168.178.56"}];
        
        return  {nupnp} ;
    }
}
