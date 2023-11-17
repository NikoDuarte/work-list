import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenCryptService } from 'src/app/services/gen-crypt.service';
import { GenUuidService } from 'src/app/services/gen-uuid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public hide: boolean = true

  public formRegister!: FormGroup

  constructor(
    private fb: FormBuilder,
    private gen_uuid_service: GenUuidService,
    private gen_crypt_service: GenCryptService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadFormRegister()
  }

  loadFormRegister() {
    this.formRegister = this.fb.group({
      username: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required ] ]
    })
  }

  submitRegister() {
    const { password, email, username } = this.formRegister.value
    const uuid = this.gen_uuid_service.genUUID()
    const hash_password = this.gen_crypt_service.encode_password(password)
    const new_user = {
      id: uuid,
      email,
      username,
      password: hash_password
    }
    localStorage.setItem('user', JSON.stringify(new_user))
    Swal.fire({
      title: "Success register",
      text: "You have been registered successfully.",
      icon: "success",
    })
    this.router.navigateByUrl('/login')
  }

}
