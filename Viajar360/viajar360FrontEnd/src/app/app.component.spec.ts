import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
=======
import { RouterTestingModule } from '@angular/router/testing';
>>>>>>> 62734f8b2c9c9c05bf8d1f531ed11794c4f7f787
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
=======
      imports: [
        RouterTestingModule
      ],
>>>>>>> 62734f8b2c9c9c05bf8d1f531ed11794c4f7f787
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<< HEAD
  it(`should have as title 'Viajar360FrontEnd'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Viajar360FrontEnd');
=======
  it(`should have as title 'viajar360FrontEnd'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('viajar360FrontEnd');
>>>>>>> 62734f8b2c9c9c05bf8d1f531ed11794c4f7f787
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
<<<<<<< HEAD
    expect(compiled.querySelector('.content span').textContent).toContain('Viajar360FrontEnd app is running!');
=======
    expect(compiled.querySelector('.content span').textContent).toContain('viajar360FrontEnd app is running!');
>>>>>>> 62734f8b2c9c9c05bf8d1f531ed11794c4f7f787
  });
});
