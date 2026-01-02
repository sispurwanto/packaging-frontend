import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ApiService } from '../../core/services/api.service';
import { ProjectDiagramComponent } from './diagram/project-diagram.component';
import { SteelcaseSelectorComponent } from './diagram/steelcase-selector.component';

@Component({
    selector: 'app-project-request',
    standalone: true,
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        ProjectDiagramComponent,
        SteelcaseSelectorComponent
    ],
    templateUrl: './project-request.component.html' 
})
export class ProjectRequestComponent implements OnInit{
    steelcases: any[] = [];
    file?: File;
    form: FormGroup;

    diagramData: any[] = [];
    selectedSteelcase:any;
    steelcaseUsed: any = 0;

    constructor(
        private fb: FormBuilder,
        private api: ApiService
    ) {
        this.form = this.fb.group({
            project_name: ['', Validators.required],
            steelcase_code: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadSteelcases();
    }

    loadSteelcases(): void {
        this.api.listSteelcases().subscribe({
            next: (res: any) => this.steelcases = res.steelcases,
            error: (err) => console.error('Load steelcase failed', err)
        });
    }

    onFile(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.file = input.files[0];
        }
    }

    submit(): void {
        if (!this.file) {
            alert('File Excel wajib diupload');
            return;
        }

        const body = {
            project_name: this.form.value.project_name!,
            steelcase_code: this.form.value.steelcase_code!,
            created_by: '', // Add the required created_by property
            file: this.file
        };

        this.api.createProject(body).subscribe({
            next: (res: any) => {
                alert('Project berhasil diproses');
                const data = res;
                this.diagramData = data.visualization_3d;
                this.selectedSteelcase = this.diagramData[0];
                this.steelcaseUsed = data.steelcases_used;
                // contoh redirect
                // this.router.navigate(['/projects', res.project_id]);
            },
            error: err => {
                console.error(err);
                alert(`Gagal memproses project : ${err.error?.detail || err.message}`);
            }
        });
    }
  
}
