import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { ProjectDiagramComponent } from '../diagram/project-diagram.component';
import { SteelcaseSelectorComponent } from '../diagram/steelcase-selector.component';

@Component({
  standalone: true,
  selector: 'app-project-detail',
  imports: [CommonModule,ReactiveFormsModule,
        ProjectDiagramComponent,
        SteelcaseSelectorComponent],
  templateUrl: './project-detail.component.html'
})
    export class ProjectDetailComponent implements OnInit {

  project: any;
  loading = false;
  diagramData: any[] = [];
  steelcaseUsed: any = 0;
  selectedSteelcase:any;
  steelcaseData: any = {};
  projectId: any;
  steelcases: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectId = id;
      this.load(id);
    }
  }

  load(id: string): void {
    this.loading = true;
    this.api.getProject(id).subscribe({
      next: (res: any) => {
        this.project = res;
        this.diagramData = res.visualization_3d || [];
        this.steelcaseUsed = res.steelcases_used || 0;
        this.selectedSteelcase = this.diagramData[0];
        this.steelcaseData = res.steelcase_data || {};
        this.steelcases = res.steelcases || [];
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // exportExcel(): void {
  //   this.api.exportProjectExcel(this.project.project_id)
  //     .subscribe(blob => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = `project-${this.project.project_id}.xlsx`;
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     });
  // }

  cancel() {
    this.router.navigate(['/projects']);
  }
}
