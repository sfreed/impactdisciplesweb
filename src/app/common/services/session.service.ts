import { Injectable } from '@angular/core';
import { AppUser } from '../models/admin/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() {}

  currentUser: AppUser;

}
