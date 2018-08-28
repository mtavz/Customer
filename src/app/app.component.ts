import {
  Component,
  HostListener,
  NgZone
} from '@angular/core';

import {
  Web3Service
} from '../services/web3.service'

import {
  CustomerService
} from 'services/customer.service';
import { delay } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // TODO add proper types these variables
  account: any;
  accounts: any;
  fixedInfo: any;
  dynamicInfo: any;

  balance: number;

  value: number;
  vehicle_plate_id: string;
  status: string;

  vehicle_id: string;
  vehicle_owner: string;
  vehicle_name: string;
  vehicle_type: string;
  vehicle_color: string;
  vehicle_charac: string;
  vehicle_manufac: string;
  vehicle_datereg: string;
  vehicle_datepro: string;
  vehicle_serial: string;
  vehicle_status: string;
  address: string;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private vehicleServie: CustomerService
  ) {
    this.onReady();
  }

  onReady = () => {
    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];
      console.log(this.account);
      this.address = this.account;
    }, err => alert(err))
    this.getBalance();
  };


  setStatus = message => {
    this.status = message;
  };

  getBalance =()=>{
    this.vehicleServie.getBalance()
    .subscribe(value => {
      this.balance = value
      console.log(this.balance.toString());
    }, e => {
      this.setStatus('Error getting balance; see log.')
    })
  }

  getLogs =() =>{
    let x = this.vehicleServie.getLogs();
    console.log(x);
  }

  getLogs3 =() =>{
    this.vehicleServie.getLogs3(this.account)
    .subscribe(value => {
      console.log(value);
    }, e => {
      this.setStatus('Error getting balance; see log.')
    })

  }
  addCoin = () => {
    this.setStatus('Initiating transaction... (please wait)');
    this.vehicleServie.addCoin(this.account, this.value)
      .subscribe(() => {
        this.setStatus('Transaction complete!');
        this.getBalance();
      }, e => this.setStatus('Error sending coin; see log.'))
  };


  checkAccount = () => {
    this.vehicleServie.checkAccount()
      .subscribe(value => {
        console.log(value.toString());
      }, e => {
        this.setStatus('Error getting balance; see log.')
      })
  }

  getVehicleList = () => {
    console.log(this.vehicleServie.getVehicleList())
  }
}
