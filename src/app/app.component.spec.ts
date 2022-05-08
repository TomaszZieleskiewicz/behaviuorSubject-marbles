import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { AppComponent } from './app.component';
import { TestObservableService } from './app.testObservableService';

describe('AppComponent', () => {
    let component: AppComponent;
    let serviceSpy: jasmine.SpyObj<TestObservableService>;
    let fixture:  ComponentFixture<AppComponent>;
    let scheduler: TestScheduler
    beforeEach(async () => {
        serviceSpy = jasmine.createSpyObj(TestObservableService,['getObs']);

        await TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [                   
                { provide: TestObservableService, useValue: serviceSpy},
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        scheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });        
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly return result - basic', () => {
        scheduler.run(helpers => {
            const { cold, expectObservable } = helpers;

            const inputMarble =    '-aba';
            const expectedMarble = 'baba';

            const inputValues = {a: 1,b: 0};
            const expectedVales = {a: true, b: false};

            const obs = cold(inputMarble, inputValues);
            
            serviceSpy.getObs.and.returnValue(obs);
            
            fixture.detectChanges();

            expectObservable(component.resultSubject$).toBe(expectedMarble, expectedVales);
        });
    });

    it('should correctly return result - pauses', () => {
        scheduler.run(helpers => {
            const { cold, expectObservable } = helpers;

            const inputMarble =    '-a-b-a-';
            const expectedMarble = 'ba-b-a-';

            const inputValues = {a: 1,b: 0};
            const expectedVales = {a: true, b: false};

            const obs = cold(inputMarble, inputValues);
            
            serviceSpy.getObs.and.returnValue(obs);
            
            fixture.detectChanges();

            expectObservable(component.resultSubject$).toBe(expectedMarble, expectedVales);
        });
    });    
});
