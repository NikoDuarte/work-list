import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs'

@Injectable({
  providedIn: 'root'
})
export class GenCryptService {

  constructor() { }

  encode_password(password: string): string {
    const genSalt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, genSalt)
  }

  compare_password(password_entry: string, password_model: string): boolean {
    return bcrypt.compareSync(password_entry, password_model)
  }

}
