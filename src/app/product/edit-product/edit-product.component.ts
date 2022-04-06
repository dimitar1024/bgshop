import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import { FileUpload } from 'src/app/shared/FileUpload';
import { FileuploadService } from 'src/app/shared/services/fileupload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('productForm') productForm: NgForm;
  fileAttr: string;
  product: IProduct; 
  productDocId: string; 
  constructor(public db: AngularFirestore, public router: Router, 
    private activatedRoute: ActivatedRoute, private uploadService: FileuploadService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id: string = params['id'];
      this.productDocId = id;

      this.db.collection('product').doc(id).snapshotChanges()
        .subscribe((response) => {
          let prod : IProduct = response.payload.data() as IProduct;
          setTimeout(() =>  {

            console.log('find')
            this.productForm.form.patchValue({
              model: prod.model,
              name: prod.name,
              price:  prod.price,
              promopercentage:  prod.promopercentage
            })
          });
        });

    })

  }
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload | null;
  percentage = 0;


  submitProduct(newProductForm: NgForm) {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        let path = '/uploads/' + this.currentFileUpload.file.name;
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            console.log("Upload: " + this.percentage);
            if(this.percentage == 100)
            {
              this.currentFileUpload = null;
              this.product = newProductForm.form.value as IProduct;
              this.product.imageUrl = path; 

              this.db.doc('product/' + this.productDocId).update({
                model: this.productForm.form.controls['model'].value,
                name: this.productForm.form.controls['name'].value,
                price: this.productForm.form.controls['price'].value,
                promopercentage: this.productForm.form.controls['promopercentage'].value, 
                imageUrl:path
              });
              
              Swal.fire('Успешно', 'Успешно записахте продукта!', 'success')
              this.router.navigate(['/products']) ;
            }
          },
          error => {
            console.log(error);
          }
        ); 
      }
    }
  }


  ngAfterViewInit(): void {
    // $('.dropify').dropify();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
}
