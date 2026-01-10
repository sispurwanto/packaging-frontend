import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { UUID } from 'crypto';

@Component({
  standalone: true,
  selector: 'app-project-list',
  imports: [CommonModule],
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  projects: any[] = [];
  meta: any = {};
  loading = false;

  page = 1;
  limit = 10;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    // this.api.listProjects().subscribe({
    this.api.listProjectsByPage(this.page, this.limit).subscribe({
      next: (res: any) => {
        console.log(res)
        this.projects = res.projects.data;
        this.meta = res.projects.meta
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  changePage(page: number) {
    if (page < 1 || page === this.page) return;
    this.page = page;
    this.load();
  }

  create(): void {
    this.router.navigate(['/projects/new']);
  }

  detail(id: UUID): void {
    this.router.navigate(['/projects', id]);
  }

  delete(id: UUID): void {
    if (!confirm('Hapus project ini?')) return;

    this.api.deleteProject(id).subscribe({
      next: () => this.load(),
      error: () => alert('Gagal hapus project')
    });
  }
}
