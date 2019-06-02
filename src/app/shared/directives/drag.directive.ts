import { Directive, HostBinding, HostListener, Input, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @HostBinding('draggable') public draggable = true;
  @HostBinding('class.over') public isIn = false;
  @Input('itemIndex') public itemIndex;
  @Input('listIndex') public listIndex;
  @Output() public switch: EventEmitter<{
    src: {
      itemIndex: number,
      listIndex: number
    },
    dst: {
      itemIndex: number,
      listIndex: number
    }
  }> = new EventEmitter();

  @Output() public transfer: EventEmitter<{
    src: {
      itemIndex: number,
      listIndex: number
    },
    dst: {
      listIndex: number
    }
  }> = new EventEmitter();

  @HostListener('dragstart', ['$event']) public dragStart($event) {
    $event.dataTransfer.setData('itemIndex', this.itemIndex);
    $event.dataTransfer.setData('listIndex', this.listIndex);
  }

  @HostListener('dragenter') public dragEnter() {
    this.isIn = true;
  }

  @HostListener('dragleave') public dragLeave() {
    this.isIn = false;
  }

  @HostListener('dragover', ['$event']) public dragOver($event) {
    $event.preventDefault();
  }

  @HostListener('drop', ['$event']) public drop($event) {
    this.isIn = false;
    if (this.itemIndex) {
      this.switch.emit({
        src: {
          itemIndex: $event.dataTransfer.getData('itemIndex'),
          listIndex: $event.dataTransfer.getData('listIndex')
        },
        dst: {
          itemIndex: this.itemIndex,
          listIndex: this.listIndex
        }
      });
    } else {
      this.transfer.emit({
        src: {
          itemIndex: $event.dataTransfer.getData('itemIndex'),
          listIndex: $event.dataTransfer.getData('listIndex')
        },
        dst: {
          listIndex: this.listIndex
        }
      });
    }

  }

  constructor() { }

}
