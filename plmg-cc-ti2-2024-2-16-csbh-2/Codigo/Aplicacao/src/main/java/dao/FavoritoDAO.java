package dao;

import model.Favorito;
import model.Projeto;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe FavoritoDAO para gerenciar as operações de acesso a dados 
 * para a tabela Favorito e seus relacionamentos.
 */
public class FavoritoDAO extends DAO {

    /**
     * Construtor da classe FavoritoDAO, que conecta ao banco de dados.
     */
    public FavoritoDAO() {
        super();
        conectar();
    }

    /**
     * Método finalize que fecha a conexão quando o objeto é destruído.
     */
    @Override
    public void finalize() {
        close();
    }

    /**
     * Insere um registro de favorito no banco de dados.
     * @param favorito objeto Favorito a ser inserido.
     * @return true se a inserção foi bem-sucedida, false caso contrário.
     */
    public boolean insert(Favorito favorito) {
        boolean status = false;
        try {
            String sql = "INSERT INTO favorito (idVoluntario, idProjeto) VALUES (?, ?)";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setInt(1, favorito.getIdVoluntario()); // Define o id do voluntário
            st.setInt(2, favorito.getIdProjeto());    // Define o id do projeto
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException e) {
            System.err.println("Erro ao inserir favorito: " + e.getMessage());
        }
        return status;
    }

    /**
     * Retorna um projeto favorito específico de um voluntário.
     * @param idVoluntario id do voluntário.
     * @param idProjeto id do projeto.
     * @return Projeto objeto Projeto se encontrado, null caso contrário.
     */
    public Projeto get(int idVoluntario, int idProjeto) {
        Projeto projeto = null;
        try {
            // Criação de um statement para realizar a consulta
            Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            String sql = "SELECT p.* FROM Projeto p " +
                        "JOIN Favorito f ON p.id = f.idProjeto " +
                        "WHERE f.idVoluntario = " + idVoluntario + 
                        " AND p.id = " + idProjeto;
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
     * Retorna todos os projetos favoritos de um voluntário específico.
     * @param idVoluntario id do voluntário.
     * @return Lista de objetos Projeto associados ao voluntário.
     */
    public List<Projeto> getAllProjetosByVoluntarioId(int idVoluntario) {
        List<Projeto> projetos = new ArrayList<>();
        try {
            String sql = "SELECT p.* FROM Projeto p " +
                        "JOIN Favorito f ON p.id = f.idProjeto " +
                        "WHERE f.idVoluntario = '" + idVoluntario + "'";
            Statement st = conexao.createStatement();
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
        } catch (SQLException e) {
            System.err.println("Erro ao listar anfitriões: " + e.getMessage());
        }
        return projetos;
    }

    /**
     * Deleta um favorito específico baseado no id do voluntário e do projeto.
     * @param idVoluntario id do voluntário.
     * @param idProjeto id do projeto.
     * @return true se o favorito foi deletado com sucesso, false caso contrário.
     */
    public boolean delete(int idVoluntario, int idProjeto) {
        boolean status = false;
        try {
            String sql = "DELETE FROM favorito WHERE idvoluntario = ? AND idprojeto = ?";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setInt(1, idVoluntario); // Define o id do voluntário
            st.setInt(2, idProjeto);    // Define o id do projeto
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException e) {
            System.err.println("Erro ao deletar anfitrião: " + e.getMessage());
        }
        return status;
    }
}
