export interface ProjectItem { 
    partno: string;
    partname: string;
    standar_using: number;
    lot_size: number;
    category_part: string;
    berat: number;
    snp: number;
    panjang: number;
    lebar: number;
    tinggi: number;
    qty_box: number;
}
export interface Project {
    project_id?: number;
    project_name: string;
    created_by: string;
    created_at?: string;
    steelcase_id: number;
    items?: ProjectItem[];
}