package model;

/**
 * Classe Favorito representa a relação entre um voluntário e um projeto favoritado.
 */
public class Favorito {
    
    // Identificador do voluntário
    private int idVoluntario;
    
    // Identificador do projeto
    private int idProjeto;

    /**
     * Construtor da classe Favorito.
     * @param idVoluntario Identificador do voluntário.
     * @param idProjeto Identificador do projeto.
     */
    public Favorito(int idVoluntario, int idProjeto) {
        this.idVoluntario = idVoluntario;
        this.idProjeto = idProjeto;
    }

    /**
     * Obtém o identificador do voluntário.
     * @return idVoluntario Identificador do voluntário.
     */
    public int getIdVoluntario() { return idVoluntario; }

    /**
     * Define o identificador do voluntário.
     * @param idVoluntario Novo identificador do voluntário.
     */
    public void setIdVoluntario(int idVoluntario) { this.idVoluntario = idVoluntario; }

    /**
     * Obtém o identificador do projeto.
     * @return idProjeto Identificador do projeto.
     */
    public int getIdProjeto() { return idProjeto; }

    /**
     * Define o identificador do projeto.
     * @param idProjeto Novo identificador do projeto.
     */
    public void setIdProjeto(int idProjeto) { this.idProjeto = idProjeto; }
}
