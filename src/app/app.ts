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
  isBirthday = false;

  constructor() {
    // Nếu người dùng mở web sau
    // ngày 10/09/2026 thì vào thẳng Birthday

    const targetDate = new Date('2026-09-10T00:00:00+07:00');

    const now = new Date();

    if (now.getTime() >= targetDate.getTime()) {
      this.isBirthday = true;
    }
  }

  birthdayStarted() {
    this.isBirthday = true;
  }
}
