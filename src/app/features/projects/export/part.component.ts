import { Component, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-export',
  template: `<button (click)="download()">Part - Export Excel</button>`
})
export class ExportComponent {
  @Input() projectId!: string; 

  constructor(private apiService: ApiService) {}

  download() {
    this.apiService.exportPartExcel(this.projectId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.projectId + '-part-list.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
