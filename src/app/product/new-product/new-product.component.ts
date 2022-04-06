import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import { FileUpload } from 'src/app/shared/FileUpload';
import { FileuploadService } from 'src/app/shared/services/fileupload.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr: string;
  product: IProduct;
  constructor(public db: AngularFirestore, public router: Router, private uploadService: FileuploadService) { }
  ngOnInit(): void {
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
              this.db.collection('product').add(this.product);
               this.router.navigate(['/home']) ;
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
