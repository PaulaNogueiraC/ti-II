package service;

import java.util.List;

import com.google.gson.Gson;

import dao.ProjetoDAO;
import model.Projeto;
import spark.Request;
import spark.Response;

/**
 * Classe que representa o serviço de Projeto.
 * Contém métodos para manipular operações relacionadas a Projetos.
 */
public class ProjetoService 
{
    private ProjetoDAO projetoDAO;

    /**
     * Construtor da classe ProjetoService.
     * Inicializa uma instância do DAO de Projeto.
     */
    public ProjetoService() 
    {
        this.projetoDAO = new ProjetoDAO();
    }

    /**
     * Insere um novo Projeto.
     * 
     * @param request  Requisição contendo os dados do Projeto a serem inseridos.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a inserção for bem-sucedida, false caso contrário.
     */
    public boolean insert(Request request, Response response) 
    {
        Projeto projeto = new Gson().fromJson(request.body(), Projeto.class);
        boolean inseriu = projetoDAO.insert(projeto);
        if (inseriu) {
            response.status(201);  // Created
        } else {
            response.status(500);  // Internal Server Error
        }
        return inseriu;
    }

    /**
     * Obtém um Projeto pelo seu ID.
     * 
     * @param request  Requisição contendo o ID do Projeto.
     * @param response Resposta que será enviada ao cliente.
     * @return O Projeto correspondente ao ID fornecido ou uma mensagem de erro.
     */
    public Object get(Request request, Response response) 
    {
        String idParam = request.params(":id");
        int id = Integer.parseInt(idParam);

        Projeto projeto = projetoDAO.get(id);

        if (projeto == null) {
            response.status(404);
            return "Projeto não encontrado";
        }
        
        response.type("application/json");
        return new Gson().toJson(projeto);
    }

    /**
     * Obtém todos os Projetos de um Anfitrião específico.
     * 
     * @param request  Requisição contendo o ID do Anfitrião.
     * @param response Resposta que será enviada ao cliente.
     * @return Lista de Projetos do Anfitrião em formato JSON ou uma mensagem de erro.
     */
    public Object getAllByAnfitriaoId(Request request, Response response) 
    {
        String idParam = request.params(":idAnfitriao");
        int idAnfitriao = Integer.parseInt(idParam);

        List<Projeto> projetos = projetoDAO.getAllByAnfitriaoId(idAnfitriao);
        
        if (projetos == null || projetos.isEmpty()) {
            response.status(404);
            return "Nenhum projeto encontrado para este anfitrião";
        }
        
        response.type("application/json");
        return new Gson().toJson(projetos);
    }

    /**
     * Obtém todos os Projetos de um determinado tipo.
     * 
     * @param request  Requisição contendo o tipo de Projeto.
     * @param response Resposta que será enviada ao cliente.
     * @return Lista de Projetos do tipo especificado em formato JSON ou uma mensagem de erro.
     */
    public Object getAllByTipo(Request request, Response response) 
    {   
        String tipo = request.params(":tipo");
        
        List<Projeto> projetos = projetoDAO.getAllByTipo(tipo);
        
        if (projetos == null || projetos.isEmpty()) {
            response.status(404);
            return "Nenhum projeto encontrado deste tipo";
        }
        
        response.type("application/json");
        return new Gson().toJson(projetos);
    }

    /**
     * Atualiza um Projeto existente.
     * 
     * @param request  Requisição contendo os dados do Projeto a serem atualizados.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a atualização for bem-sucedida, false caso contrário.
     */
    public boolean update(Request request, Response response) 
    {
        int id = Integer.parseInt(request.params(":id"));
        Projeto projeto = new Gson().fromJson(request.body(), Projeto.class);

        boolean isUpdated = projetoDAO.update(projeto, id);

        if (isUpdated) 
        {
            response.status(200);
        } 
        else 
        {
            response.status(404); // Not Found se o Projeto não for encontrado
        }
        return isUpdated;
    }

    /**
     * Exclui um Projeto pelo seu ID.
     * 
     * @param request  Requisição contendo o ID do Projeto a ser excluído.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a exclusão for bem-sucedida, false caso contrário.
     */
    public boolean delete(Request request, Response response) 
    {
        int id = Integer.parseInt(request.params(":id")); // Obtém o ID do projeto da URL
        boolean deleted = projetoDAO.delete(id); // Tenta excluir o projeto no DAO

        if (deleted) 
        {
            response.status(204); // No Content se a exclusão for bem-sucedida
            return true;
        } 
        else 
        {
            response.status(404); // Not Found se o projeto não for encontrado
            return false;
        }
    }
}
