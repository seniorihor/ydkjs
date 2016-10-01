const TAX_RATE           = 0.08;
const PHONE_PRICE        = 99.99;
const ACCESSORY_PRICE    = 4.99;
const SPENDING_THRESHOLD = 500;

var bank_account = {
  balance:     0,
  spent_today: 0
}

function startShoping() {
  var phones_count      = 0;
  var accessories_count = 0;
  var total_price       = 0;
  var phone_price       = finalPrice( PHONE_PRICE );
  var accessory_price   = finalPrice( ACCESSORY_PRICE );
  var enough_money      = bank_account.balance >= phone_price;

  if ( enough_money ) {
    console.log( "[ starting shopping ]" );
  } else {
    console.log( "You can't afford it! First top-up account." );
  }

  while ( bank_account.balance >= phone_price ) {
    if ( purchasePhone( phone_price ) ) {
      phones_count++;
      total_price += phone_price;

      if ( purchaseAccessory( accessory_price ) ) {
        accessories_count++;
        total_price += accessory_price;
      }
    }
  }

  if ( phones_count > 0 ) {
    total_price              = formatPrice(total_price);
    bank_account.spent_today = formatPrice(bank_account.spent_today);
    bank_account.balance     = formatPrice(bank_account.balance);

    console.log(
      `You bought ${phones_count} phones and ${accessories_count} accessories\n` +
      `Total price: $${total_price}\n`                                           +
      `Spent today: $${bank_account.spent_today}\n`                              +
      `Money left: $${bank_account.balance}`
    );
  }
}

function payByBankAccount( price ) {
  if ( bank_account.balance >= price ) {
    console.log( "[ paying by bank account ]" );

    bank_account.balance     -= formatPrice( price );
    bank_account.spent_today += formatPrice( price );

    return true;
  }
  return false;
}

function topUpBankBalance() {
  console.log( "[ top up balance ]" );

  var price = prompt( "Top up balance for ($):" );
  bank_account.balance += formatPrice( price );

  return bank_account.balance;
}

function purchasePhone( price ) {
  console.log( "[ purchasing a phone ]" );

  return payByBankAccount( formatPrice( price ) );
}

function purchaseAccessory( price ) {
  if ( bank_account.spent_today <= SPENDING_THRESHOLD ) {
    console.log( "[ purchasing an accessory ]" );

    payByBankAccount( price );

    return true;
  }
  return false;
}

function finalPrice( price ) {
  price += ( price * TAX_RATE );

  return formatPrice( price );
}

function formatPrice( price ) {
  return Number( Number( price ).toFixed( 2 ) );
}
