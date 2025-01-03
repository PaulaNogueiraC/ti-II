-- Script adaptado para PostgreSQL 
-- Database: CSBH, Schema: public

-- Definindo o search_path para o schema public
SET search_path TO public;

-- -----------------------------------------------------
-- Tabela: anfitriao
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS anfitriao (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  info VARCHAR(255) NOT NULL,
  fotos VARCHAR(255)[]
);

-- -----------------------------------------------------
-- Tabela: voluntario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS voluntario (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  fotos VARCHAR(255)[]
);

-- -----------------------------------------------------
-- Tabela: projeto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS projeto (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  imagem VARCHAR(255),
  horario VARCHAR(255),
  local VARCHAR(255),
  tipo VARCHAR(255) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  periodo VARCHAR(255),   
  temas VARCHAR(255),     
  dias VARCHAR(255),      
  regiao VARCHAR(255),    
  ibancarias VARCHAR(255),
  idAnfitriao INT NOT NULL,
  CONSTRAINT fk_projeto_anfitriao FOREIGN KEY (idAnfitriao)
    REFERENCES anfitriao (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Índice para a chave estrangeira idAnfitriao
CREATE INDEX IF NOT EXISTS fk_projeto_anfitriao_idx 
ON projeto (idAnfitriao);

-- -----------------------------------------------------
-- Tabela: favorito
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS favorito (
  idVoluntario INT NOT NULL,
  idProjeto INT NOT NULL,
  PRIMARY KEY (idVoluntario, idProjeto),
  CONSTRAINT fk_favorito_voluntario FOREIGN KEY (idVoluntario)
    REFERENCES voluntario (id)
    ON DELETE CASCADE -- Remover favoritos automaticamente ao excluir voluntário
    ON UPDATE NO ACTION,
  CONSTRAINT fk_favorito_projeto FOREIGN KEY (idProjeto)
    REFERENCES projeto (id)
    ON DELETE CASCADE -- Remover favoritos automaticamente ao excluir projeto
    ON UPDATE NO ACTION
);

-- Índices para as chaves estrangeiras em favorito
CREATE INDEX IF NOT EXISTS fk_voluntario_idx 
ON favorito (idVoluntario);

CREATE INDEX IF NOT EXISTS fk_projeto_idx 
ON favorito (idProjeto);
