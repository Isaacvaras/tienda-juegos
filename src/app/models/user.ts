export interface Address {
  calle: String;
  distrito: string;
  recogerTienda: boolean;
}
export interface User {
  correo: string;
  nombre: string;
  contraseña: string;
  address?: Address;
}