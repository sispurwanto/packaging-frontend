import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone: true,
  selector: 'app-steelcase-selector',
  imports: [CommonModule],
  templateUrl: './steelcase-selector.component.html'
})
export class SteelcaseSelectorComponent {
  @Input() steelcases:any[] = [];
  @Input() steelcaseUsed:any = 0;
  @Input() steelcaseData:any = {};
  @Input({ required: true }) projectId!: string;
  @Input({ required: true }) steelcaseItems: any[] = [];
  @Output() selected = new EventEmitter<any>();

  constructor(private api: ApiService) {}
    
  select(e:any) {
    this.selected.emit(this.steelcases[e.target.value]);
  }

  download() {
    if (!this.projectId) return;
    this.api.exportPartExcel(this.projectId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'project-' + this.projectId + '-part-list.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  downloadPacking() {
    if (!this.projectId) return;
    this.api.exportPackingExcel(this.projectId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'packing-' + this.projectId + '-data.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
