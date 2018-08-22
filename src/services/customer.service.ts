import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

const customerArtifacts = require('../../build/contracts/Customer.json');
const contract = require('truffle-contract');

@Injectable()
export class CustomerService {

    Customer = contract(customerArtifacts);
    account:string;

  constructor(
  	private web3Ser: Web3Service,
  	) { 
    this.Customer.setProvider(web3Ser.web3.currentProvider);
    
  this.web3Ser.getAccounts().subscribe(accs => {
    this.account = accs[0];
    console.log(this.account);
   
  }, err => alert(err))
  }



  getBalance(): Observable<number> {
    let meta;
    return Observable.create(observer => {
  		this.Customer
  		  .deployed()
  		  .then(instance => {
  		    meta = instance;
          //we use call here so the call doesn't try and write, making it free
  		    return meta.getBalance.call(
            {
              from: this.account
            }   
          );
  		  })
  		  .then(value => {
  		    observer.next(value.toNumber())
          observer.complete()
  		  })
  		  .catch(e => {
  		    console.log(e);
  		    observer.error(e)
  		  });
  	})
  }

  checkAccount(): Observable<boolean> {
    let meta;
    return Observable.create(observer => {
  		this.Customer
  		  .deployed()
  		  .then(instance => {
  		    meta = instance;
          //we use call here so the call doesn't try and write, making it free
  		    return meta.checkAccount.call({
            from: this.account
          });
  		  })
  		  .then(value => {
          observer.next(value)
          observer.complete()
  		  })
  		  .catch(e => {
  		    console.log(e);
  		    observer.error(e)
  		  });
  	})
  }


  getVehicleList(): Array < any > {
    let meta;
    var size;
    var numbers = new Array;
    this.Customer
    .deployed()
    .then(instance => {
      meta = instance;

      let vehicleLenght= meta.getVehicleLenght({
        from: this.account
      });

      vehicleLenght.then(data=>{
        size = data.toNumber();
      }).then(()=>{
        for (var _i = 0; _i < size; _i++) {
          let value = meta.getListVehicle(_i, {
            from: this.account
          });
          value.then(data=>{
            numbers.push(data[0]); 
            numbers.push(data[1]); 
            numbers.push(data[2]); 
          })
        }
      });
    })
    return numbers;
    // })
  }
  

  addCoin(from, value): Observable<any> {
    let meta;
    return Observable.create(observer => {
        this.Customer
          .deployed()
          .then(instance => {
            meta = instance;
            return meta.addCoin( {
              from: from,
              value: value,
              gas: 100000,
              gasprice: 0,
              });
          })
          .then(() => {
            observer.next()
            observer.next()
          })
          .catch(e => {
            console.log(e);
            observer.error(e)
          });
    })
}
}