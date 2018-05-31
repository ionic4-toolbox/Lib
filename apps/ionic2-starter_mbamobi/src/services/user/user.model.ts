export class UserModel {
  constructor(private mapper: UserMapper) {}

  get id() {
    return this.mapper.id;
  }

  get foto() {
    return "http://lorempixel.com/100/100/people/" + this.id;
  }

  get cardFoto() {
    return "http://lorempixel.com/640/480/abstract/" + this.id;
  }

  get nome() {
    return this.mapper.nome;
  }

  get cpf() {
    return this.mapper.cpf;
  }

  get senha() {
    return this.mapper.senha;
  }

  get endereco() {
    return this.mapper.endereco;
  }

  get telefones() {
    return this.mapper.telefones;
  }

  get biografia() {
    return this.mapper.biografia;
  }

  get telefonePrincipal() {
    return this.mapper.telefones[0];
  }
}

interface UserMapper {
  id: string;
  nome: string;
  cpf: string;
  endereco: string;
  senha: string;
  telefones: Array<{ telefone: string }>;
  biografia: string;
  foto: string;
  cardFoto: string;
}
