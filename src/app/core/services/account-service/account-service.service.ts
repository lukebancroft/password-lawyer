import { Injectable } from '@angular/core';
import { IAccount } from 'src/app/shared/models/IAccount';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private accounts: IAccount[] = [
        {
            uuid: uuid(),
            site: 'Steam',
            tags: [
                {
                    label: 'Smurf',
                    borderColor: '#09A333',
                    textColor: '#09A333'
                },
                {
                    label: 'Other',
                    borderColor: 'orange',
                    textColor: 'white'
                }
            ],
            username: 'Spooki',
            password: '123',
            addDate: new Date(Date.parse('09/07/2020')),
            lastModified: new Date(Date.parse('01/10/2021')),
            timesAccessed: 19,
            timesUpdated: 3
        },
        {
            uuid: uuid(),
            site: 'JVC',
            tags: [
                {
                    label: 'Risitas',
                    borderColor: '#09A333',
                    textColor: '#09A333'
                },
                {
                    label: 'Secondaire',
                    borderColor: '#09A333',
                    textColor: '#09A333'
                },
                {
                    label: 'Glossateur',
                    borderColor: '#09A333',
                    textColor: '#09A333'
                }
            ],
            username: 'GolemDeBouent',
            password: '123',
            addDate: new Date(Date.parse('09/07/2020')),
            lastModified: new Date(Date.parse('01/24/2021')),
            timesAccessed: 37,
            timesUpdated: 2
        },
        {
            uuid: uuid(),
            site: 'Origin',
            tags: [
                {
                    label: 'Main',
                    borderColor: 'red',
                    textColor: 'red'
                }
            ],
            username: 'Sbob',
            password: '123',
            addDate: new Date(Date.parse('10/08/2020')),
            lastModified: new Date(Date.parse('12/15/2020')),
            timesAccessed: 5,
            timesUpdated: 2
        },
        {
            uuid: uuid(),
            site: 'Uplay',
            tags: [
                {
                    label: 'Unused',
                    borderColor: '#ffffff',
                    textColor: '#ffffff'
                }
            ],
            username: 'spoookidoggo',
            password: '123',
            addDate: new Date(Date.parse('09/08/2020')),
            lastModified: new Date(Date.parse('09/10/2020')),
            timesAccessed: 1,
            timesUpdated: 0
        }
    ];

    constructor() { }

    public getAccounts(): IAccount[] {
        return this.accounts;
    }

    /**
     * Have to work with indexes until data is stored in database
     * @param accountUuid the uuid ofthe account
     */
    getAccountIndexByUuid(accountUuid: string): number {
        return this.accounts.indexOf(this.accounts.filter(account => account.uuid === accountUuid)[0]);
    }

    deleteAccount(accountUuid: string): void {
        this.accounts.splice(this.getAccountIndexByUuid(accountUuid), 1);
    }

    editAccount(accountUuid: string): void {
        const accountIndex = this.getAccountIndexByUuid(accountUuid);
        const editedAccount: IAccount = this.accounts[accountIndex];
        this.accounts[accountIndex] = {
            uuid: editedAccount.uuid,
            site: 'Site ' + accountIndex,
            tags: [
                {
                    label: 'Edited',
                    borderColor: 'purple',
                    textColor: 'white'
                }
            ],
            username: 'edit',
            password: '123',
            addDate: editedAccount.addDate,
            lastModified: new Date(Date.now()),
            timesAccessed: editedAccount.timesAccessed,
            timesUpdated: editedAccount.timesUpdated + 1
        };
    }
}
