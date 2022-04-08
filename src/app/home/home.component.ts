import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IProduct } from '../interfaces/IProduct';
import {FlatTreeControl} from '@angular/cdk/tree'; 
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { identifierName } from '@angular/compiler';
/*
interface CategoryNode {
  id: number;
  name: string;
  children?: CategoryNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number; 
}

const TREE_DATA: CategoryNode[] = [
  {
    id: 0,
    name: 'Домакинска техника',
    children: [{id:1,name: 'Перални'}, {id: 6, name: 'Сушилни'}, {id: 2,name: 'Печки'}
    , {id: 5,name: 'Хладилници'}, {id: 8,name: 'Хладилници'}
  ],
  },

  {
    id: 0,
    name: 'ИТ',
    children: [{id:3,name: 'Лаптопи'}, {id: 4, name: 'Компютри'}, {id: 7,name: 'Телефони'}],
  },
 /* 
 if   
 {
    id: 0,
    name: 'ИТ',
    children: [
      {
        id:0,
        name: 'Телефони',
        children: [{id:5,name: 'Broccoli'}, {id:6,name: 'Brussels sprouts'}],
      },

      {
        id:0,
        name: 'Лаптопи',
        children: [{id:5,name: 'Broccoli'}, {id:6,name: 'Brussels sprouts'}],
      },
      
    ],
  },
];*/



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
 
export class HomeComponent implements OnInit { 

  constructor(public db: AngularFirestore) {
    this.getAllProducts(); 
  
    //this.dataSource.data = TREE_DATA;
  }
 
  products: IProduct[];
  
  ngOnInit(): void {
  }

  getAllProducts() {
    this.db.collection('product').snapshotChanges().subscribe((response) => {
      this.products = response.map(item => {
          let prod: IProduct = item.payload.doc.data() as IProduct; 
          prod.docId = item.payload.doc.id; 
        return prod;
      }
      );
    })
  }


 /* private _transformer = (n: CategoryNode, level: number) => {
    return {
      expandable: !!n.children && n.children.length > 0,
      name: n.name,
      level: level   
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>( 
    node => node.level,
    node => node.expandable   
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children  
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
 
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
 
  //hasNoContent = (_: number, node: ExampleFlatNode) => node.id;
 */
}
