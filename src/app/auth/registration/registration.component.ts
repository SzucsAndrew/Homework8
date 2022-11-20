import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Error } from '../models/error.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  username: string;
  email: string;
  password: string;

  error: Error = undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registration() {
    this.authService.registration(this.username, this.email, this.password).subscribe(
      (res) => {
        const error = res as Error;
        if(error.code) {
          this.error = error;
          return;
        }

        this.router.navigateByUrl('/login');
      },
      (err) => this.error = new Error(err.error, err.message));
  }
}
