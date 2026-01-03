import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  id?: string;
  isEdit = false;
  loading = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    password: ['']
  });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.isEdit = true;
      this.load(this.id);
    }
  }

  load(id: string) {
    this.svc.getUser(id).subscribe((res: any) => {
        this.form.patchValue({
            name: res.user.name,
            email: res.user.email,
            role: res.user.role
        });
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = this.form.value;

    const req = this.isEdit
      ? this.svc.updateUser(this.id!, payload)
      : this.svc.createUser(payload);

    req.subscribe({
      next: () => {
        alert('User tersimpan');
        this.router.navigate(['/users']);
      },
      error: () => {
        alert('Gagal simpan user');
        this.loading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
