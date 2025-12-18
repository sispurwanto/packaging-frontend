import { Component, OnInit } from "@angular/core";
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    imports: [
        CommonModule
    ],
    template: `
        <h2>Master Steelcase</h2>
        <button (click)="add()">Tambah</button>

        <table>
        <tr>
            <th>Kode</th><th>Type</th><th>Aksi</th>
        </tr>
        <tr *ngFor="let s of steelcases">
            <td>{{ s.kode }}</td>
            <td>{{ s.type }}</td>
            <td>
            <button (click)="edit(s.id)">Edit</button>
            <button (click)="remove(s.id)">Hapus</button>
            </td>
        </tr>
        </table>
    `
})

export class SteelcaseListComponent implements OnInit {
  steelcases: any[] = [];

  constructor(
    private svc: SteelcaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.list().subscribe(res => this.steelcases = res);
  }

  add() {
    this.router.navigate(['/steelcases/new']);
  }

  edit(id: number) {
    this.router.navigate(['/steelcases', id]);
  }

  remove(id: number) {
    if (confirm('Hapus steelcase?')) {
      this.svc.delete(id).subscribe(() => this.load());
    }
  }
}
