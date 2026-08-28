import { Component } from '@angular/core';

import { Countdown } from './countdown/countdown';
import { Birthday } from './birthday/birthday';

@Component({
  selector: 'app-root',
  imports: [Countdown, Birthday],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly targetDate = new Date('2026-09-10T00:00:00+07:00');

  isBirthday = Date.now() >= this.targetDate.getTime();

  birthdayStarted(): void {
    this.isBirthday = true;
  }
}
