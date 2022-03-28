import { Component } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IProduct } from './ipost';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'PROJECT';

  items!: IProduct[];
  constructor(public db: AngularFirestore) {

    // todo it's work this.db.doc('product/1').update({price: 2300});

    const tutorial =   { name: 'бойлер', price: 349, model: 'SKU3333', promopercentage: 0};

  //  db.collection('product').doc('45').set(tutorial);
      this.getAllProducts(); 
      
  }


  getAllProducts() {
    this.db.collection('product').snapshotChanges().subscribe((response) => {
      this.items = response.map(item => {
        return item.payload.doc.data() as IProduct;
      }
      );
    })
  } 


  delete() {
    if (confirm('Delete?')) {
      this.db.collection('product').doc('4').delete();

    }
  }
} 





/*this.db
  .collection('options')
  .doc('/' + 'mzx....')
  .update({rating: value})
  .then(() => {
    console.log('done');
  })
  .catch(function(error) {
   console.error('Error writing document: ', error);
  });

  */

/*
updateDoc(_id: string, _value: string) {
  let doc = this.afs.collection('options', ref => ref.where('id', '==', _id));
  doc.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    }))).subscribe((_doc: any) => {
     let id = _doc[0].payload.doc.id; //first result of query [0]
     this.afs.doc(`options/${id}`).update({rating: _value});
    })
}*/










   // const c = collection(f, 'product');
   // this.item$ = collectionData(c);

   //this.item$ = db.collection('product').snapshotChanges();





  // getAll(db: Firestore) : void{
  //    db.collection('userInfo').snapshotChanges().subscribe((response) => {
  //       this.dataSource = response.map(item =>
  //         Object.assign({id : item.payload.doc.id}, item.payload.doc.data())
  //       );
  //     })
  //   }
/* items: Observable<any[]>;
 constructor(db: AngularFirestore) {
   this.items = db.collection('post').valueChanges();
 console.log(this.items);*/
 // }
/*
  constructor(private db: AngularFirestore){
   
    let post = this.db.collection('users').valueChanges();
    post.subscribe(console.log);
  }*/

