import { IProduct } from "./product";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable()

export class ProductResolver implements Resolve<IProduct>{

    constructor(
        private productService: ProductService,
        private router: Router ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        let id = route.paramMap.get('id')
        if (isNaN(+id)){
            console.log(`Product id was not a number: ${id}`)
            this.router.navigate(['/products'])
            return Observable.of(null)
        }

        return this.productService.getProduct(+id)
            .map(product => {
                if (product) {
                    return product
                }
                console.log(`Product was not found: ${id}`)
                this.router.navigate(['/products'])
                return null
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`)
                this.router.navigate(['/products'])
                return Observable.of(null)
            })
    }
}