import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenCryptService } from 'src/app/services/gen-crypt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public hide: boolean = true
  public formLogin!: FormGroup

  constructor(
    private fb: FormBuilder,
    private gen_crypt_service : GenCryptService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFormLogin()
  }

  loadFormLogin() {
    this.formLogin = this.fb.group({
      email: [ '', [ Validators.required ] ], 
      password: [ '', [ Validators.required ] ]
    })
  }

  submitLogin() {
    localStorage.removeItem('is_auth')
    const { email, password } = this.formLogin.value
    const get_user_storage = JSON.parse(localStorage.getItem('user') || '' )
    if (get_user_storage.email !== email) {
      localStorage.setItem('is_auth', 'false')
      Swal.fire('Fail', 'Sorry, data does not match', 'error')
    }
    const compare_password = this.gen_crypt_service.compare_password(password, get_user_storage.password)
    if (!compare_password) {
      Swal.fire('Fail', 'Sorry, data does not match', 'error')
    }else {
      localStorage.setItem('is_auth', 'true')
      this.router.navigateByUrl('/tasks')
    }
  }

}
