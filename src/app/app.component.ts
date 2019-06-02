import { ListsService } from './shared/services/lists.service';
import { LoadingService } from './shared/services/loading.service';
import { List } from './shared/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public listLabel = '';
  public itemContent = '';
  public lists: List[];

  constructor(private loading: LoadingService, private listsService: ListsService) { }

  ngOnInit() {
    this.listsService.getLists().subscribe( lists => this.lists = lists );
  }

  public addList(): void {
    if (this.listLabel) {
      this.lists.push({
        label: this.listLabel,
        items: []
      });
      this.listLabel = '';
    }
  }

  public addItem(list: List): void {
    if (this.itemContent) {
      list.items.push({
        content: this.itemContent
      });
      this.itemContent = '';
    }
  }

  public switchItem($event: {
    src: {
      itemIndex: number,
      listIndex: number
    },
    dst: {
      itemIndex: number,
      listIndex: number
    }
  }): void {
    [
      this.lists[$event.src.listIndex].items[$event.src.itemIndex],
      this.lists[$event.dst.listIndex].items[$event.dst.itemIndex]
    ] = [
      this.lists[$event.dst.listIndex].items[$event.dst.itemIndex],
      this.lists[$event.src.listIndex].items[$event.src.itemIndex]
    ];
  }

  public transferItem($event: {
    src: {
      itemIndex: number,
      listIndex: number
    },
    dst: {
      listIndex: number
    }
  }): void {
    this.lists[$event.dst.listIndex].items.push(this.lists[$event.src.listIndex].items[$event.src.itemIndex]);
    this.lists[$event.src.listIndex].items.splice($event.src.itemIndex, 1);
  }

}
