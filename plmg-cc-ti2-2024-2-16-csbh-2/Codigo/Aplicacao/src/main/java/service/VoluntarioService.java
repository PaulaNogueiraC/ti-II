package service;

import java.util.List;

import com.google.gson.Gson;

import dao.VoluntarioDAO;
import model.Voluntario;
import spark.Request;
import spark.Response;

/**
 * Classe que representa o serviço de Voluntário.
 * Contém métodos para manipular operações relacionadas a Voluntários.
 */
public class VoluntarioService 
{
    private VoluntarioDAO voluntarioDAO;

    /**
     * Construtor da classe VoluntarioService.
     * Inicializa uma instância do DAO de Voluntário.
     */
    public VoluntarioService() 
    {
        this.voluntarioDAO = new VoluntarioDAO();
    }

    /**
     * Insere um novo Voluntário.
     * 
     * @param request  Requisição contendo os dados do Voluntário a serem inseridos.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a inserção for bem-sucedida, false caso contrário.
     */
    public boolean insert(Request request, Response response) 
    {
        Voluntario voluntario = new Gson().fromJson(request.body(), Voluntario.class);
        
        boolean inseriu = voluntarioDAO.insert(voluntario);

        if (inseriu) 
        {
            response.status(201);  // Created
        } 
        else 
        {
            response.status(500);  // Internal Server Error
        }
        return inseriu;
    }

    /**
     * Obtém um Voluntário pelo seu ID.
     * 
     * @param request  Requisição contendo o ID do Voluntário.
     * @param response Resposta que será enviada ao cliente.
     * @return O Voluntário correspondente ao ID fornecido ou uma mensagem de erro.
     */
    public Object get(Request request, Response response) 
    {
        int id = Integer.parseInt(request.params(":id")); 
        Voluntario voluntario = voluntarioDAO.get(id); 

        if (voluntario == null) 
        {
            response.status(404);
            return "Voluntário não encontrado";
        }
        
        response.type("application/json");
        return new Gson().toJson(voluntario);
    }

    /**
     * Obtém todos os Voluntários.
     * 
     * @param request  Requisição para obter a lista de Voluntários.
     * @param response Resposta que será enviada ao cliente.
     * @return Lista de Voluntários em formato JSON ou uma mensagem de erro se não houver Voluntários.
     */
    public Object getAll(Request request, Response response) 
    {
        List<Voluntario> voluntarios = voluntarioDAO.getAll();

        // Se a lista estiver vazia, retorna 404
        if (voluntarios.isEmpty()) 
        {
            response.status(404);
            return new Gson().toJson("Nenhum voluntário encontrado.");
        }

        // Define o tipo de resposta e retorna a lista como JSON
        response.type("application/json");
        return new Gson().toJson(voluntarios);
    }

    /**
     * Atualiza um Voluntário existente.
     * 
     * @param request  Requisição contendo os dados do Voluntário a serem atualizados.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a atualização for bem-sucedida, false caso contrário.
     */
    public boolean update(Request request, Response response) 
    {
        int id = Integer.parseInt(request.params(":id")); 
        Voluntario voluntario = new Gson().fromJson(request.body(), Voluntario.class);

        boolean isUpdated = voluntarioDAO.update(voluntario, id);

        if (isUpdated) 
        {
            response.status(200);
        } 
        else 
        {
            response.status(404); // Not Found se o Voluntário não for encontrado
        }
        return isUpdated;
    }

    /**
     * Exclui um Voluntário pelo seu ID.
     * 
     * @param request  Requisição contendo o ID do Voluntário a ser excluído.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a exclusão for bem-sucedida, false caso contrário.
     */
    public boolean delete(Request request, Response response) 
    {
        int id = Integer.parseInt(request.params(":id")); 
        boolean deleted = voluntarioDAO.delete(id); 

        if (deleted) 
        {
            response.status(204); // No Content se a exclusão for bem-sucedida
            return true;
        } 
        else 
        {
            response.status(404); // Not Found se o voluntário não for encontrado
            return false;
        }
    }
}
