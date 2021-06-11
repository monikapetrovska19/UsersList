import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], userInput: string, fieldName: string): any[] {

    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!userInput) { return items; }

    // convert the userInput to lower case
    userInput = userInput.toLowerCase();

    //return all items if user input is smaller than 3 characters
    if(userInput.length < 3){
      return items;
    }

    // retrun the filtered array when user input is equal or bigger than 3 characters
    return items.filter(item => {
      if (item && item[fieldName]) {
        return item[fieldName].toLowerCase().includes(userInput);
      }
      return false;
    });

   }

}
