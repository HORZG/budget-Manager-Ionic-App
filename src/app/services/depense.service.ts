import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  obje = {};

  constructor(private http : HttpClient) { }

  allDepenses(){
    return this.http.get("https://gbudget-f4cef-default-rtdb.firebaseio.com/depenses.json");
  }
  
  ajouterDepense(x:any){
return this.http.post("https://gbudget-f4cef-default-rtdb.firebaseio.com/depenses.json",x);
}
deleteDepense (idDep:any) {

return this.http.delete(`https://gbudget-f4cef-default-rtdb.firebaseio.com/depenses/${idDep}.json`);
}

updateDepense (idDep, NewObj) {

  return this.http.patch(`https://gbudget-f4cef-default-rtdb.firebaseio.com/depenses/${idDep}.json`,NewObj);
}



}