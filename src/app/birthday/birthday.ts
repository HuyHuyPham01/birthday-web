import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Memory, memories } from '../images';

@Component({
  selector: 'app-birthday',
  imports: [],
  templateUrl: './birthday.html',
  styleUrl: './birthday.css',
})
export class Birthday {
  @ViewChild('backgroundMusic')
  backgroundMusic!: ElementRef<HTMLAudioElement>;

  // =========================
  // TRẠNG THÁI
  // =========================

  isOpened = false;
  isOpening = false;
  isCelebrating = false;
  isMusicPlaying = false;

  // =========================
  // HIỆU ỨNG
  // =========================

  hearts = Array.from({ length: 18 });

  // =========================
  // TRANG
  // =========================

  currentPage = 0;
  totalPages = 5;

  // =========================
  // ẢNH
  // =========================

  memories = memories;

  selectedMemory: Memory | null = null;
  selectedMemoryIndex = 0;

  memorySlideDirection: 'next' | 'previous' = 'next';
  memoryImageAnimating = false;

  openMemory(memory: Memory): void {
    this.selectedMemoryIndex = this.memories.findIndex((item) => item.image === memory.image);

    this.selectedMemory = memory;

    this.lockBodyScroll();
  }

  closeMemory(): void {
    this.selectedMemory = null;

    this.unlockBodyScroll();
  }

  previousMemory(): void {
    if (this.selectedMemoryIndex > 0) {
      this.selectedMemoryIndex--;

      this.selectedMemory = this.memories[this.selectedMemoryIndex];
    }
  }

  nextMemory(): void {
    if (this.selectedMemoryIndex < this.memories.length - 1) {
      this.selectedMemoryIndex++;

      this.selectedMemory = this.memories[this.selectedMemoryIndex];
    }
  }

  private lockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  // =========================
  // MỞ QUÀ
  // =========================

  openGift(): void {
    // Không cho click lại trong lúc đang mở hoặc đã mở
    if (this.isOpening || this.isOpened) {
      return;
    }

    this.isOpening = true;

    // =========================
    // 🎵 NHẠC CHẠY NGAY
    // =========================

    const music = this.backgroundMusic.nativeElement;

    music.volume = 0.4;

    music.play().catch((error) => {
      console.log('Không thể phát nhạc:', error);
    });

    // =========================
    // ✨ FLASH
    // =========================

    setTimeout(() => {
      this.isCelebrating = true;
    }, 1800);

    setTimeout(() => {
      this.isCelebrating = false;
    }, 2400);

    // =========================
    // 🎁 HỘP QUÀ MỞ XONG
    // → CHUYỂN PAGE 1 NGAY
    // =========================

    setTimeout(() => {
      this.isOpened = true;
      this.currentPage = 0;
      this.cdr.detectChanges();
    }, 1500);
  }

  // =========================
  // NHẠC
  // =========================

  ngAfterViewInit(): void {
    const music = this.backgroundMusic.nativeElement;

    music.addEventListener('play', () => {
      this.isMusicPlaying = true;
      this.cdr.detectChanges();
    });

    music.addEventListener('pause', () => {
      this.isMusicPlaying = false;
      this.cdr.detectChanges();
    });
  }

  toggleMusic(): void {
    const music = this.backgroundMusic.nativeElement;

    if (music.paused) {
      music.play().catch((error) => {
        console.log('Không thể phát nhạc:', error);
      });
    } else {
      music.pause();
    }
  }

  // =========================
  // TRANG TIẾP
  // =========================

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
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

  // =========================
  // VỀ ĐẦU
  // =========================

  restart(): void {
    this.currentPage = 0;
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
