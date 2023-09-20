create table veiculo (
    id serial primary key,
    placa text not null,
    marca text not null,
    modelo text not null,
    cor text not null

);

create table usuarios (
	id serial primary key,
  	nome text not null,
  	email text not null unique,
  	senha text not null
);

create table usuarios (
	id serial primary key,
  	placa text not null,
  	horario text not null
);