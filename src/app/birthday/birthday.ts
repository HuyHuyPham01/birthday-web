import { Component, ElementRef, ViewChild } from '@angular/core';

import { images } from '../images';

@Component({
  selector: 'app-birthday',
  imports: [],
  templateUrl: './birthday.html',
  styleUrl: './birthday.css',
})
export class Birthday {
  // =========================
  // NHẠC
  // =========================

  @ViewChild('backgroundMusic')
  backgroundMusic!: ElementRef<HTMLAudioElement>;

  // =========================
  // TRẠNG THÁI
  // =========================

  isOpened = false;

  isCelebrating = false;

  isMusicPlaying = false;

  // =========================
  // HIỆU ỨNG
  // =========================

  hearts = Array.from({ length: 20 });

  // =========================
  // TRANG HIỆN TẠI
  // =========================

  currentPage = 0;

  // =========================
  // DANH SÁCH ẢNH
  // =========================

  images = images;

  // =========================
  // MỞ QUÀ
  // =========================

  openGift(): void {
    this.isCelebrating = true;

    const music = this.backgroundMusic.nativeElement;

    music.volume = 0.4;

    music
      .play()
      .then(() => {
        this.isMusicPlaying = true;
      })
      .catch((error) => {
        console.log('Không thể phát nhạc:', error);
      });

    setTimeout(() => {
      this.isOpened = true;

      this.isCelebrating = false;
    }, 1200);
  }

  // =========================
  // BẬT / TẮT NHẠC
  // =========================

  toggleMusic(): void {
    const music = this.backgroundMusic.nativeElement;

    if (this.isMusicPlaying) {
      music.pause();

      this.isMusicPlaying = false;
    } else {
      music
        .play()
        .then(() => {
          this.isMusicPlaying = true;
        })
        .catch((error) => {
          console.log('Không thể phát nhạc:', error);
        });
    }
  }

  // =========================
  // TRANG TIẾP THEO
  // =========================

  nextPage(): void {
    if (this.currentPage < 4) {
      this.currentPage++;
    }
  }

  // =========================
  // TRANG TRƯỚC
  // =========================

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
