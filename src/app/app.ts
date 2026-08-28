import { Component } from '@angular/core';

import { Countdown } from './countdown/countdown';
import { Birthday } from './birthday/birthday';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [Countdown, Birthday],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly targetDate = environment.targetDate;

  isBirthday = Date.now() >= this.targetDate.getTime();

  birthdayStarted(): void {
    this.isBirthday = true;
  }
}
