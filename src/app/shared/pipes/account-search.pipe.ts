import { Pipe, PipeTransform } from '@angular/core';
import { IAccount } from '../models/IAccount';

@Pipe({
    name: 'accountSearch'
})
export class AccountSearchPipe implements PipeTransform {

    transform(
        accounts: IAccount[], siteSearch?: string, tagSearch?: string, usernameSearch?: string): IAccount[] {

        if (accounts) {
            const siteFilter: string = siteSearch?.toLocaleLowerCase() ?? '';
            accounts = [...accounts.filter(account => account.site.toLowerCase().includes(siteFilter))];

            const tagFilter: string = tagSearch?.toLocaleLowerCase() ?? '';
            accounts = [...accounts.filter(account =>
                account.tags?.some(tag => tag.label.toLowerCase().includes(tagFilter)))];

            const usernameFilter: string = usernameSearch?.toLocaleLowerCase() ?? '';
            accounts = [...accounts.filter(account => account.username.toLowerCase().includes(usernameFilter))];
        }

        return accounts;
    }

}
