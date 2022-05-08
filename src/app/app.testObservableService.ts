import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TestObservableService {
    private sub$: Subject<number> = new Subject<number>();

    private obs: Observable<number> = this.sub$.asObservable();

    public getObs(): Observable<number> {
        return this.obs;
    }
    public publishNew(value: number){
        this.sub$.next(value);
    }
}