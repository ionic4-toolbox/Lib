import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SamuraiService } from './samurai.service';
import { Samurai } from './samurai.model';

//import { MaterialModule } from '@angular/material';

@Component({
    //moduleId: "test"module.id,
    selector: 'samurai',
    templateUrl: './samurai.component.html',
    //styleUrls: ['activity.component.css'],
    providers: [SamuraiService]
})

export class SamuraiComponent implements OnInit {
    samurais: Samurai[];
    selectedSamurai: Samurai;
    constructor(
        private samuraiService: SamuraiService,
        private router: Router) { }

    ngOnInit(): void {
        this.loadSamurais();
    }

    gotoDetail(samurai: Samurai): void {
        let link = ['/detail', samurai.id];
        this.router.navigate(link);
    }

    //loadSamurais() {
    //    this.samuraiService.getSamurais()
    //        .then(
    //        samurais => {
    //            this.samurais = samurais;
    //        }, //Bind to view
    //        err => {
    //            // Log errors if any
    //            console.log(err);
    //        });
    //}

    loadSamurais() {
        this.samuraiService.getSamurais()
            .subscribe(
            samurais => {
                this.samurais = samurais;
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.samuraiService.create(name)
            .then(activity => {
                this.samurais.push(activity);
                this.selectedSamurai = null;
            });
    }
}