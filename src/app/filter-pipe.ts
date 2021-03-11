import { Book } from './book';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Book[], searchByBook: string, searchByAuthor: string, searchByPublisher: string, searchByCagname: string): any[] {
    if (items && items.length) {
      return items.filter(item => {
        if (searchByBook && item.bookName.toLowerCase().indexOf(searchByBook.toLowerCase()) === -1) {
          return false;
        }
        if (searchByAuthor && item.authorName.toLowerCase().indexOf(searchByAuthor.toLowerCase()) === -1) {
          return false;
        }
        if (searchByPublisher && item.publisherName.toLowerCase().indexOf(searchByPublisher.toLowerCase()) === -1) {
          return false;
        }
        if (searchByCagname && item.category.cag_name.toLowerCase().indexOf(searchByCagname.toLowerCase()) === -1) {
          return false;
        }
        return true;
      })
    }
    else {
      return items;
    }
  }
  // transform(items: Book[], searchByBook: string, searchByAuthor: string): any[] {
  //   if (!items) return [];
  //   if (!searchByBook) return items;
  //   searchByBook = searchByBook.toLowerCase();
  //   return items.filter(data => {
  //     return data.bookName.toLowerCase().includes(searchByBook);
  //   });

}


