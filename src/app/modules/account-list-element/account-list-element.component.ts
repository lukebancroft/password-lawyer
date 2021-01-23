import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { faBan, faCog, faEllipsisH, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { IAccount } from 'src/app/shared/models/IAccount';

@Component({
    selector: 'app-account-list-element',
    templateUrl: './account-list-element.component.html',
    styleUrls: ['./account-list-element.component.scss']
})
export class AccountListElementComponent implements OnInit {
    @Output() deleteEmitter = new EventEmitter<string>();
    @Output() editEmitter = new EventEmitter<string>();
    @Input() account: IAccount;
    @Input() isLastElement: boolean;
    @Input() index: number;

    faEllipsisH = faEllipsisH;
    faInfoCircle = faInfoCircle;
    faCog = faCog;
    faBan = faBan;

    constructor() { }

    ngOnInit(): void {
        this.addScrollToOverflowingTags();
        if (this.isLastElement) {
            document.getElementsByClassName('element-row')[this.index].classList.add('last-element');
        }
    }

    /**
     * If tags overflow out of table column, make cell scrollable
     */
    addScrollToOverflowingTags(): void {
        const tagLists = document.getElementsByClassName('tag-list-multiple');
        for (const tagList of tagLists) {
            const overflowing = tagList.clientWidth < tagList.scrollWidth;
            if (overflowing) {
                tagList.classList.add('tag-list-scrollable');
            }
        }
    }

    /**
     * Display account details when clicked. Only one row's details are displayed
     * @param event the event to know if the target should trigger this display toggle
     */
    toggleAccountDetails(event: Event): void {
        const dropdownIcon: Element = document.getElementsByClassName('dropdown-icon')[this.index];
        if (!(event.target === dropdownIcon)) {
            const accountDetailsElements: HTMLCollectionOf<Element> = document.getElementsByClassName('account-details');
            const currentAccountDetailsElement: Element = accountDetailsElements[this.index];
            const currentRow: Element = document.getElementsByClassName('element-row')[this.index];

            currentAccountDetailsElement.classList.contains('show-details')
                ? this.hideAccountDetails(currentAccountDetailsElement as HTMLElement, currentRow, this.isLastElement)
                : this.showAccountDetails(currentAccountDetailsElement as HTMLElement, currentRow);

            for (let i = 0; i < accountDetailsElements.length; i++) {
                if (i !== this.index) {
                    const associatedRow = document.getElementsByClassName('element-row')[i];
                    const isLastrow = i === accountDetailsElements.length - 1;
                    this.hideAccountDetails(accountDetailsElements[i] as HTMLElement, associatedRow, isLastrow);
                }
            }
        }
    }

    showAccountDetails(accountDetailsElement: HTMLElement, currentRow: Element): void {
        // Remove last-element class if it is present, because there is now a row beneath it
        if (this.isLastElement) {
            currentRow.classList.remove('last-element');
        }

        accountDetailsElement.style.display = 'flex';
        const height = accountDetailsElement.scrollHeight + 'px';
        accountDetailsElement.style.display = '';

        accountDetailsElement.classList.add('show-details');
        accountDetailsElement.style.height = height;

        window.setTimeout(() => {
            accountDetailsElement.style.height = '';
        }, 350);
    }

    hideAccountDetails(accountDetailsElement: HTMLElement, currentRow: Element, isLastRow: boolean): void {
        // Add last-element class if this is the last row, because there is no longer a row beneath it
        if (isLastRow) {
            currentRow.classList.add('last-element');
        }

        accountDetailsElement.style.height = accountDetailsElement.scrollHeight + 'px';

        window.setTimeout(() => {
            accountDetailsElement.style.height = '0';
        }, 1);

        window.setTimeout(() => {
            accountDetailsElement.classList.remove('show-details');
        }, 350);
    }

    toggleDropdownActions(): void {
        document.getElementsByClassName('dropdown-action-list')[this.index]?.classList.toggle('show-dropdown');
    }

    removeDropdownActions(): void {
        document.getElementsByClassName('dropdown-action-list')[this.index]?.classList.remove('show-dropdown');
    }

    detailsAction(): void {
        this.toggleDropdownActions();
    }

    editAction(): void {
        this.editEmitter.emit(this.account.uuid);
    }

    deleteAction(): void {
        this.deleteEmitter.emit(this.account.uuid);
    }

    /**
     * Listener for onClick on document to determine if the dropdown actions menu should be closed
     * @param event the event to know if the target should trigger this display toggle
     */
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        const dropdownActions: Element = document.getElementsByClassName('dropdown-action')[this.index % 3];
        const dropdownButton: Element = document.getElementsByClassName('dropdown-icon')[this.index];

        if (!(event.target === dropdownActions) && !(event.target === dropdownButton)
            && !dropdownActions.classList.contains('show-dropdown')) {
            this.removeDropdownActions();
        }
    }

}
