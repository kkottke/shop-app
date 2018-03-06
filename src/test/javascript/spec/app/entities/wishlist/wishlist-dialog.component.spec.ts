/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShopAppTestModule } from '../../../test.module';
import { WishlistDialogComponent } from '../../../../../../main/webapp/app/entities/wishlist/wishlist-dialog.component';
import { WishlistService } from '../../../../../../main/webapp/app/entities/wishlist/wishlist.service';
import { Wishlist } from '../../../../../../main/webapp/app/entities/wishlist/wishlist.model';
import { CustomerService } from '../../../../../../main/webapp/app/entities/customer';

describe('Component Tests', () => {

    describe('Wishlist Management Dialog Component', () => {
        let comp: WishlistDialogComponent;
        let fixture: ComponentFixture<WishlistDialogComponent>;
        let service: WishlistService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopAppTestModule],
                declarations: [WishlistDialogComponent],
                providers: [
                    CustomerService,
                    WishlistService
                ]
            })
            .overrideTemplate(WishlistDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WishlistDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WishlistService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Wishlist(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.wishlist = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'wishlistListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Wishlist();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.wishlist = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'wishlistListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
