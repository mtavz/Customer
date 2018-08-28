import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import {
  fromPromise
} from 'rxjs/observable/fromPromise';
import {
  Web3Service
} from './web3.service'

const customerArtifacts = require('../../build/contracts/Customer.json');
const contract = require('truffle-contract');

@Injectable()
export class CustomerService {

  Customer = contract(customerArtifacts);
  account: string;

  constructor(
    private web3Ser: Web3Service,
  ) {
    this.Customer.setProvider(web3Ser.web3.currentProvider);

    this.web3Ser.getAccounts().subscribe(accs => {
      this.account = accs[0];
      console.log(this.account);

    }, err => alert(err))
  }



  getBalance(): Observable < number > {
    let meta;
    return Observable.create(observer => {
      this.Customer
        .deployed()
        .then(instance => {
          meta = instance;
          //we use call here so the call doesn't try and write, making it free
          return meta.getBalance.call({
            from: this.account
          });
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

  checkAccount(): Observable < boolean > {
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

  getLogs2(from): Observable < Array < any > > {
    let meta;
    var numbers = new Array;
    return Observable.create(observer => {
      this.Customer
        .deployed()
        .then(instance => {
          meta = instance;
          for (var _i = 0; _i < 100; _i++) {
            let value = meta.getLogs('30Z2724', _i, {
              from: this.account
            });
            value.then(data => {
              numbers.push(data[0]);
              numbers.push(data[1]);
              var date = new Date(data[2] * 1000);
              var day = date.getDay();
              var month = date.getMonth();
              var year = date.getFullYear();
              // Hours part from the timestamp
              var hours = date.getHours();
              // Minutes part from the timestamp
              var minutes = "0" + date.getMinutes();
              // Seconds part from the timestamp
              var seconds = "0" + date.getSeconds();

              // Will display time in 10:30:23 format
              var formattedTime = day + '/' + month + '/' + year + ' - ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
              numbers.push(formattedTime);
            })
          }
        })
        .then((value) => {
          observer.next(value)
          observer.complete()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

  getLogs3(from): Observable < Array < string >> {
    let meta;
    let size;
    let numbers = new Array;

    return Observable.create(observer => {
      this.Customer.deployed().then(instance => {
        meta = instance;

        let logsLenght = meta.getLogsLength('30Z2724', {
          from: from,
        });

        return logsLenght.then(data => {
          size = data.toNumber();
        }).then(() => {
          //console.log(meta.botList);
          for (var _i = 0; _i < size; _i++) {
            let value = meta.getLogs('30Z2724', _i, {
              from: this.account
            });
            value.then(data => {
              numbers.push(data[0]);
              numbers.push(data[1]);
              var date = new Date(data[2] * 1000);
              var day = date.getDay();
              var month = date.getMonth();
              var year = date.getFullYear();
              // Hours part from the timestamp
              var hours = date.getHours();
              // Minutes part from the timestamp
              var minutes = "0" + date.getMinutes();
              // Seconds part from the timestamp
              var seconds = "0" + date.getSeconds();
  
              // Will display time in 10:30:23 format
              var formattedTime = day + '/' + month + '/' + year + ' - ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
              numbers.push(formattedTime);
            })
          }
          observer.next(numbers)
          observer.complete()

          //return numbers
          }).catch(e => {
          console.log(e);
          observer.error(e)
        });

      }).then((value) => {
        //observer.next(value)
        //observer.complete()
      }).catch(e => {
        console.log(e);
        //observer.error(e)
      });
    })
  }



  getLogs(): Array < any > {
    let meta;
    var size;
    var numbers = new Array;
    this.Customer
    .deployed()
    .then(instance => {
      meta = instance;

      let logsLength = meta.getLogsLength('30Z2724', {
        from: this.account
      });

      logsLength.then(data => {
        size = data.toNumber();
      }).then(() => {
        for (var _i = 0; _i < size; _i++) {
          let value = meta.getLogs('30Z2724', _i, {
            from: this.account
          });
          value.then(data => {
            numbers.push(data[0]);
            numbers.push(data[1]);
            var date = new Date(data[2] * 1000);
            var day = date.getDay();
            var month = date.getMonth();
            var year = date.getFullYear();
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = day + '/' + month + '/' + year + ' - ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            numbers.push(formattedTime);
          })
        }
      });
    })
    return numbers;
    // })
  }

  getVehicleList(): Array < any > {
    let meta;
    var size;
    var numbers = new Array;
    this.Customer
    .deployed()
    .then(instance => {
      meta = instance;

      let vehicleLenght = meta.getVehicleLenght({
        from: this.account
      });

      vehicleLenght.then(data => {
        size = data.toNumber();
      }).then(() => {
        for (var _i = 0; _i < size; _i++) {
          let value = meta.getListVehicle(_i, {
            from: this.account
          });
          value.then(data => {
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


  addCoin(from, value): Observable < any > {
    let meta;
    return Observable.create(observer => {
      this.Customer
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.addCoin({
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
