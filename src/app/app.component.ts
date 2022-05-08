import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TestObservableService } from './app.testObservableService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    public resultSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private srv: TestObservableService) {

    }
    ngOnInit(): void {
        this.srv.getObs().subscribe(value => {
            this.boolenizeIt(value);
        })
    }
    private boolenizeIt(value: number): void {
        this.resultSubject$.next(!!value);
    }
}
