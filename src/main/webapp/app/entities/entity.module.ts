import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShopAppCategoryModule } from './category/category.module';
import { ShopAppProductModule } from './product/product.module';
import { ShopAppCustomerModule } from './customer/customer.module';
import { ShopAppAddressModule } from './address/address.module';
import { ShopAppWishlistModule } from './wishlist/wishlist.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ShopAppCategoryModule,
        ShopAppProductModule,
        ShopAppCustomerModule,
        ShopAppAddressModule,
        ShopAppWishlistModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopAppEntityModule {}
