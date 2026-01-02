import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-steelcase-selector',
  imports: [CommonModule],
  template: `
    <label>Pilih Steelcase dari {{ steelcaseUsed }} : </label>
    <select class="form-select" (change)="select($event)">
      <option *ngFor="let s of steelcases; let i=index" [value]="i">
        {{ s.steelcase_code }} - {{ s.steelcase_index + 1 }}
      </option>
    </select>
  `
})
export class SteelcaseSelectorComponent {
  @Input() steelcases:any[] = [];
  @Input() steelcaseUsed:any = 0;
  @Output() selected = new EventEmitter<any>();

  select(e:any) {
    this.selected.emit(this.steelcases[e.target.value]);
  }
}
