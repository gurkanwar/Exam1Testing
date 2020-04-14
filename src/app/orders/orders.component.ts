import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<any> = [];
  name = '';
  errorMessage = '';
  confirmMessage = '';

  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {

  }

  async ngOnInit() {
    this.loadDefaultOrders();

  }

  calculate() {
    const total = this.orders.reduce((inc, item, i, arr) => {
      inc += item.price * item.quantity;
      return inc;
    }, 0);
    const taxAmount = total * .1;

    const subTotal = total - taxAmount;
    return {
      total: total,
      taxAmount: taxAmount,
      subTotal: subTotal
    }
  }
  submit() {
    const commaIndex = this.name.indexOf(', ');
    let error = false;

    if (this.name === '') {
      this.errorMessage = 'You must enter your name else I am not going to run!';
      error = true;
    } else if (commaIndex === -1) {
      this.errorMessage = 'Name must have a comma!!';
      error = true;

    }
    if (!error) {
      const firstName = this.name.slice(commaIndex + 1, this.name.length);
      const lastName = this.name.slice(0, commaIndex);
      const fullName = firstName + ' ' + lastName;

      const calculation = this.calculate();
      this.confirmMessage = `Are you sure eh? Thanks ${fullName}. Your sub total is: ${calculation.subTotal}.
       Your tax amount is ${calculation.taxAmount}.
       Your grand total is ${calculation.total}`;
      this.flexModal.openDialog('confirm-modal');

    } else {
      this.flexModal.openDialog('error-modal');
    }
    }

  loadDefaultOrders() {
    this.orders = [{
      'pid': '1',
      'image': 'assets/sm_hotdog.jpeg',
      'description': 'Hot Dog',
      'price': 5.00,
      'quantity': 2
    }, {
      'pid': '2',
      'image': 'assets/sm_hamberger.jpeg',
      'description': 'Hamberger',
      'price': 6.00,
      'quantity': 1
    }, {
      'pid': '3',
      'image': 'assets/sm_pizza.jpeg',
      'description': 'Large Pizza',
      'price': 12.00,
      'quantity': 2
    }];

  }
  delete(index: number) {
    this.orders.splice(index, 1);


  }

  addItem(item: string) {
    // switch (item) {
    //   case 'hot dog':
    //     this.orders.unshift({
    //       'pid': '1',
    //       'image': 'assets/sm_hotdog.jpeg',
    //       'description': 'Hot Dog',
    //       'price': 5.00,
    //       'quantity': 0
    //     });
    //     break;
    //   case 'hamberger':
    //     this.orders.unshift({
    //       'pid': '2',
    //       'image': 'assets/sm_hamberger.jpeg',
    //       'description': 'Hamberger',
    //       'price': 6.00,
    //       'quantity': 0
    //     });
    //     break;
    //      case 'pizza':
    //        this.orders.unshift({
    //         'pid': '3',
    //         'image': 'assets/sm_pizza.jpeg',
    //         'description': 'Large Pizza',
    //         'price': 12.00,
    //         'quantity': 1
    //       });
    //     break;
    // }
    if (item === 'hot dog') {
      this.orders.unshift({
        'pid': '1',
        'image': 'assets/sm_hotdog.jpeg',
        'description': 'Hot Dog',
        'price': 5.00,
        'quantity': 0
      });
    } else if (item === 'hamberger') {
      this.orders.unshift({
        'pid': '2',
        'image': 'assets/sm_hamberger.jpeg',
        'description': 'Hamberger',
        'price': 6.00,
        'quantity': 0
      });

    } else if (item === 'pizza') {
      this.orders.unshift({
        'pid': '3',
        'image': 'assets/sm_pizza.jpeg',
        'description': 'Large Pizza',
        'price': 12.00,
        'quantity': 0
      });

    }

  }



}








  // prepare result, splice last name, first name

  // Calculate total and perform input validation

  // display the order form with orders from orders.json

  // Clear the orders form

  // Add items 'Hot Dog', 'Hamberger' and 'Pizza' to list when corresponding button is clicked

  // delete line item (order) when delete button is click

  // read in the orders.json file and populate the list table with the initial orders (3)


