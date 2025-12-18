import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-project-request',
    standalone: true,
    imports: [
        CommonModule, 
        ReactiveFormsModule
    ],
    templateUrl: './project-request.component.html' 
})
export class ProjectRequestComponent {
    file!: File;
    form: FormGroup;
    
    constructor(private fb: FormBuilder, private router: Router) {
        this.form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
    }
    
    submit() {
        throw new Error('Method not implemented.');
    }
  
}
