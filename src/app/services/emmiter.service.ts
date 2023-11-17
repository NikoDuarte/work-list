import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmmiterService {

  public $emmiterLoad : EventEmitter<boolean> = new EventEmitter()

  constructor() { }
}
