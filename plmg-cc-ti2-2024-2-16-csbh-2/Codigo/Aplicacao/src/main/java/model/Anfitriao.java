package model;

/**
 * Classe que representa um anfitrião.
 * Contém os atributos id, email, senha, nome e informações adicionais.
 */
public class Anfitriao {

    // Identificador único do anfitrião
    private int id;

    // Endereço de e-mail do anfitrião
    private String email;

    // Senha de acesso do anfitrião
    private String senha;

    // Nome do anfitrião
    private String nome;

    // Informações adicionais sobre o anfitrião
    private String info;

    private String[] fotos;

    /**
     * Construtor da classe Anfitriao.
     *
     * @param id    Identificador único do anfitrião.
     * @param email Endereço de e-mail do anfitrião.
     * @param senha Senha de acesso do anfitrião.
     * @param nome  Nome do anfitrião.
     * @param info  Informações adicionais sobre o anfitrião.
     */
    public Anfitriao(int id, String email, String senha, String nome, String info, String[] fotos) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.info = info;
        this.fotos = fotos;
    }

    /**
     * Retorna o identificador do anfitrião.
     *
     * @return ID do anfitrião.
     */
    public int getId() {
        return id;
    }

    /**
     * Define o identificador do anfitrião.
     *
     * @param id Novo identificador do anfitrião.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Retorna o endereço de e-mail do anfitrião.
     *
     * @return E-mail do anfitrião.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Define o endereço de e-mail do anfitrião.
     *
     * @param email Novo e-mail do anfitrião.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Retorna a senha de acesso do anfitrião.
     *
     * @return Senha do anfitrião.
     */
    public String getSenha() {
        return senha;
    }

    /**
     * Define a senha de acesso do anfitrião.
     *
     * @param senha Nova senha do anfitrião.
     */
    public void setSenha(String senha) {
        this.senha = senha;
    }

    /**
     * Retorna o nome do anfitrião.
     *
     * @return Nome do anfitrião.
     */
    public String getNome() {
        return nome;
    }

    /**
     * Define o nome do anfitrião.
     *
     * @param nome Novo nome do anfitrião.
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    /**
     * Retorna informações adicionais sobre o anfitrião.
     *
     * @return Informações adicionais.
     */
    public String getInfo() {
        return info;
    }

    /**
     * Define as informações adicionais sobre o anfitrião.
     *
     * @param info Novas informações adicionais.
     */
    public void setInfo(String info) {
        this.info = info;
    }

    public String[] getFotos(){
        return fotos;
    }

    public void setFotos(String[] fotos){
        this.fotos = fotos;
    }

    /**
     * Retorna uma representação textual do objeto Anfitriao.
     *
     * @return String contendo os atributos da classe Anfitriao.
     */
    @Override
    public String toString() {
        return "Anfitriao [id=" + id + ", email=" + email + ", senha=" + senha + ", nome=" + nome + ", info=" + info + "]";
    }
}
