import { Component, OnInit, Injectable } from '@angular/core';
import { Boleto } from './model/Boleto';
import {BoletoService} from './service/boleto.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ControleBoletos';

  boleto = new Boleto();
  boletos: Observable<Boleto[]>;
  valorTotal: Number = 0;
  verificaBoleto: Boolean = true ;
  boletoAux = new Boleto();
  id: Number;

  constructor(private boletoService: BoletoService) {

  }

  ngOnInit() {
    
   this.listBoletosDiarios();
  
  
  }

  salvar() {
    var date = new Date();  
   

    if(this.formatDate(this.boleto.vencimento) < this.formatDate(date)){
      alert("Obs: A data de vencimento deve ser acima da data atual!");
    } else {
   
    this.boletoService.salvarBoleto(this.boleto).subscribe(response  => {    
      
      this.novo();

      if(this.verificaBoleto == true){
        this.listBoletosDiarios
      } else {
        this.listBoletos();
      }
      
     
        alert(" Boleto salvo com sucesso!")  
  
    }, 
    error => {
       
      alert('Nâo foi possível salvar os dados!')
    });

  }
    
  }

novo(){

  this.boleto = new Boleto();
  this.boletoAux = new Boleto();
}

listBoletos(){
  this.boletoService.getBoletoList().subscribe(data => {  
      this.valorTotal = 0;
    data.forEach(element => {
      this.valorTotal += element.valor;
    });
    this.boletos = data;
    
  }, error => {
      
    alert('Nâo foi possível consultar os dados!')
  });

}

listBoletosDiarios(){
  this.boletoService.getBoletosDiario().subscribe(data => {  
      this.valorTotal = 0;
    data.forEach(element => {
      this.valorTotal += element.valor;
    });
    this.boletos = data;
    
  }, error => {
      
    alert('Nâo foi possível consultar os dados!')
  });

}

selecionado(boleto){
  this.novo();
 
  this.boletoAux = boleto;
  this.id = boleto.id;
}

deletarBoleto(id: Number){
  if(id == null ){
    alert("Selecionar o boleto em que deseja excluir!")
  } else {
    if(confirm('Deseja mesmo remover?')){    
      this.boletoService.deletarBoleto(id).subscribe(data =>{
        this.novo();
        if(this.verificaBoleto == true){
          this.listBoletosDiarios();
        } else {
          this.listBoletos();
        }
        alert(data);
      },  error => {
      
        alert('Nâo foi possível deletar o boleto!')
      })
    }
  }

}

editarBoleto(boleto){

  if(boleto.id == null){
    alert('Selecione o boleto em que deseja editar!')
  } else {
    this.boleto = this.boletoAux;
  }
  

}

formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

chamaTodos(){
  this.verificaBoleto = false; 
  this.listBoletos();
}

chamaDiarios(){
  this.verificaBoleto = true;
  this.listBoletosDiarios();
}

}
