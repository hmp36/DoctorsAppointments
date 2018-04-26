import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { BucketlistService } from '../bucketlist.service';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { User } from '../classes/user';
import { Bucketlist } from '../classes/bucketlist';
import { Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: User;
  // private bucketlists: Array<Bucketlist> = [];
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


  constructor(private _us: UserService, private _bs: BucketlistService, private _router: Router) { }

  ngOnInit() {
    this._us.checkstatus()
      .then(user => this.user = user)
      .catch(err => this._router.navigateByUrl('/login'));

    this._bs.getBucketlists()
      .then(bucketlists => {
        this.bucketlists = bucketlists;
        for (const bucketlist of this.bucketlists) {
          const newtime = new Date('May 3, 1993 00:00:00');
          newtime.setMinutes(bucketlist.time);
          bucketlist.time = newtime;

    // this.getAllbucketlists();
        }
      })
      .catch(err => console.log(err));
  }
  logout() {
    this._us.logout()
      .then(response => this._router.navigateByUrl('/login'));
  }
  refresh(eventData) {
    this._bs.getBucketlists()
      .then(bucketlists => {
        this.bucketlists = bucketlists;
        for (const bucketlist of this.bucketlists) {
          const newtime = new Date('May 3, 1993 00:00:00');
          newtime.setMinutes(bucketlist.time);
          bucketlist.time = newtime;
        }
      })
      .catch(err => console.log(err));
  }



// *******************************************************************************************************


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

  // @Input() set user(newuser) {
  //   this._user = newuser;
  // }

  // tslint:disable-next-line:member-ordering
  // @Output() refresh = new EventEmitter();




  }
  // delete(bucketlistID); {
  //   this._as.delete(bucketlistID)
  //     .then(result => this.refresh.emit('update!'))
  //     .catch(err => console.log(err));
  // }

  // reset(); {
  //   this.display_bucketlists = this._bucketlists;
  //   this.searched = false;

  // getAllbucketlists(); {
  //   this._as.getBucketlists()
  //     .then(result => this.display_bucketlists);
  // }
  // search(); {
  //   this.searched = true;
  //   this.display_bucketlists = this._bucketlists.filter(bucketlist => {
  //     // tslint:disable-next-line:max-line-length

      // return (bucketlist.complain.toLowerCase().includes(this.searchfield.value.toLowerCase())
      //   || bucketlist._username.toLowerCase().includes(this.searchfield.value.toLowerCase()));

    this.searchfield = {
      value: ''
    };





