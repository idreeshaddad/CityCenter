import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LookupDto } from 'src/app/dtos/lookups/lookupDto.model';
import { CreateUpdateOrderDto } from 'src/app/dtos/orders/create-update-order.dto';
import { PageMode } from 'src/app/enums/page-mode.enum';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-update-order',
  templateUrl: './create-update-order.component.html',
  styleUrls: ['./create-update-order.component.css']
})
export class CreateUpdateOrderComponent implements OnInit {

  orderId!: number;
  order?: CreateUpdateOrderDto;
  form!: FormGroup;

  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  customerLookup!: LookupDto[];
  productsLookup!: LookupDto[];

  constructor(
    private orderSvc: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private customerSvc: CustomerService,
    private productSvc: ProductService
  ) { }

  ngOnInit(): void {

    this.setOrderId();
    this.setPageMode();
    this.buildForm();
    this.loadLookups();

    if (this.pageMode == PageMode.Edit) {

      this.loadOrder();
    }
  }

  submit(): void {
    alert("[NOT IMPLEMENTED!]");
  }

  //#region Private Functions

  private setOrderId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private setPageMode(): void {

    if (this.orderId) {

      this.pageMode = PageMode.Edit
    }
  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      paymentMethod: ['', Validators.required],
      customerId: ['', Validators.required],
      productIds: ['', Validators.required]
    });
  }

  private loadLookups(): void {

    this.loadCustomerLookup();
    this.loadProductLookup();
  }

  private loadCustomerLookup(): void {

    this.customerSvc.getCustomerLookup().subscribe({
      next: (customerLookupFromApi: LookupDto[]) => {
        this.customerLookup = customerLookupFromApi;
      }
    })
  }

  private loadProductLookup(): void {

    this.productSvc.getProductLookup().subscribe({
      next: (productLookupFromApi: LookupDto[]) => {
        this.productsLookup = productLookupFromApi;
      }
    })

  }

  private loadOrder(): void {

    this.orderSvc.getOrderForEdit(this.orderId).subscribe({
      next: (orderForEditFromApi: CreateUpdateOrderDto) => {
        this.order = orderForEditFromApi;
      }
    });
  }

  //#endregion

}
