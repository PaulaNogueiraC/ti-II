package model;

/**
 * Classe que representa um Projeto.
 * Contém os atributos id, nome, imagem, descrição, horário, local, tipo, período, temas, dias e id do anfitrião.
 */
public class Projeto {

    // Identificador único do projeto
    private int id;

    // Nome do projeto
    private String nome;

    // Caminho da imagem associada ao projeto
    private String imagem;

    // Descrição detalhada do projeto
    private String descricao;

    // Horário de realização do projeto
    private String horario;

    // Local onde o projeto será realizado
    private String local;

    // Tipo de atividade do projeto
    private String tipo;

    // Período de realização do projeto
    private String periodo;

    // Temas abordados no projeto
    private String temas;

    // Dias específicos em que o projeto ocorre
    private String dias;

    private String regiao;

    private String ibancarias;

    // Identificador do anfitrião associado ao projeto
    private int idAnfitriao;

    /**
     * Construtor da classe Projeto.
     *
     * @param id         Identificador único do projeto.
     * @param nome       Nome do projeto.
     * @param imagem     Caminho da imagem do projeto.
     * @param horario    Horário de realização do projeto.
     * @param local      Local de realização do projeto.
     * @param tipo       Tipo de atividade do projeto.
     * @param descricao  Descrição detalhada do projeto.
     * @param periodo    Período de realização do projeto.
     * @param temas      Temas abordados no projeto.
     * @param dias       Dias específicos em que o projeto ocorre.
     * @param idAnfitriao Identificador do anfitrião do projeto.
     */
    public Projeto(int id, String nome, String imagem, String horario, String local, String tipo, String descricao, String periodo, String temas, String dias, String regiao, String ibancarias, int idAnfitriao) {
        this.id = id;
        this.nome = nome;
        this.imagem = imagem;
        this.horario = horario;
        this.local = local;
        this.tipo = tipo;
        this.descricao = descricao;
        this.periodo = periodo;
        this.temas = temas;
        this.dias = dias;
        this.regiao = regiao;
        this.ibancarias = ibancarias;
        this.idAnfitriao = idAnfitriao;
    }

    /**
     * Retorna o ID do projeto.
     *
     * @return ID do projeto.
     */
    public int getId() {
        return id;
    }

    /**
     * Define o ID do projeto.
     *
     * @param id Novo ID do projeto.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Retorna o nome do projeto.
     *
     * @return Nome do projeto.
     */
    public String getNome() {
        return nome;
    }

    /**
     * Define o nome do projeto.
     *
     * @param nome Novo nome do projeto.
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    /**
     * Retorna o caminho da imagem do projeto.
     *
     * @return Caminho da imagem.
     */
    public String getImagem() {
        return imagem;
    }

    /**
     * Define o caminho da imagem do projeto.
     *
     * @param imagem Novo caminho da imagem.
     */
    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    /**
     * Retorna a descrição do projeto.
     *
     * @return Descrição do projeto.
     */
    public String getDescricao() {
        return descricao;
    }

    /**
     * Define a descrição do projeto.
     *
     * @param descricao Nova descrição do projeto.
     */
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    /**
     * Retorna o horário do projeto.
     *
     * @return Horário do projeto.
     */
    public String getHorario() {
        return horario;
    }

    /**
     * Define o horário do projeto.
     *
     * @param horario Novo horário do projeto.
     */
    public void setHorario(String horario) {
        this.horario = horario;
    }

    /**
     * Retorna o local do projeto.
     *
     * @return Local do projeto.
     */
    public String getLocal() {
        return local;
    }

    /**
     * Define o local do projeto.
     *
     * @param local Novo local do projeto.
     */
    public void setLocal(String local) {
        this.local = local;
    }

    /**
     * Retorna o tipo de atividade do projeto.
     *
     * @return Tipo de atividade.
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * Define o tipo de atividade do projeto.
     *
     * @param tipo Novo tipo de atividade.
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /**
     * Retorna o período do projeto.
     *
     * @return Período do projeto.
     */
    public String getPeriodo() {
        return periodo;
    }

    /**
     * Define o período do projeto.
     *
     * @param periodo Novo período do projeto.
     */
    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    /**
     * Retorna os temas abordados no projeto.
     *
     * @return Temas do projeto.
     */
    public String getTemas() {
        return temas;
    }

    /**
     * Define os temas abordados no projeto.
     *
     * @param temas Novos temas do projeto.
     */
    public void setTemas(String temas) {
        this.temas = temas;
    }

    /**
     * Retorna os dias específicos em que o projeto ocorre.
     *
     * @return Dias do projeto.
     */
    public String getDias() {
        return dias;
    }

    /**
     * Define os dias específicos em que o projeto ocorre.
     *
     * @param dias Novos dias do projeto.
     */
    public void setDias(String dias) {
        this.dias = dias;
    }

    public String getRegiao() {
        return regiao;
    }

    public void setRegiao(String regiao) {
        this.regiao = regiao;
    }

    public String getIbancarias() {
        return ibancarias;
    }

    public void setIbancarias(String ibancarias) {
        this.ibancarias = ibancarias;
    }

    /**
     * Retorna o ID do anfitrião associado ao projeto.
     *
     * @return ID do anfitrião.
     */
    public int getIdAnfitriao() {
        return idAnfitriao;
    }

    /**
     * Define o ID do anfitrião associado ao projeto.
     *
     * @param idAnfitriao Novo ID do anfitrião.
     */
    public void setIdAnfitriao(int idAnfitriao) {
        this.idAnfitriao = idAnfitriao;
    }

    /**
     * Retorna uma representação textual do objeto Projeto.
     *
     * @return String contendo os atributos da classe Projeto.
     */
    @Override
    public String toString() {
        return "Projeto [id=" + id + ", nome=" + nome + ", imagem=" + imagem + ", horario=" + horario + ", local=" + local + ", tipo=" + tipo
                + ", descricao=" + descricao + ", periodo=" + periodo + ", temas=" + temas + ", dias=" + dias
                + ", idAnfitriao=" + idAnfitriao + "]";
    }
}
