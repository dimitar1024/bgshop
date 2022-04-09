import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/IProduct';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: IProduct[];
  constructor(public db: AngularFirestore, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id: number = params['id']; 
      this.db.collection('product').snapshotChanges().subscribe((response) => {
        let vals: IProduct[];
        vals = response.map(item => {
          let prod: IProduct = item.payload.doc.data() as IProduct;
          prod.docId = item.payload.doc.id; 
          return prod;
        });
 
        this.products = vals.filter(d => 
           d.name.toLowerCase().indexOf(id.toString().toLowerCase()) != -1 );
      })
    })
  }

}
