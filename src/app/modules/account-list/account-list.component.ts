import { Component, OnInit } from '@angular/core';
import { faSort, faSortDown, faSortUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/core/services/account-service/account-service.service';
import { IAccount } from 'src/app/shared/models/IAccount';

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.scss']
})

export class AccountListComponent implements OnInit {

    faSort = faSort;
    faSortUp = faSortUp;
    faSortDown = faSortDown;

    siteSortOrder: SortOrder = SortOrder.NONE;
    usernameSortOrder: SortOrder = SortOrder.NONE;

    sortIconBySortOrder = new Map([
        [SortOrder.NONE, this.faSort],
        [SortOrder.ASCENDING, this.faSortUp],
        [SortOrder.DESCENDING, this.faSortDown]
    ]);


    public accountItems: IAccount[];

    constructor(private accountService: AccountService) { }

    ngOnInit(): void {
        this.getAccounts();
    }

    getAccounts(): void {
        this.accountItems = this.accountService.getAccounts();
    }

    deleteAccount(accountUuid: string): void {
        this.accountService.deleteAccount(accountUuid);
        this.getAccounts();
    }

    editAccount(accountUuid: string): void {
        this.accountService.editAccount(accountUuid);
        this.getAccounts();
    }

    getSortIcon(SortOrderState: SortOrder): IconDefinition {
        return this.sortIconBySortOrder.get(SortOrderState) || this.faSort;
    }

    toggleSiteSortOrder(): void {
        this.usernameSortOrder = SortOrder.NONE;
        this.siteSortOrder = this.toggleSortOrder(this.siteSortOrder);
    }

    toggleUsernameSortOrder(): void {
        this.siteSortOrder = SortOrder.NONE;
        this.usernameSortOrder = this.toggleSortOrder(this.usernameSortOrder);
    }

    toggleSortOrder(fieldToToggle: SortOrder): SortOrder {
        switch (fieldToToggle) {
            case SortOrder.NONE: {
                return fieldToToggle = SortOrder.ASCENDING;
            }
            case SortOrder.ASCENDING: {
                return fieldToToggle = SortOrder.DESCENDING;
            }
            case SortOrder.DESCENDING: {
                return fieldToToggle = SortOrder.NONE;
            }
        }
    }
}

enum SortOrder {
    NONE,
    ASCENDING,
    DESCENDING
}
