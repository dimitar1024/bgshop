import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/IProduct';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnChanges {
  products: IProduct[];

  categoryName: string;

  constructor(public db: AngularFirestore, private activatedRoute: ActivatedRoute) {

    //this.getAllProducts()

  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  categoryid: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
 
      if (id == 1) {
        this.categoryName = 'Перални';
      }
      else if (id == 2) {
        this.categoryName = 'Печки';
      }
      else if (id == 3) {
        this.categoryName = 'Лаптопи';
      }
      else if (id == 4) {
        this.categoryName = 'Компютри';
      }
      else if (id == 5) {
        this.categoryName = 'Хладилници';
      }
      else if (id == 6) {
        this.categoryName = 'Сушилни';
      }
      else if (id == 7) {
        this.categoryName = 'Телефони';
      }
      else if (id == 8) {
        this.categoryName = 'Бойлери';
      }

      this.db.collection('product').snapshotChanges().subscribe((response) => {
        let vals: IProduct[];
        vals = response.map(item => {
          let prod: IProduct = item.payload.doc.data() as IProduct;
          prod.docId = item.payload.doc.id; 
          return prod;
        });

        this.products = vals.filter(d => d.category == id);
      })
    })
  }

  getAllProducts(id: number) {

    // console.log("getAllProducts " + id)

  }
}
