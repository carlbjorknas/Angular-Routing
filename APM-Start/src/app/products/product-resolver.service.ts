import { IProduct } from "./product";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable()

export class ProductResolver implements Resolve<IProduct>{

    constructor(private productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        let id = +route.paramMap.get('id')
        return this.productService.getProduct(id)
    }
}