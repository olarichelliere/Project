<?php

$stripe = array(
  "secret_key"      => "sk_test_m8PfuH9KVc1grJFYU2SeLAlj",
  "publishable_key" => "pk_test_irc5Xurudc4rnk1LLTnDV9Ak"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);

class PaymentController{
    
    public function collect($payload){ 
        
      $token  = $payload->stripeToken;

      $customer = \Stripe\Customer::create(array(
        'email' => $payload->email,
        'source'  => $token
      ));

      $charge = \Stripe\Charge::create(array(
        'customer' => $customer->id,
        'amount'   => $payload->amount,
        'currency' => 'cad'
      ));    
              
    }  
}