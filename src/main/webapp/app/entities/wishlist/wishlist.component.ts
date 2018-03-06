import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-wishlist',
    templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit, OnDestroy {
wishlists: Wishlist[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private wishlistService: WishlistService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.wishlistService.query().subscribe(
            (res: HttpResponse<Wishlist[]>) => {
                this.wishlists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWishlists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Wishlist) {
        return item.id;
    }
    registerChangeInWishlists() {
        this.eventSubscriber = this.eventManager.subscribe('wishlistListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
