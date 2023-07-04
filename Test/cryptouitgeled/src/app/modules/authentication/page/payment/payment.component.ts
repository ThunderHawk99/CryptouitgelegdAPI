import { AuthenticationService } from 'src/app/data/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  isError: boolean = false;

  isPaymentError: boolean = false;
  
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private ngZone: NgZone){
    
  }

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          console.log('creating order')
          return actions.order.create({
            purchase_units: [
              {
                description: 'Crypto Uitgelegd Subscription',
                amount: {
                  currency_code: 'EUR',
                  value: 9.99
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.ngZone.run(() => {
          const userReadyToPay = this.authenticationService.userReadyToPay
          if(userReadyToPay){
            this.authenticationService.register(userReadyToPay).subscribe(
              (data) => {
                this.router.navigate(['/authentication'],
                {queryParams :{
                  origin: 'payment',
                  email: userReadyToPay.email
                }});
              },
              (error) => {
                this.isError = true;
                this.authenticationService.userReadyToPay = null;
              }
            );
          }else{
            this.router.navigate(['/authentication'],
            {queryParams :{
              origin: 'payment'
            }});
          }
        })},
        onError: err => {
          this.authenticationService.userReadyToPay = null;
          this.isPaymentError = true;
        }
      })
      .render(this.paypalElement.nativeElement);
  }

  
}
