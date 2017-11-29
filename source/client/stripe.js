


var handler = StripeCheckout.configure({
    key: 'pk_test_irc5Xurudc4rnk1LLTnDV9Ak',
    //image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
        console.log(token);
        var paymentAmount=document.getElementById("totalAmount").innerHTML;
        paymentAmount = parseInt(paymentAmount,10)*100;

        var data={
            stripeToken: token.id,
            email: token.email,
            amount: paymentAmount
        };
        
        httpRequest('POST', '/payment/', data, function (response) {
          console.log('response from server:', response);  
          createOrder(paymentAmount); 
        });
    }
  });
  
  document.getElementById('customButton').addEventListener('click', function(e) {
    // Open Checkout with further options:
    var paymentAmount=document.getElementById("totalAmount").innerHTML;
    paymentAmount = parseInt(paymentAmount,10)*100;
    console.log(paymentAmount);
    handler.open({
      name: 'Atuleur',
      description: 'Payment',
      currency: 'cad',
      amount: paymentAmount
    });
    e.preventDefault();
  });
  
  // Close Checkout on page navigation:
  window.addEventListener('popstate', function() {
    handler.close();
  });