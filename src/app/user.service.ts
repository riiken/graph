import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userEmail: string | null = null;
  constructor() {}
}
