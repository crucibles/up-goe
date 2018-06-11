import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SortService {

    constructor() { }

    private columnSortedSource = new Subject<ColumnSortedEvent>();

    columnSorted$ = this.columnSortedSource.asObservable();

    columnSorted(event: ColumnSortedEvent) {
        this.columnSortedSource.next(event);
    }

    getSorted(array: any[], criteria: SearchCriteria) {
        return array.sort((a, b) => {
            if (criteria.sortDirection === 'desc') {
                return 1;
            }
            else {
                return -1;
            }
        });
    }
}

export interface ColumnSortedEvent {
    sortColumn: string;
    sortDirection: string;
}

export class SearchCriteria {
    sortColumn: string;
    sortDirection: string;
}