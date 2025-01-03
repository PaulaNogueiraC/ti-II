package dao;

import model.Voluntario;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.mindrot.jbcrypt.BCrypt;
/**
 * Classe VoluntarioDAO: Responsável por realizar operações CRUD para a entidade Voluntario no banco de dados.
 */
public class VoluntarioDAO extends DAO 
{
    /**
     * Construtor da classe VoluntarioDAO.
     * Invoca o método para estabelecer conexão com o banco de dados.
     */
    public VoluntarioDAO() 
    {
        super();
        conectar();
    }

    /**
     * Método finalize: Invocado ao destruir o objeto, fecha a conexão com o banco de dados.
     */
    @Override
    public void finalize() 
    {
        close();
    }

    /**
     * Método para inserir um novo voluntário no banco de dados.
     * @param voluntario Objeto do tipo Voluntario a ser inserido.
     * @return Retorna true se a inserção foi bem-sucedida, false caso contrário.
     */
    public boolean insert(Voluntario voluntario) 
    {
        boolean status = false;
        try {
            // Define a instrução SQL para inserção
            String hashedPassword = BCrypt.hashpw(voluntario.getSenha(), BCrypt.gensalt());
            String sql = "INSERT INTO voluntario (email, senha, nome, fotos) VALUES (?, ?, ?, ?);";
            PreparedStatement st = conexao.prepareStatement(sql);
            // Configura os parâmetros da instrução SQL
            st.setString(1, voluntario.getEmail());
            st.setString(2, hashedPassword);
            st.setString(3, voluntario.getNome());
            Array arrayFotos = conexao.createArrayOf("TEXT", voluntario.getFotos());
            st.setArray(4, arrayFotos);
            // Executa a instrução e fecha o PreparedStatement
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException e) 
        {
            System.err.println("Erro ao inserir voluntário: " + e.getMessage());
        }
        return status;
    }

    /**
     * Método para obter um voluntário pelo ID.
     * @param id Identificador do voluntário.
     * @return Retorna o objeto Voluntario correspondente ao ID, ou null se não encontrado.
     */
    public Voluntario get(int id) 
    {
        Voluntario voluntario = null;
        try {
            String sql = "SELECT * FROM voluntario WHERE id = ?";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setInt(1, id); // Configura o parâmetro ID
            ResultSet rs = st.executeQuery();

            // Se um resultado for encontrado, cria um novo objeto Voluntario
            if (rs.next()) {
                voluntario = new Voluntario(
                    rs.getInt("id"),
                    rs.getString("email"),
                    rs.getString("senha"),
                    rs.getString("nome"),
                    (String[]) rs.getArray("fotos").getArray()
                );
            }
            st.close();
        } catch (SQLException e) {
            System.err.println("Erro ao buscar voluntário: " + e.getMessage());
        }
        return voluntario;
    }

    /**
     * Método para obter uma lista de todos os voluntários.
     * @return Lista de objetos Voluntario.
     */
    public List<Voluntario> getAll() {
        List<Voluntario> voluntarios = new ArrayList<>();

        String sql = "SELECT * FROM voluntario";
        try (Statement st = conexao.createStatement(); ResultSet rs = st.executeQuery(sql)) {
            // Adiciona cada voluntário encontrado na lista
            while (rs.next()) {
                Voluntario voluntario = new Voluntario(
                    rs.getInt("id"),
                    rs.getString("email"),
                    rs.getString("senha"),
                    rs.getString("nome"),
                    (String[]) rs.getArray("fotos").getArray()
                );
                voluntarios.add(voluntario);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao listar voluntários: " + e.getMessage());
        }
        return voluntarios;
    }

    /**
     * Método para atualizar os dados de um voluntário.
     * @param voluntario Objeto Voluntario com os novos dados.
     * @param id Identificador do voluntário a ser atualizado.
     * @return Retorna true se a atualização foi bem-sucedida, false caso contrário.
     */
    public boolean update(Voluntario voluntario, int id) 
    {
        boolean status = false;
        try {
            String hashedPassword = BCrypt.hashpw(voluntario.getSenha(), BCrypt.gensalt());
            String sql = "UPDATE voluntario SET email = ?, senha = ?, nome = ?, fotos = ? WHERE id = ?";
            PreparedStatement st = conexao.prepareStatement(sql);
            // Configura os parâmetros da instrução SQL
            st.setString(1, voluntario.getEmail());
            st.setString(2, hashedPassword);
            st.setString(3, voluntario.getNome());
            Array arrayFotos = conexao.createArrayOf("TEXT", voluntario.getFotos());
            st.setArray(4, arrayFotos);
            st.setInt(5, id); // Define o ID para atualização
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar voluntário: " + e.getMessage());
        }
        return status;
    }

    /**
     * Método para deletar um voluntário pelo ID.
     * @param id Identificador do voluntário a ser deletado.
     * @return Retorna true se a exclusão foi bem-sucedida, false caso contrário.
     */
    public boolean delete(int id) 
    {
        boolean status = false;
        try {
            String sql = "DELETE FROM voluntario WHERE id = ?";
            PreparedStatement st = conexao.prepareStatement(sql);
            st.setInt(1, id); // Define o ID para exclusão
            st.executeUpdate();
            st.close();
            status = true;
        } catch (SQLException e) {
            System.err.println("Erro ao deletar voluntário: " + e.getMessage());
        }
        return status;
    }
}
