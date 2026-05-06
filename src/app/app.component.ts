import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styles: [':host { display: block; }'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly onPageShow = (e: PageTransitionEvent) => {
    if (e.persisted) {
      // Page restored from bfcache (common in WhatsApp / mobile in-app browsers).
      // Force a real reload so the app always starts fresh.
      window.location.reload();
    }
  };

  ngOnInit(): void {
    window.addEventListener('pageshow', this.onPageShow);
  }

  ngOnDestroy(): void {
    window.removeEventListener('pageshow', this.onPageShow);
  }
}
