export default interface ICreateUserDTO {
  name: string;
  email: string;
  cpf: string;
  password: string;
  roles?: [{ name: string }];
  permissions?: [{ name: string }];
}
