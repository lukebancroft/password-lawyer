import { Component, OnInit } from '@angular/core';
import { faSearchMinus, faSearchPlus, faSort, faSortDown, faSortUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
    faSearchPlus = faSearchPlus;
    faSearchMinus = faSearchMinus;

    siteFilter = '';
    tagFilter = '';
    usernameFilter = '';

    isSiteFilterOpen = false;
    isTagFilterOpen = false;
    isUsernameFilterOpen = false;

    siteSortOrder: SortOrder = SortOrder.NONE;
    usernameSortOrder: SortOrder = SortOrder.NONE;

    siteFilterStatus: FilterStatus = FilterStatus.UNFILTERED;
    tagFilterStatus: FilterStatus = FilterStatus.UNFILTERED;
    usernameFilterStatus: FilterStatus = FilterStatus.UNFILTERED;

    sortIconBySortOrder = new Map([
        [SortOrder.NONE, this.faSort],
        [SortOrder.ASCENDING, this.faSortUp],
        [SortOrder.DESCENDING, this.faSortDown]
    ]);

    filterIconByFilterStatus = new Map([
        [FilterStatus.UNFILTERED, this.faSearchPlus],
        [FilterStatus.FILTERED, this.faSearchMinus]
    ]);


    public accountItems: IAccount[];
    public displayedAccountItems: IAccount[];

    constructor(private accountService: AccountService) { }

    ngOnInit(): void {
        this.getAccounts();
    }

    getAccounts(): void {
        this.accountItems = this.accountService.getAccounts();
        this.displayedAccountItems = this.applySortOrder([...this.accountItems]);
    }

    deleteAccount(accountUuid: string): void {
        this.accountService.deleteAccount(accountUuid);
        this.getAccounts();
    }

    editAccount(accountUuid: string): void {
        this.accountService.editAccount(accountUuid);
        this.getAccounts();
    }

    getSortIcon(sortOrderState: SortOrder): IconDefinition {
        return this.sortIconBySortOrder.get(sortOrderState) || this.faSort;
    }

    toggleSiteSortOrder(): void {
        this.usernameSortOrder = SortOrder.NONE;
        this.siteSortOrder = this.toggleSortOrder(this.siteSortOrder);
        this.displayedAccountItems = this.applySortOrder([...this.accountItems]);
    }

    toggleUsernameSortOrder(): void {
        this.siteSortOrder = SortOrder.NONE;
        this.usernameSortOrder = this.toggleSortOrder(this.usernameSortOrder);
        this.displayedAccountItems = this.applySortOrder([...this.accountItems]);
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

    /**
     * Apply appropriate sort order, if none is applied, return items in their original order
     * @param accountItems the account items to sort
     */
    applySortOrder(accountItems: IAccount[]): IAccount[] {
        if (this.usernameSortOrder !== SortOrder.NONE) {
            switch (this.usernameSortOrder) {
                case SortOrder.ASCENDING: {
                    return accountItems.sort((a, b) => this.sortStringsInAscendingOrder(a.username, b.username));
                }
                case SortOrder.DESCENDING: {
                    return accountItems.sort((a, b) => this.sortStringsInDescendingOrder(a.username, b.username));
                }
            }
        }
        else if (this.siteSortOrder !== SortOrder.NONE) {
            switch (this.siteSortOrder) {
                case SortOrder.ASCENDING: {
                    return accountItems.sort((a, b) => this.sortStringsInAscendingOrder(a.site, b.site));
                }
                case SortOrder.DESCENDING: {
                    return accountItems.sort((a, b) => this.sortStringsInDescendingOrder(a.site, b.site));
                }
            }
        }
        return accountItems;
    }

    sortStringsInAscendingOrder(firstString: string, secondString: string): number {
        const a = firstString.toLowerCase();
        const b = secondString.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    }

    sortStringsInDescendingOrder(firstString: string, secondString: string): number {
        const a = firstString.toLowerCase();
        const b = secondString.toLowerCase();
        return a < b ? 1 : a > b ? -1 : 0;
    }

    toggleSiteFilter(): void {
        this.siteFilterStatus = this.toggleFilterStatus(this.siteFilterStatus);
        this.isSiteFilterOpen = !this.isSiteFilterOpen;
    }

    toggleTagFilter(): void {
        this.tagFilterStatus = this.toggleFilterStatus(this.tagFilterStatus);
        this.isTagFilterOpen = !this.isTagFilterOpen;
    }

    toggleUsernameFilter(): void {
        this.usernameFilterStatus = this.toggleFilterStatus(this.usernameFilterStatus);
        this.isUsernameFilterOpen = !this.isUsernameFilterOpen;
    }

    getFilterIcon(filterStatus: FilterStatus): IconDefinition {
        return this.filterIconByFilterStatus.get(filterStatus) || this.faSearchPlus;
    }

    toggleFilterStatus(fieldToToggle: FilterStatus): FilterStatus {
        switch (fieldToToggle) {
            case FilterStatus.FILTERED: {
                return fieldToToggle = FilterStatus.UNFILTERED;
            }
            case FilterStatus.UNFILTERED: {
                return fieldToToggle = FilterStatus.FILTERED;
            }
        }
    }
}

enum SortOrder {
    NONE,
    ASCENDING,
    DESCENDING
}

enum FilterStatus {
    FILTERED,
    UNFILTERED
}
