import { Injectable } from '@angular/core';
import * as uuid from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class GenUuidService {

  constructor() { }

  genUUID(): string{
    return uuid.v4();
  }

}
