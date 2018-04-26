import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BucketlistService {

  constructor(private _http: Http) { }
  getBucketlists() {
    return this._http.get('/api/bucketlists')
      .map((response: Response) => response.json())
      .toPromise();
  }
  delete(bucketlistID) {
    return this._http.delete(`/api/bucketlists/${bucketlistID}`)
      .map((response: Response) => response.json())
      .toPromise();
  }
  addbucketlist(bucketlist) {
    return this._http.post('/api/bucketlists', bucketlist)
      .map((response: Response) => response.json())
      .toPromise();
  }
}

