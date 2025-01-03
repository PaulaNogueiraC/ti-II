package dao;

import model.Anfitriao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import com.sun.org.apache.bcel.internal.generic.AALOAD;
import org.mindrot.jbcrypt.BCrypt;

/**
 * Classe de acesso a dados para a entidade Anfitriao.
 * Responsável por gerenciar a conexão e operações no banco de dados relacionadas ao anfitrião.
 */
public class AnfitriaoDAO extends DAO {

    /**
     * Construtor que chama o construtor da superclasse e conecta ao banco de dados.
     */
    public AnfitriaoDAO() {
        super();
        conectar();
    }

    /**
     * Método finalize que fecha a conexão com o banco de dados ao final da execução.
     */
    @Override
    public void finalize() {
        close();
    }

    /**
     * Insere um novo anfitrião no banco de dados.
     *
     * @param anfitriao Objeto Anfitriao a ser inserido.
     * @return true se a inserção foi bem-sucedida, false caso contrário.
     */
    public boolean insert(Anfitriao anfitriao) {
        boolean status = false;
        try {
            String hashedPassword = BCrypt.hashpw(anfitriao.getSenha(), BCrypt.gensalt());
            String sql = "INSERT INTO anfitriao (email, senha, nome, info, fotos) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setString(1, anfitriao.getEmail());
            st.setString(2, hashedPassword);
            st.setString(3, anfitriao.getNome());
            st.setString(4, anfitriao.getInfo());
            Array arrayFotos = conexao.createArrayOf("TEXT", anfitriao.getFotos());
            st.setArray(5, arrayFotos);
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException e) {
            System.err.println("Erro ao inserir anfitrião: " + e.getMessage());
        }
        return status;
    }

    /**
     * Busca um anfitrião no banco de dados pelo ID.
     *
     * @param id Identificador único do anfitrião.
     * @return Objeto Anfitriao se encontrado, ou null se não encontrado.
     */
    public Anfitriao get(int id) {
        Anfitriao anfitriao = null;
        try {
            String sql = "SELECT * FROM anfitriao WHERE id = ?";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setInt(1, id);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                anfitriao = new Anfitriao(
                        rs.getInt("id"),
                        rs.getString("email"),
                        rs.getString("senha"),
                        rs.getString("nome"),
                        rs.getString("info"),
                        (String[]) rs.getArray("fotos").getArray()
                );
            }
            st.close();
        } catch (SQLException e) {
            System.err.println("Erro ao buscar anfitrião: " + e.getMessage());
        }
        return anfitriao;
    }

    /**
     * Retorna uma lista de todos os anfitriões no banco de dados.
     *
     * @return Lista de objetos Anfitriao.
     */
    public List<Anfitriao> getAll() {
        List<Anfitriao> anfitrioes = new ArrayList<>();
        try {
            String sql = "SELECT * FROM anfitriao";
            Statement st = conexao.createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                Anfitriao anfitriao = new Anfitriao(
                        rs.getInt("id"),
                        rs.getString("email"),
                        rs.getString("senha"),
                        rs.getString("nome"),
                        rs.getString("info"),
                        (String[]) rs.getArray("fotos").getArray()
                );
                anfitrioes.add(anfitriao);
            }
            st.close();
        } catch (SQLException e) {
            System.err.println("Erro ao listar anfitriões: " + e.getMessage());
        }
        return anfitrioes;
    }

    /**
     * Atualiza as informações de um anfitrião existente no banco de dados.
     *
     * @param anfitriao Objeto Anfitriao com os novos dados.
     * @param id Identificador do anfitrião a ser atualizado.
     * @return true se a atualização foi bem-sucedida, false caso contrário.
     */
    public boolean update(Anfitriao anfitriao, int id) {
        boolean status = false;
        try {
            String hashedPassword = BCrypt.hashpw(anfitriao.getSenha(), BCrypt.gensalt());
            String sql = "UPDATE anfitriao SET email = ?, senha = ?, nome = ?, info = ?, fotos = ? WHERE id = ?";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setString(1, anfitriao.getEmail());
            st.setString(2,hashedPassword);
            st.setString(3, anfitriao.getNome());
            st.setString(4, anfitriao.getInfo());
            Array arrayFotos = conexao.createArrayOf("TEXT", anfitriao.getFotos());
            st.setArray(5, arrayFotos);
            st.setInt(6, id);
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar anfitrião: " + e.getMessage());
        }
        return status;
    }

    /**
     * Deleta um anfitrião do banco de dados pelo ID.
     *
     * @param id Identificador do anfitrião a ser deletado.
     * @return true se a exclusão foi bem-sucedida, false caso contrário.
     */
    public boolean delete(int id) {
        boolean status = false;
        try {
            String sql = "DELETE FROM anfitriao WHERE id = ?";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setInt(1, id);
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException e) {
            System.err.println("Erro ao deletar anfitrião: " + e.getMessage());
        }
        return status;
    }
}
