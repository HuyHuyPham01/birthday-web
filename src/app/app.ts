import { Component, ElementRef, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('birthday-web');

  @ViewChild('backgroundMusic')
  backgroundMusic!: ElementRef<HTMLAudioElement>;

  isOpened = false;
  isCelebrating = false;
  isMusicPlaying = false;

  hearts = Array.from({ length: 20 });

  currentPage = 0;

  openGift() {
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

  toggleMusic() {
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

  nextPage() {
    if (this.currentPage < 4) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
