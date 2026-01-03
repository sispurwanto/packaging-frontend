import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({ 
    selector: 'app-login', 
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html' 
})

export class LoginComponent {
    form: FormGroup;
    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
    }

    submit(){
        const v = this.form.value;
        this.auth.login(v.username, v.password).subscribe({
            next: (res:any) => { 
                // console.log('login success', res);
                this.auth.setToken(res.token); 
                this.router.navigate(['/projects']); 
            },
            error: (e) => {
                console.error('login failed', e);
                alert(e.error?.message || 'Login failed');
            }
        });
    }
}