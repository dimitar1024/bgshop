import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { IProduct } from 'src/app/interfaces/IProduct';
import Swal from 'sweetalert2';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: IEmployee[];



  displayedColumns: string[] = ['first_name', 'last_name', 'username', 'email', 'phone', 'actions'];
  // displayedColumns: string[] = ['first_name', 'last_name' ];
  dataSource = ELEMENT_DATA;

  constructor(public db: AngularFirestore) {
    this.getAllEmployees();
  }
  ngOnInit(): void {
  }

  getAllEmployees() {
    this.db.collection('user', ref => ref.where('role', '==', 2)).snapshotChanges().subscribe((response) => {
      this.employees = response.map(item => {
        let prod: IEmployee = item.payload.doc.data() as IEmployee;
        prod.docId = item.payload.doc.id;
        return prod;
      }
      );
    })
  }

  deleteEmployee(docid: string) {
    Swal.fire({
      title: 'Сигурни ли сте че искате да изтриете този служител',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Да',
      cancelButtonText: 'Не'
    }).then((result) => {
      if (result.value) {
        this.db.collection('user').doc(docid).delete();
        Swal.fire(
          'Изтрит!',
          'Успешно изтрихте служителя',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

}
