import { Component, OnInit } from "@angular/core";
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-steelcase-list',
    imports: [
        CommonModule
    ],
    templateUrl: './steelcase-list.component.html'
})

export class SteelcaseListComponent implements OnInit {
  steelcases: any[] = [];
  loading = false;

  constructor(
    private svc: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.listSteelcases().subscribe({
      next: (res: any) => {
        this.steelcases = res.steelcases;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  add() {
    this.router.navigate(['/steelcases/new']);
  }

  edit(id: number) {
    this.router.navigate(['/steelcases', id]);
  }

  remove(id: number) {
    if (confirm('Hapus steelcase?')) {
      this.svc.deleteSteelcase(id).subscribe(() => this.load());
    }
  }
}
