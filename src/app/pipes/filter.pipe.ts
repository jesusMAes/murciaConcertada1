import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filtro: any): any {

    if(items[0].length == 2){
      return items.filter( item => item[0].toLowerCase().indexOf(filtro) != -1)
    }else{
      return items.filter( item => item.toLowerCase().indexOf(filtro) != -1);
    }
  }

}
