package service;

import java.util.List;

import com.google.gson.Gson;

import dao.AnfitriaoDAO;
import model.Anfitriao;
import spark.Request;
import spark.Response;

/**
 * Classe que representa o serviço de Anfitrião.
 * Contém métodos para manipular as operações relacionadas a Anfitriões.
 */
public class AnfitriaoService {
    private AnfitriaoDAO anfitriaoDAO;

    /**
     * Construtor da classe AnfitriaoService.
     * Inicializa uma instância do DAO de Anfitrião.
     */
    public AnfitriaoService() {
        this.anfitriaoDAO = new AnfitriaoDAO();
    }

    /**
     * Insere um novo Anfitrião.
     * 
     * @param request  Requisição contendo os dados do Anfitrião a serem inseridos.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a inserção for bem-sucedida, false caso contrário.
     */
    public boolean insert(Request request, Response response) {
        Anfitriao anfitriao = new Gson().fromJson(request.body(), Anfitriao.class);
        boolean inseriu = anfitriaoDAO.insert(anfitriao);
        if (inseriu) {
            response.status(201);  // Created
        } else {
            response.status(500);  // Internal Server Error
        }
        return inseriu;
    }

    /**
     * Obtém um Anfitrião pelo ID.
     * 
     * @param request  Requisição contendo o ID do Anfitrião.
     * @param response Resposta que será enviada ao cliente.
     * @return O Anfitrião correspondente ao ID em formato JSON ou uma mensagem de erro.
     */
    public Object get(Request request, Response response) {
        String idParam = request.params(":id");
        int id = Integer.parseInt(idParam);

        Anfitriao anfitriao = anfitriaoDAO.get(id);

        if (anfitriao == null) {
            response.status(404);
            return "Anfitrião não encontrado";
        }
        
        response.type("application/json");
        return new Gson().toJson(anfitriao);
    }

    /**
     * Obtém todos os Anfitriões.
     * 
     * @param request  Requisição recebida.
     * @param response Resposta que será enviada ao cliente.
     * @return Lista de Anfitriões em formato JSON ou uma mensagem de erro.
     */
    public Object getAll(Request request, Response response) {
        List<Anfitriao> anfitrioes = anfitriaoDAO.getAll();
        if (anfitrioes == null || anfitrioes.isEmpty()) {
            response.status(404);
            return "Nenhum Anfitrião encontrado";
        }
        
        response.type("application/json");
        return new Gson().toJson(anfitrioes);
    }

    /**
     * Atualiza um Anfitrião existente.
     * 
     * @param request  Requisição contendo os dados do Anfitrião a serem atualizados.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a atualização for bem-sucedida, false caso contrário.
     */
    public boolean update(Request request, Response response) {
        int id = Integer.parseInt(request.params(":id"));
        Anfitriao anfitriao = new Gson().fromJson(request.body(), Anfitriao.class);

        boolean isUpdated = anfitriaoDAO.update(anfitriao, id);

        if (isUpdated) {
            response.status(200);
        } else {
            response.status(404);
        }
        return isUpdated;
    }

    /**
     * Exclui um Anfitrião pelo ID.
     * 
     * @param request  Requisição contendo o ID do Anfitrião a ser excluído.
     * @param response Resposta que será enviada ao cliente.
     * @return true se a exclusão for bem-sucedida, false caso contrário.
     */
    public boolean delete(Request request, Response response) {
        int id = Integer.parseInt(request.params(":id")); // Obtém o ID do Anfitrião da URL
        boolean deleted = anfitriaoDAO.delete(id); // Tenta excluir o Anfitrião no DAO

        if (deleted) {
            response.status(204); // No Content se a exclusão for bem-sucedida
            return true;
        } else {
            response.status(404); // Not Found se o Anfitrião não for encontrado
            return false;
        }
    }
}
