import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Wishlist } from './wishlist.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Wishlist>;

@Injectable()
export class WishlistService {

    private resourceUrl =  SERVER_API_URL + 'api/wishlists';

    constructor(private http: HttpClient) { }

    create(wishlist: Wishlist): Observable<EntityResponseType> {
        const copy = this.convert(wishlist);
        return this.http.post<Wishlist>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(wishlist: Wishlist): Observable<EntityResponseType> {
        const copy = this.convert(wishlist);
        return this.http.put<Wishlist>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Wishlist>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Wishlist[]>> {
        const options = createRequestOption(req);
        return this.http.get<Wishlist[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Wishlist[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Wishlist = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Wishlist[]>): HttpResponse<Wishlist[]> {
        const jsonResponse: Wishlist[] = res.body;
        const body: Wishlist[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Wishlist.
     */
    private convertItemFromServer(wishlist: Wishlist): Wishlist {
        const copy: Wishlist = Object.assign({}, wishlist);
        return copy;
    }

    /**
     * Convert a Wishlist to a JSON which can be sent to the server.
     */
    private convert(wishlist: Wishlist): Wishlist {
        const copy: Wishlist = Object.assign({}, wishlist);
        return copy;
    }
}
