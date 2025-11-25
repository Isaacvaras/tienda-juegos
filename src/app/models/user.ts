export interface Address {
  calle: string;
  distrito: string;
  recogerTienda: boolean;
}
export interface User {
  correo: string;
  nombre: string;
  contraseña: string;
  addresses?: Address[];
}