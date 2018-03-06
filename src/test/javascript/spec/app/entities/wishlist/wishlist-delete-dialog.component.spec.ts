/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShopAppTestModule } from '../../../test.module';
import { WishlistDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/wishlist/wishlist-delete-dialog.component';
import { WishlistService } from '../../../../../../main/webapp/app/entities/wishlist/wishlist.service';

describe('Component Tests', () => {

    describe('Wishlist Management Delete Component', () => {
        let comp: WishlistDeleteDialogComponent;
        let fixture: ComponentFixture<WishlistDeleteDialogComponent>;
        let service: WishlistService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopAppTestModule],
                declarations: [WishlistDeleteDialogComponent],
                providers: [
                    WishlistService
                ]
            })
            .overrideTemplate(WishlistDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WishlistDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WishlistService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
