var handler = StripeCheckout.configure({
    key: 'pk_test_irc5Xurudc4rnk1LLTnDV9Ak',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
        console.log(token);
        var data={
            stripeToken: token.id,
            email: token.email,
            amount: 3000
        };
        
  
      httpRequest('POST', '/payment/', data, function (response) {
          console.log('response from server:', response);   
      });
    }
  });
  
  document.getElementById('customButton').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Atuleur',
      description: 'Payment',
      currency: 'cad',
      amount: 3000
    });
    e.preventDefault();
  });
  
  // Close Checkout on page navigation:
  window.addEventListener('popstate', function() {
    handler.close();
  });