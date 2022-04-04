import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr:string;
  product: IProduct ;
  constructor(public db: AngularFirestore,public router: Router) { }
  ngOnInit(): void {
  }


  submitProduct(newProductForm: NgForm){  
      this.product = newProductForm.form.value as IProduct;  
      this.db.collection('product').add(this.product);
      this.router.navigate(['/products']) ;
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });

      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };

        
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';


    }
  }
}
