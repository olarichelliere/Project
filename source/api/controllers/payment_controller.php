<?php

class PaymentController
{
    

    $stripe = array(
      "secret_key"      => "sk_test_m8PfuH9KVc1grJFYU2SeLAlj",
      "publishable_key" => "pk_test_irc5Xurudc4rnk1LLTnDV9Ak"
    );
    
    \Stripe\Stripe::setApiKey($stripe['secret_key']);

    function collect($payload){
        $email=$payload->email;
        $stripToken=$payload->stripeToken;
        $amount=$payload->amount;


    }


}