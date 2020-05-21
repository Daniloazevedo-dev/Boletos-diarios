export class AppConstants {

	public static get baseServidor(): string { return "https://api-boletos.herokuapp.com/"}	

	public static get baseUrl(): string {return this.baseServidor + "boleto"}

}