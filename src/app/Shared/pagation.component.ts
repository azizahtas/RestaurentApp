import {Component, Input, Output, EventEmitter} from "@angular/core";
@Component({
	selector : 'pagation',
	template : `
		<ul *ngIf="items.length > pageSize" class="pagination pagination-lg">
		      <li [class.disabled] = "currentPage == 1">
		      	<a (click)="previous()">«</a>
		      </li>
		      <li [class.active] = "currentPage == page" *ngFor="let page of pages" (click)="changePage(page)">
		      	<a>{{page}}</a>
		      </li>
		      <li [class.disabled] = "currentPage == pages.length">
		      	<a (click)="next()">»</a>
		      </li>
   		 </ul>
`
})

export class PagationComponent{
	@Input() items = [];
	@Input('page-size') pageSize = 10;
	@Output('page-changed') pageChanged = new EventEmitter();
	pages: any[] = [];
	currentPage;

	ngOnChanges(){
		this.pages = [];
		this.currentPage = 1;
		let pagesCount = this.items.length / this.pageSize;
		pagesCount = Math.ceil(pagesCount);
		for(let i = 1; i<=pagesCount; i++){
			this.pages.push(i);}
	}

	changePage(page){
		this.currentPage = page;
		this.pageChanged.emit(page);
	}

	previous(){
		if(this.currentPage == 1)
			return;

		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	next(){
		if(this.currentPage == this.pages.length)
			return;

		this.currentPage++;
		this.pageChanged.emit(this.currentPage);
	}
}