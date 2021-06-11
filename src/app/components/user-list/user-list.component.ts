import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserListService } from 'src/app/services/user-list.service';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('500ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('500ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class UserListComponent implements OnInit {

  users: User[];
  userInput: string;
  selectedUser: User;

  constructor(private userListService: UserListService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userListService.getUserList().subscribe(users => {
      this.users = users;
    })
  }

  sortByAge() {
    this.users = this.users.sort((a, b) => {
      return parseInt(a.age) - parseInt(b.age)
    });
  }

  showDetails(item: number) {
    this.users[item].toggle = !this.users[item].toggle;
  }

}
