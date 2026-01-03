import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { SteelcaseService } from '../steelcase.service';
import { ApiService } from '../../../core/services/api.service';


@Component({
  standalone: true,
  selector: 'app-steelcase-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './steelcase-form.component.html'
})
export class SteelcaseFormComponent implements OnInit {
    id?: number;
    isEdit = false;
    loading = false;
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private svc: ApiService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group({
            kode: ['', Validators.required],
            type: [''],

            casein_panjang: [0, Validators.required],
            casein_lebar: [0, Validators.required],
            casein_tinggi: [0, Validators.required],

            caseout_panjang: [0, Validators.required],
            caseout_lebar: [0, Validators.required],
            caseout_tinggi: [0, Validators.required],
        });
    }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));

        if (this.id) {
            this.isEdit = true;
            this.loadDetail(this.id);
        }
    }

    loadDetail(id: number) {
        this.loading = true;
        this.svc.getSteelcases(id).subscribe({
        next: (res: any) => {
            this.form.patchValue(res.steelcase);
            this.loading = false;
        },
        error: () => {
            alert('Gagal mengambil data steelcase');
            this.loading = false;
        }
        });
    }

    save() {
        if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
        }

        const payload = this.form.value;
        this.loading = true;

        const req = this.isEdit
        ? this.svc.updateSteelcase(this.id!, payload)
        : this.svc.createSteelcase(payload);

        req.subscribe({
        next: () => {
            alert('Data berhasil disimpan');
            this.router.navigate(['/steelcases']);
        },
        error: () => {
            alert('Gagal menyimpan data');
            this.loading = false;
        }
        });
    }

    cancel() {
        this.router.navigate(['/steelcases']);
    }
}
