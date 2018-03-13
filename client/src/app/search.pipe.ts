import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(patients: any[], search_text: string): any[] {
    if (!search_text) {return patients; }

    if (!patients) { return []; }

    search_text = search_text.toLowerCase();

    return patients.filter(ListOfPatients => {
      return ListOfPatients._username.toLowerCase().includes(search_text) || ListOfPatients.complaint.toLowerCase().includes(search_text);
    });

}
}
