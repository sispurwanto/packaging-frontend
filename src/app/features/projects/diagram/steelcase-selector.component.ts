import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  @Output() selected = new EventEmitter<any>();

  select(e:any) {
    this.selected.emit(this.steelcases[e.target.value]);
  }
}
