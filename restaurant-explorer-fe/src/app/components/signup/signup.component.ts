import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  name: string = "";
  email: string = "";
  password: string = "";
  address: string = "";
  phone: string = "";

  signUp() {
    const request = {
      name: this.name,
      email: this.email,
      password: this.password,
      address: this.address,
      phone: this.phone
    };
    
    this.authService.signUp(request).subscribe((response) => {
      this.toastr.success(response.message, "Success")
      this.router.navigate(['signin'])
    }, (error) => {
      this.toastr.error(error.error.error, "Error")
    });
  }
}
