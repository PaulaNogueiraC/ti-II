package model;

/**
 * Classe que representa um Voluntário.
 * Contém os atributos id, email, senha e nome relacionados ao voluntário.
 */
public class Voluntario 
{
    // Atributos privados da classe
    private int id;  
    private String email;
    private String senha;
    private String nome;
    private String[] fotos;

    /**
     * Construtor da classe Voluntario.
     * 
     * @param id     ID do voluntário.
     * @param email  Email do voluntário.
     * @param senha  Senha do voluntário.
     * @param nome   Nome do voluntário.
     */
    public Voluntario(int id, String email, String senha, String nome, String[] fotos) 
    {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.fotos = fotos;
    }

    /**
     * Retorna o ID do voluntário.
     * 
     * @return ID do voluntário.
     */
    public int getId() 
    {
        return id;
    }

    /**
     * Define o ID do voluntário.
     * 
     * @param id novo ID do voluntário.
     */
    public void setId(int id) 
    {
        this.id = id;
    }

    /**
     * Retorna o email do voluntário.
     * 
     * @return email do voluntário.
     */
    public String getEmail() 
    {
        return email;
    }

    /**
     * Define o email do voluntário.
     * 
     * @param email novo email do voluntário.
     */
    public void setEmail(String email) 
    {
        this.email = email;
    }

    /**
     * Retorna a senha do voluntário.
     * 
     * @return senha do voluntário.
     */
    public String getSenha() 
    {
        return senha;
    }

    /**
     * Define a senha do voluntário.
     * 
     * @param senha nova senha do voluntário.
     */
    public void setSenha(String senha) 
    {
        this.senha = senha;
    }

    /**
     * Retorna o nome do voluntário.
     * 
     * @return nome do voluntário.
     */
    public String getNome() 
    {
        return nome;
    }

    /**
     * Define o nome do voluntário.
     * 
     * @param nome novo nome do voluntário.
     */
    public void setNome(String nome) 
    {
        this.nome = nome;
    }

    public String[] getFotos(){
        return this.fotos;
    }
    
    public void setFotos(String[] fotos){
        this.fotos = fotos;
    }
    /**
     * Retorna uma representação em String do objeto Voluntario.
     * 
     * @return representação textual dos atributos da classe Voluntario.
     */
    @Override
    public String toString() 
    {
        return "Voluntario [id=" + id + ", email=" + email + ", senha=" + senha + ", nome=" + nome + "]";
    }
}
