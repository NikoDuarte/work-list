import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmmiterService } from 'src/app/services/emmiter.service';
import { GenUuidService } from 'src/app/services/gen-uuid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: [
  ]
})
export class TaskComponent implements OnInit {

  public formTask!: FormGroup

  constructor(
    private fb: FormBuilder,
    private gen_uuid_service: GenUuidService,
    public activeModal: NgbActiveModal,
    private emmiter_service: EmmiterService
  ) {

  }

  ngOnInit(): void {
    this.loadFormTask()
  }

  loadFormTask() {
    this.formTask = this.fb.group({
      title: [ '', Validators.required ],
      desc: [ '', Validators.required ],
    })
  }

  submitTask() {
    const user = JSON.parse(localStorage.getItem('user') || '')
    const list_task: any[] = JSON.parse(localStorage.getItem('list_task') || '[]')
    const uuid = this.gen_uuid_service.genUUID()
    const new_task = {
      id: uuid,
      id_user: user.id,
      ...this.formTask.value
    }
    list_task.push(new_task)
    localStorage.removeItem('list_task')
    localStorage.setItem('list_task', JSON.stringify(list_task))
    Swal.fire('Success', 'You have been registered successfully.', 'success')
    this.emmiter_service.$emmiterLoad.emit(true)
    this.activeModal.close()
  }

}
