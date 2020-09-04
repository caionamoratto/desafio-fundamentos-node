import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string, 
  value: number,
  type: 'income' | 'outcome';
}

class TransactionsRepository {

  private transactions: Transaction[];


  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    
    return this.transactions;

  }

  public getBalance(): Balance {
    // TODO
    
    var income : number = 0;
    var outcome : number = 0;
    var total  = 0;

    for(var i = 0; i < this.transactions.length; i++){
      if(this.transactions[i].type == 'income'){
        income += this.transactions[i].value;
        total += this.transactions[i].value;
      }else if(this.transactions[i].type == 'outcome'){
        outcome += this.transactions[i].value;
        total -= this.transactions[i].value;
      }
    }

    return {income, outcome, total};
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({title, value, type});

    if(transaction.type == 'income'){
      this.transactions.push(transaction);
    }else if(transaction.type == 'outcome') {
      if((this.getBalance().total - transaction.value) < 0){

        throw Error('Não há saldo disponível para transação');
        console.log(this.transactions);

      }else{
        this.transactions.push(transaction);
      }
    }

    return transaction;
  }
}

export default TransactionsRepository;
