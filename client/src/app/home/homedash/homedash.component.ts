import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Bucketlist } from '../../classes/bucketlist';
import { BucketlistService } from '../../bucketlist.service';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { SearchPipe } from '../../search.pipe';


@Component({
  selector: 'app-homedash',
  templateUrl: './homedash.component.html',
  styleUrls: ['./homedash.component.css']
})
export class HomedashComponent implements OnInit {
  private datePipe = new DatePipe('en-US');
  private _bucketlists = [];
  display_bucketlists = [];
  private searchfield = {
    value: ''
  };
  private _user = {};
  private searched = false;
  private today = new Date(Date.now());
  private todayzero = this.today.setHours(0);
  private todaydate = this.datePipe.transform(new Date(this.todayzero), 'yyyy-MM-dd');
  private tomorrow = this.today.setHours(this.today.getHours() + 24);
  private todaytime = new Date(Date.now()).getTime();
  private todaytimeonly = this.datePipe.transform(new Date(this.todaytime), 'HH:mm');

  @Input() set bucketlists(newbucketlists) {
    for (const bucketlist of newbucketlists) {
      bucketlist.date = new Date(bucketlist.date);
      const _localOffset = 2 * 60 * 60000;
      const _userOffset = (bucketlist.date).getTimezoneOffset() * 60000;
      bucketlist.date = new Date((bucketlist.date).getTime() + _localOffset + _userOffset);
    }
    this._bucketlists = newbucketlists.filter(bucketlist => {
      let ok = true;
      const bucketlistdate = this.datePipe.transform(new Date(bucketlist.date), 'yyyy-MM-dd');
      if (bucketlist.date) {
        ok = bucketlist.date >= this.todayzero;
      }
      if (bucketlistdate === this.todaydate) {
        const bucketlisttime = this.datePipe.transform(new Date(bucketlist.time), 'HH:mm');
        ok = bucketlisttime >= this.todaytimeonly;
      }
      return ok;
    });
    this.display_bucketlists = this._bucketlists;
    this.display_bucketlists.sort(function (a, b) {
      // compare dates
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
             }

      // dates were equal, try times
      if (a.time < b.time) {
        return -1;
      } else if (a.time > b.time) {
        return 1;
             }

      return 0;
    });
  }

  @Input() set user(newuser) {
    this._user = newuser;
  }

  @Output() refresh = new EventEmitter();

  constructor(private _as: BucketlistService, private _router: Router) { }

  ngOnInit() {
    this.getAllBucketlists();
  }
  delete(bucketlistID) {
    this._as.delete(bucketlistID)
      .then(result => this.refresh.emit('update!'))
      .catch(err => console.log(err));
  }

  reset() {
    this.display_bucketlists = this._bucketlists;
    this.searched = false;
  }
getAllBucketlists() {
  this._as.getBucketlists()
    .then(result =>  this.display_bucketlists );
}
  search() {
    this.searched = true;
    this.display_bucketlists = this._bucketlists.filter(bucketlist => {
      // tslint:disable-next-line:max-line-length
      return (bucketlist.complain.toLowerCase().includes(this.searchfield.value.toLowerCase()) || bucketlist._username.toLowerCase().includes(this.searchfield.value.toLowerCase()));
    });
    this.searchfield = {
      value: ''
    };
  }
}

