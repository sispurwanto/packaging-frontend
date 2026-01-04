import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  HostListener,
  ChangeDetectorRef 
} from '@angular/core';
import { CommonModule } from '@angular/common';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
    standalone: true,
    selector: 'app-project-diagram',
    imports: [CommonModule],
    templateUrl: './project-diagram.component.html',
    styleUrls: ['./project-diagram.component.css']
})
export class ProjectDiagramComponent

  implements AfterViewInit, OnChanges {

  @Input({ required: true }) steelcase!: any;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLDivElement>;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  initialized = false;
  partSummary: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.initScene();
    this.initialized = true;
    this.renderSteelcase();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized && changes['steelcase']) {
      this.renderSteelcase();
    }
  }

  /* ================= INIT ================= */
  initScene() {
    const width = this.canvasRef.nativeElement.clientWidth;
    const height = 420;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#f4f6f9');

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 20000);
    this.camera.position.set(2000, 1600, 2000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.canvasRef.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(2000, 3000, 2000);
    this.scene.add(dir);

    this.animate();
  }

  @HostListener('window:resize')
    onResize() {
        const w = this.canvasRef.nativeElement.clientWidth;
        const h = this.canvasRef.nativeElement.clientHeight;

        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }


  /* ================= RENDER ================= */
  renderSteelcase() {
    if (!this.steelcase) return;

  // clear old meshes (keep lights)
    this.scene.children = this.scene.children.filter(
        o => o.type.includes('Light')
    );

    this.buildPartSummary();
    this.drawSteelcase();
    this.drawBoxes();
    this.fitCamera();
    this.cdr.detectChanges();
  }

    drawSteelcase() {
        const s = this.steelcase.steelcase_size;

        const geo = new THREE.BoxGeometry(s.w, s.h, s.d);

        const mat = new THREE.MeshBasicMaterial({
            color: 0x111111,
            wireframe: true
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(s.w / 2, s.h / 2, s.d / 2);

        this.scene.add(mesh);
    }


    drawBoxes() {
        this.steelcase.boxes.forEach((b: any) => {

            /* ===== SOLID BOX ===== */
            const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
            const mat = new THREE.MeshLambertMaterial({
            color: new THREE.Color(b.color),
            transparent: true,
            opacity: 0.9
            });

            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
            b.x1 + b.w / 2,
            b.h / 2 + b.z1,
            b.y1 + b.d / 2
            );

            /* ===== BORDER / OUTLINE ===== */
            const edges = new THREE.EdgesGeometry(geo);
            const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({
                color: 0x000000,   // warna border
                linewidth: 1       // catatan: sebagian browser ignore
            })
            );

            line.position.copy(mesh.position);

            this.scene.add(mesh);
            this.scene.add(line);
        });
    }


    buildPartSummary() {
        const map:any = {};

        this.steelcase.boxes.forEach((b:any) => {
            if (!map[b.code]) {
            map[b.code] = {
                code: b.code,
                name: b.name,
                dimensi: `${b.w} × ${b.d} × ${b.h}`,
                color: b.color,
                qty: 0
            };
            }
            map[b.code].qty++;
        });

        this.partSummary = Object.values(map);
    }

    fitCamera() {
        const s = this.steelcase.steelcase_size;
        const max = Math.max(s.w, s.h, s.d);

        this.camera.near = 1;
        this.camera.far = max * 10;
        this.camera.updateProjectionMatrix();

        this.camera.position.set(
            max * 1.1,
            max * 0.9,
            max * 1.1
        );

        this.controls.target.set(
            s.w / 2,
            s.h / 2,
            s.d / 2
        );

        this.controls.enablePan = true;
        this.controls.enableZoom = true;
        this.controls.maxDistance = max * 4;
        this.controls.minDistance = max * 0.5;

        this.controls.update();
    }


  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}