import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.html',
  styleUrl: './countdown.css',
})
export class Countdown implements OnInit, OnDestroy {
  @Output() finished = new EventEmitter<void>();

  targetDate = new Date('2026-09-10T00:00:00+07:00');

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  // Phần trăm vòng tròn còn lại
  daysProgress = 100;
  hoursProgress = 100;
  minutesProgress = 100;
  secondsProgress = 100;

  private timer?: ReturnType<typeof setInterval>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateCountdown();

    this.timer = setInterval(() => {
      this.updateCountdown();
      this.cdr.detectChanges();
    }, 1000);
  }

  updateCountdown() {
    const now = new Date();

    const difference = this.targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;

      this.daysProgress = 0;
      this.hoursProgress = 0;
      this.minutesProgress = 0;
      this.secondsProgress = 0;

      this.clearTimer();

      this.finished.emit();

      return;
    }

    this.days = Math.floor(difference / (1000 * 60 * 60 * 24));

    this.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    this.minutes = Math.floor((difference / (1000 * 60)) % 60);

    this.seconds = Math.floor((difference / 1000) % 60);

    // =========================
    // TÍNH % VÒNG TRÒN
    // =========================

    // Số ngày tối đa từ hiện tại đến ngày sinh nhật.
    // Dùng để vòng DAYS giảm dần theo tổng thời gian.
    const totalDays = Math.ceil(
      (this.targetDate.getTime() - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24),
    );

    this.daysProgress = totalDays > 0 ? (this.days / totalDays) * 100 : 0;

    // 24 giờ
    this.hoursProgress = (this.hours / 24) * 100;

    // 60 phút
    this.minutesProgress = (this.minutes / 60) * 100;

    // 60 giây
    this.secondsProgress = (this.seconds / 60) * 100;
  }

  formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}
