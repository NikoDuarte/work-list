import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from 'src/app/components/modal-form/modal-form.component';
import { EmmiterService } from 'src/app/services/emmiter.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: [
  ]
})
export class TasksComponent implements OnInit {

  public displayedColumns: string[] = ['title_task', 'desc_task', 'opt'];
  public dataSource: any

  constructor(
    private modalService: NgbModal,
    private emmiter_service: EmmiterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadInfoTabla()
    this.emmiter_service.$emmiterLoad.subscribe(() => this.loadInfoTabla())
  }

  loadInfoTabla() {
    const user = JSON.parse(localStorage.getItem('user') || '')
    const data_task: any[] = JSON.parse(localStorage.getItem('list_task') || '[]')
    const task_filter_user = data_task.filter((elt: any) => elt.id_user === user.id)
    const mapper = task_filter_user.map((elt: any) => {
      return {
        id: elt.id,
        id_user: elt.id_user,
        title_task: elt.title,
        desc_task: elt.desc
      }
    })
    this.dataSource = mapper
  }

  openModal() {
    const modalRef = this.modalService.open(ModalFormComponent, { size: 'md' });
    modalRef.componentInstance.title = 'Create a task!'
  }

  deleteTask(id: string) {
    const data_task: any[] = JSON.parse(localStorage.getItem('list_task') || '[]')
    const find_index = data_task.findIndex((elt: any) => elt.id === id)
    data_task.splice(find_index, 1)    
    localStorage.removeItem('list_task')
    localStorage.setItem('list_task', JSON.stringify(data_task))
    Swal.fire('Success', 'You have been deleted successfully.', 'success')
    this.emmiter_service.$emmiterLoad.emit(true)
  }

  closeSesion() {
    localStorage.removeItem('is_auth')
    this.router.navigateByUrl('/login')
  }

}
