import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { SensorEditComponent } from './sensor-edit.component';

@Injectable()
export  class SensorDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid sensor Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/sensors']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export  class SensorEditGuard implements CanDeactivate<SensorEditComponent> {

    canDeactivate(component: SensorEditComponent): boolean {
        if (component.sensorForm.dirty) {
            let sensorName = component.sensorForm.get('sensorName').value || 'New Sensor';
            return confirm(`Navigate away and lose all changes to ${sensorName}?`);
        }
        return true;
    }
}
