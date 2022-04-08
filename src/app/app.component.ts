import { Component } from '@angular/core';
import { observable, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'observables';
  first = '';
  second = '';

  // 2 feed observer to first function
  myFirstFunction(observer: Observer<any>) {
    setTimeout(() => {
      console.log('My First Function Completed');
      this.first = 'My First Function Completed';
      observer.complete(); // call observer complete
    }, 4000);
  }

  mySecondFunction() {
    setTimeout(() => {
      console.log('My Second Function Completed');
      this.second = 'My Second Function Completed';
    }, 1000);
  }

  // 1 create an observer
  obs = new Observable((observer) => {
    this.myFirstFunction(observer);
  });

  runFunctionsInOrder() {
    // 3 create subscription, and handle next, error and complete
    this.obs.subscribe(
      (val: any) => {
        console.log(val);
      },
      (error) => {
        console.log('error');
      },
      () => {
        this.mySecondFunction();
      }
    );
  }

  // This is executing the call to run functions, could be a button
  ngOnInit() {
    this.runFunctionsInOrder();
  }
}
