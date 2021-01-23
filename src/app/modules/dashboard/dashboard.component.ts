import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    constructor() { }

    private displayed: DisplayedAction = DisplayedAction.LIST;
    public actionToDisplay: typeof DisplayedAction = DisplayedAction;

    ngOnInit(): void {
    }

    setDisplayed(value: DisplayedAction): void {
        this.displayed = value;
    }
    getDisplayed(): DisplayedAction {
        return this.displayed;
    }

    changeDisplayedComponent(value: DisplayedAction): void {
        this.displayed = value;
    }
}

enum DisplayedAction {
    ADD,
    LIST,
    EDIT
}

