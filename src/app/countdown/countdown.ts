import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface CountdownItem {
  label: string;
  value: number;
  progress: number;
  gradientId: string;
}

@Component({
  selector: 'app-countdown',
  imports: [CommonModule],
  templateUrl: './countdown.html',
  styleUrl: './countdown.css',
})
export class Countdown implements OnInit, OnDestroy {
  @Output() finished = new EventEmitter<void>();

  // =================================================
  // CONFIG
  // =================================================

  @Input() targetDate!: Date;

  readonly hearts = [
    '♥',
    '✦',
    '♡',
    '♥',
    '✧',
    '♥',
    '✦',
    '♡',
    '♥',
    '✧',
    '♥',
    '✦',
    '♡',
    '♥',
    '✧',
    '♥',
  ];

  // =================================================
  // COUNTDOWN
  // =================================================

  countdownItems: CountdownItem[] = [
    this.createItem('NGÀY', 'daysGradient'),
    this.createItem('GIỜ', 'hoursGradient'),
    this.createItem('PHÚT', 'minutesGradient'),
    this.createItem('GIÂY', 'secondsGradient'),
  ];

  get visibleCountdownItems(): CountdownItem[] {
    const [days, hours, minutes, seconds] = this.countdownItems;

    if (days.value > 0) {
      return [days, hours, minutes, seconds];
    }

    if (hours.value > 0) {
      return [hours, minutes, seconds];
    }

    if (minutes.value > 0) {
      return [minutes, seconds];
    }

    return [seconds];
  }

  private timer?: ReturnType<typeof setInterval>;

  constructor(private cdr: ChangeDetectorRef) {}

  // =================================================
  // LIFECYCLE
  // =================================================

  ngOnInit(): void {
    this.updateCountdown();

    this.timer = setInterval(() => {
      this.updateCountdown();
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  // =================================================
  // COUNTDOWN LOGIC
  // =================================================

  updateCountdown(): void {
    const difference = this.targetDate.getTime() - Date.now();

    if (difference <= 0) {
      this.clearTimer();
      this.finished.emit();
      return;
    }

    const days = Math.floor(difference / this.DAY);
    const hours = Math.floor((difference / this.HOUR) % 24);
    const minutes = Math.floor((difference / this.MINUTE) % 60);
    const seconds = Math.floor((difference / this.SECOND) % 60);

    this.setCountdownItem(0, days, this.getDaysProgress(days));

    this.setCountdownItem(1, hours, (hours / 24) * 100);

    this.setCountdownItem(2, minutes, (minutes / 60) * 100);

    this.setCountdownItem(3, seconds, (seconds / 60) * 100);
  }

  // =================================================
  // PROGRESS
  // =================================================

  private getDaysProgress(days: number): number {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const totalDays = Math.ceil((this.targetDate.getTime() - today.getTime()) / this.DAY);

    return totalDays > 0 ? (days / totalDays) * 100 : 0;
  }

  private setCountdownItem(index: number, value: number, progress: number): void {
    this.countdownItems[index].value = value;
    this.countdownItems[index].progress = progress;
  }

  // =================================================
  // HELPERS
  // =================================================

  private createItem(label: string, gradientId: string): CountdownItem {
    return {
      label,
      value: 0,
      progress: 100,
      gradientId,
    };
  }

  formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  // =================================================
  // TIME CONSTANTS
  // =================================================

  private readonly SECOND = 1000;
  private readonly MINUTE = 60 * this.SECOND;
  private readonly HOUR = 60 * this.MINUTE;
  private readonly DAY = 24 * this.HOUR;
}
