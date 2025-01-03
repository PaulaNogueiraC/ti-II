package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Classe base de acesso a dados (DAO) para gerenciar a conexão com o banco de dados PostgreSQL.
 */
public class DAO {
    
    // Conexão com o banco de dados
    protected Connection conexao;
    
    /**
     * Construtor da classe DAO que inicializa a conexão como null.
     */
    public DAO() {
        conexao = null;
    }
    
    /**
     * Método para estabelecer a conexão com o banco de dados PostgreSQL.
     * @return true se a conexão for estabelecida com sucesso, false caso contrário.
     */
    public boolean conectar() {
        String driverName = "org.postgresql.Driver"; // Nome do driver do PostgreSQL
        String serverName = "projetocsbh.postgres.database.azure.com";             // Endereço do servidor
        String mydatabase = "postgres";                  // Nome do banco de dados
        int porta = 5432;                            // Porta do banco de dados
        String url = "jdbc:postgresql://" + serverName + ":" + porta +"/" + mydatabase; // URL de conexão
        String username = "adm";                // Nome de usuário do banco de dados
        String password = "@Alunocefet15";                // Senha do banco de dados
        boolean status = false;                      // Status da conexão

        try {
            // Carrega o driver de conexão JDBC
            Class.forName(driverName);
            
            // Estabelece a conexão com o banco de dados
            conexao = DriverManager.getConnection(url, username, password);
            
            // Verifica se a conexão foi bem-sucedida
            status = (conexao != null);
            System.out.println("Conexão efetuada com o postgres!");
        } catch (ClassNotFoundException e) { 
            // Tratamento de erro caso o driver JDBC não seja encontrado
            System.err.println("Conexão NÃO efetuada com o postgres -- Driver não encontrado -- " + e.getMessage());
        } catch (SQLException e) {
            // Tratamento de erro caso ocorra problema na conexão
            System.err.println("Conexão NÃO efetuada com o postgres -- " + e.getMessage());
        }
        return status;
    }
    
    /**
     * Método para fechar a conexão com o banco de dados.
     * @return true se a conexão for fechada com sucesso, false caso contrário.
     */
    public boolean close() {
        boolean status = false;
        
        try {
            // Fecha a conexão com o banco de dados
            conexao.close();
            status = true;
        } catch (SQLException e) {
            // Tratamento de erro caso ocorra problema ao fechar a conexão
            System.err.println(e.getMessage());
        }
        return status;
    }
}
