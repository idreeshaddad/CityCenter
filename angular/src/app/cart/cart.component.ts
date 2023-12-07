import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartDto } from '../dtos/cart/Cart.model';
import { ToastrService } from 'ngx-toastr';
import { NotificationMessages } from '../shared/constants/notification-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: CartDto;

  constructor(
    private cartSvc: CartService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.cartSvc.getCart().subscribe({
      next: (carFromApi: CartDto) => {
        this.cart = carFromApi;
      }
    });
  }

  checkOut(): void {

    this.cartSvc.checkOut(this.cart).subscribe({
      next: () => {
        this.toastr.success(NotificationMessages.CheckOutSuccessfully);
        this.router.navigate(['/home']);
      }
    });
  }

}
