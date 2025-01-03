package service;

//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Date;

import java.util.List;

import com.google.gson.Gson;

import dao.FavoritoDAO;
import model.Favorito;
import model.Projeto;
import spark.Request;
import spark.Response;

/**
 * Classe que representa o serviço de Favorito.
 * Contém métodos para manipular operações relacionadas a Favoritos.
 */
public class FavoritoService {
    private FavoritoDAO favoritoDAO;

    /**
     * Construtor da classe FavoritoService.
     * Inicializa uma instância do DAO de Favorito.
     */
    public FavoritoService() {
        this.favoritoDAO = new FavoritoDAO();
    }

    /**
     * Insere um novo Favorito.
     * 
     * @param request  Requisição contendo os dados do Favorito a serem inseridos.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a inserção for bem-sucedida, false caso contrário.
     */
    public boolean insert(Request request, Response response) {
        Favorito favorito = new Gson().fromJson(request.body(), Favorito.class);
        System.out.println(favorito); // Exibe o objeto Favorito no console para depuração
        boolean inseriu = favoritoDAO.insert(favorito);
        if (inseriu) {
            response.status(201);  // Created
        } else {
            response.status(500);  // Internal Server Error
        }
        return inseriu;
    }

    /**
     * Obtém um Projeto baseado no ID do Voluntário e no ID do Projeto.
     * 
     * @param request  Requisição contendo os IDs do Voluntário e do Projeto.
     * @param response Resposta que será enviada ao cliente.
     * @return O Projeto correspondente aos IDs fornecidos ou uma mensagem de erro.
     */
    public Object get(Request request, Response response) {
        int idVoluntario = Integer.parseInt(request.params(":idVoluntario"));
        int idProjeto = Integer.parseInt(request.params(":idProjeto"));

        Projeto projeto = favoritoDAO.get(idVoluntario, idProjeto);

        if (projeto == null) {
            response.status(404);
            return "Projeto não encontrado";
        }
        
        response.type("application/json");
        return projeto; // O projeto será convertido para JSON automaticamente
    }

    /**
     * Obtém todos os Projetos favoritados por um Voluntário específico.
     * 
     * @param request  Requisição contendo o ID do Voluntário.
     * @param response Resposta que será enviada ao cliente.
     * @return Lista de Projetos favoritados em formato JSON ou uma mensagem de erro.
     */
    public Object getAllProjetosByVoluntarioId(Request request, Response response) {
        String idParam = request.params(":idVoluntario");
        int idVoluntario = Integer.parseInt(idParam);

        List<Projeto> projetosFavoritados = favoritoDAO.getAllProjetosByVoluntarioId(idVoluntario);

        if (projetosFavoritados == null || projetosFavoritados.isEmpty()) {
            response.status(404);
            return "Nenhum projeto favoritado encontrado";
        }
        
        response.type("application/json");
        return new Gson().toJson(projetosFavoritados); 
    }

    /**
     * Exclui um Favorito baseado no ID do Voluntário e no ID do Projeto.
     * 
     * @param request  Requisição contendo os IDs do Voluntário e do Projeto a serem excluídos.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a exclusão for bem-sucedida, false caso contrário.
     */
    public boolean delete(Request request, Response response) {
        int idVoluntario = Integer.parseInt(request.params(":idVoluntario")); 
        int idProjeto = Integer.parseInt(request.params(":idProjeto")); 
        boolean deleted = favoritoDAO.delete(idVoluntario, idProjeto); 

        if (deleted) {
            response.status(204); // No Content se a exclusão for bem-sucedida
            return true;
        } else {
            response.status(404); // Not Found se o Favorito não for encontrado
            return false;
        }
    }
}
