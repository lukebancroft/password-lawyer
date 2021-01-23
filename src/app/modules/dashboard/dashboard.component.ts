import { Component, OnInit } from '@angular/core';
import { AccountListComponent } from '../account-list/account-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})




export class DashboardComponent implements OnInit {

  constructor() { }

  private displayed: DisplayedAction = DisplayedAction.ADD;
  public actionToDisplay: typeof DisplayedAction = DisplayedAction;



  ngOnInit(): void {
  }

  setDisplayed(value: DisplayedAction) {
    this.displayed = value;
  }
  getDisplayed() {
    return this.displayed;
  }


  changeDisplayedComponent(value: DisplayedAction) {
    this.displayed = value
  }



}

enum DisplayedAction {
  ADD,
  LIST,
  EDIT
}

