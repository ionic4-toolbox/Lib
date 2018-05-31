import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './ch0105-mock-heroes';

@Injectable()
export class Ch0105HeroService {

    // getHeroes(): Hero[] {
    //     return HEROES;
    // }
    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

}
