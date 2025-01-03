package dao;

import model.Projeto;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe DAO para a entidade Projeto. Realiza operações de CRUD (Create, Read, Update, Delete)
 * na tabela "projeto" do banco de dados.
 */
public class ProjetoDAO extends DAO {

    /**
     * Construtor padrão que chama o método para conectar com o banco de dados.
     */
    public ProjetoDAO() {
        super();
        conectar();
    }

    /**
     * Finaliza o objeto fechando a conexão com o banco de dados.
     */
    @Override
    public void finalize() {
        close();
    }

    /**
     * Insere um novo projeto no banco de dados.
     * 
     * @param projeto O objeto Projeto a ser inserido.
     * @return true se a operação foi bem-sucedida, false caso contrário.
     */
    public boolean insert(Projeto projeto) {
        boolean status = false;
        try {
            String sql = "INSERT INTO projeto (nome, imagem, horario, local, tipo, descricao, periodo, temas, dias, regiao, ibancarias, idAnfitriao) "
                    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setString(1, projeto.getNome());
            st.setString(2, projeto.getImagem());
            st.setString(3, projeto.getHorario());
            st.setString(4, projeto.getLocal());
            st.setString(5, projeto.getTipo());
            st.setString(6, projeto.getDescricao());
            st.setString(7, projeto.getPeriodo());
            st.setString(8, projeto.getTemas());
            st.setString(9, projeto.getDias());
            st.setString(10, projeto.getRegiao());
            st.setString(11, projeto.getIbancarias());
            st.setInt(12, projeto.getIdAnfitriao());
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException u) {
            throw new RuntimeException(u);
        }
        return status;
    }

    /**
     * Recupera um projeto pelo seu ID.
     * 
     * @param id O ID do projeto.
     * @return O objeto Projeto encontrado, ou null se não encontrado.
     */
    public Projeto get(int id) {
        Projeto projeto = null;
        try {
            Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            String sql = "SELECT * FROM projeto WHERE id='" + id + "'";
            ResultSet rs = st.executeQuery(sql);
            if (rs.next()) {
                projeto = new Projeto(
                    rs.getInt("id"),
                    rs.getString("nome"),
                    rs.getString("imagem"),
                    rs.getString("horario"),
                    rs.getString("local"),
                    rs.getString("tipo"),
                    rs.getString("descricao"),
                    rs.getString("periodo"),
                    rs.getString("temas"),
                    rs.getString("dias"),
                    rs.getString("regiao"),
                    rs.getString("ibancarias"),
                    rs.getInt("idanfitriao")
                );
            }
            st.close();
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return projeto;
    }

    /**
     * Recupera todos os projetos associados a um anfitrião específico.
     * 
     * @param idAnfitriao O ID do anfitrião.
     * @return Uma lista de projetos associados ao anfitrião.
     */
    public List<Projeto> getAllByAnfitriaoId(int idAnfitriao) {
        List<Projeto> projetos = new ArrayList<>(); 
        try {
            Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            String sql = "SELECT * FROM projeto WHERE idanfitriao='" + idAnfitriao + "'";
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                Projeto projeto = new Projeto(
                    rs.getInt("id"),
                    rs.getString("nome"),
                    rs.getString("imagem"),
                    rs.getString("horario"),
                    rs.getString("local"),
                    rs.getString("tipo"),
                    rs.getString("descricao"),
                    rs.getString("periodo"),
                    rs.getString("temas"),
                    rs.getString("dias"),
                    rs.getString("regiao"),
                    rs.getString("ibancarias"),
                    rs.getInt("idanfitriao")
                );
                projetos.add(projeto);
            }
            st.close();
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return projetos;
    }

    /**
     * Recupera todos os projetos de um tipo específico.
     * 
     * @param tipo O tipo de projeto a ser filtrado.
     * @return Uma lista de projetos correspondentes ao tipo especificado.
     */
    public List<Projeto> getAllByTipo(String tipo) {
        List<Projeto> projetos = new ArrayList<>();
        
        String sql = "SELECT * FROM projeto WHERE tipo = ?";
        
        try (PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setString(1, tipo);
            
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    String imagem = rs.getString("imagem") != null ? rs.getString("imagem") : "";
                    Projeto projeto = new Projeto(
                        rs.getInt("id"),
                        rs.getString("nome"),
                        imagem,
                        rs.getString("horario"),
                        rs.getString("local"),
                        rs.getString("tipo"),
                        rs.getString("descricao"),
                        rs.getString("periodo"),
                        rs.getString("temas"),
                        rs.getString("dias"),
                        rs.getString("regiao"),
                        rs.getString("ibancarias"),
                        rs.getInt("idanfitriao")
                    );
                    projetos.add(projeto);
                }
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return projetos;
    }

    /**
     * Atualiza um projeto no banco de dados.
     * 
     * @param projeto O objeto Projeto com os novos dados.
     * @param id O ID do projeto a ser atualizado.
     * @return true se a atualização foi bem-sucedida, false caso contrário.
     */
    public boolean update(Projeto projeto, int id) {
        boolean status = false;
        try {
            String sql = "UPDATE projeto SET nome=?, imagem=?, horario=?, local=?, tipo=?, descricao=?, periodo=?, temas=?, dias=?, regiao=?, ibancarias=?, idAnfitriao=? WHERE id=?";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setString(1, projeto.getNome());
            st.setString(2, projeto.getImagem());
            st.setString(3, projeto.getHorario());
            st.setString(4, projeto.getLocal());
            st.setString(5, projeto.getTipo());
            st.setString(6, projeto.getDescricao());
            st.setString(7, projeto.getPeriodo());
            st.setString(8, projeto.getTemas());
            st.setString(9, projeto.getDias());
            st.setString(10, projeto.getRegiao());
            st.setString(11, projeto.getIbancarias());
            st.setInt(12, projeto.getIdAnfitriao());
            st.setInt(13, id);
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException u) {
            throw new RuntimeException(u);
        }
        return status;
    }

    /**
     * Deleta um projeto do banco de dados pelo seu ID.
     * 
     * @param id O ID do projeto a ser deletado.
     * @return true se a operação foi bem-sucedida, false caso contrário.
     */
    public boolean delete(int id) {
        boolean status = false;
        try {
            Statement st = conexao.createStatement();
            st.executeUpdate("DELETE FROM projeto WHERE id = '" + id + "'");
            st.close();
            status = true;
        } catch (SQLException u) {
            throw new RuntimeException(u);
        }
        return status;
    }
}
