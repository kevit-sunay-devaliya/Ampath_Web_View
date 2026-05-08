import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private contactNumber: string | null = null;

  setContactNumber(num: string | null): void {
    this.contactNumber = num;
  }

  getContactNumber(): string | null {
    return this.contactNumber;
  }
}
