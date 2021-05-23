## How the app state will look?

1. Wallets

USD: { currency: 'USD' , balance: 12.09}
2: { currency: 'EUR' , balance: 21.39}
3: { currency: 'GBP' , balance: 41.39}

1.2 Transactions

Exemples:

USD -> GBP
12  -> 12*Rate[USD][GBP]

2. Rate

Exchange exemples

EUR -> USD: 1 => 1.22
EUR -> GBP: 1 => 0.85

USD -> EUR: 1 => 1 => 1/1.22
USD -> GBP => USD -> EUR -> GBP: 1 => (1/1.22)*0.85

GBP -> EUR: 1 => 1/0.85
GBP -> USD => GBP -> EUR -> USD: 1 -> (1/0.85)*1.22


State:
{
  EUR: {
    USD: 1.22,
    GBP: 0.85870
  },
  USD: {
    EUR: 1/ EUR.USD
    GBP: USD.EUR * EUR.GBP
  }
  GBP: {
    EUR:  1 / EUR.GBP
    USD: GBP.EUR * EUR.USD
  }
}




Exemple Sell/Buy

SELL EUR USD 1 => - 1 euro , +1*rate(EURUSD)
BUY  EUR USD 1 => +1 euro , - 1*rate(eurusd)

