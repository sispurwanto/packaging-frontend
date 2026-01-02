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
  loading = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.api.listProjects().subscribe({
      next: (res: any) => {
        this.projects = res.projects;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  create(): void {
    this.router.navigate(['/projects/new']);
  }

  detail(id: UUID): void {
    this.router.navigate(['/projects', id]);
  }
}
