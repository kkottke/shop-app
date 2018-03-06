/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShopAppTestModule } from '../../../test.module';
import { WishlistComponent } from '../../../../../../main/webapp/app/entities/wishlist/wishlist.component';
import { WishlistService } from '../../../../../../main/webapp/app/entities/wishlist/wishlist.service';
import { Wishlist } from '../../../../../../main/webapp/app/entities/wishlist/wishlist.model';

describe('Component Tests', () => {

    describe('Wishlist Management Component', () => {
        let comp: WishlistComponent;
        let fixture: ComponentFixture<WishlistComponent>;
        let service: WishlistService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopAppTestModule],
                declarations: [WishlistComponent],
                providers: [
                    WishlistService
                ]
            })
            .overrideTemplate(WishlistComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WishlistComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WishlistService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Wishlist(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.wishlists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
