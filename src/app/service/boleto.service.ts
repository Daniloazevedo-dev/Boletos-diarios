import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constantes';

@Injectable({
    providedIn: 'root'
  })

  export class BoletoService {

    constructor(private http: HttpClient) { 
  
    }

    salvarBoleto(boleto) {
        return this.http.post(AppConstants.baseUrl , boleto);
              
    
      }

    getBoletoList():Observable<any> {
        return this.http.get<any>(AppConstants.baseUrl);
    }

    getBoletosDiario():Observable<any> {
      return this.http.get<any>(AppConstants.baseUrl + "/diario");
  }

    deletarBoleto(id: Number): Observable<any> {
      return this.http.delete(AppConstants.baseUrl + "/" + id, {responseType: 'text'})
    }

    updateBoleto(boleto) : Observable<any> {
      return this.http.put<any>(AppConstants.baseUrl, boleto);
    }

}
