import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
// import { User } from './user.model';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  loading = false;

  constructor(
    private svc: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.listUsers().subscribe({
      next: res => {
        this.users = res;
        this.loading = false;
      },
      error: () => {
        alert('Gagal load user');
        this.loading = false;
      }
    });
  }

  add() {
    this.router.navigate(['/users/new']);
  }

  edit(id: number) {
    this.router.navigate(['/users', id]);
  }

  delete(id: number) {
    if (!confirm('Hapus user ini?')) return;

    this.svc.deleteUser(id).subscribe({
      next: () => this.load(),
      error: () => alert('Gagal hapus user')
    });
  }
}
