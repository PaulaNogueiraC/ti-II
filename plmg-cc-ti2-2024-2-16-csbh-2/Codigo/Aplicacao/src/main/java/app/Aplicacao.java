package app;

import service.AnfitriaoService;
import service.AuthService;
import service.FavoritoService;
import service.ProjetoService;
import service.VoluntarioService;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

/**
 * Classe principal da aplicação que configura o servidor, define a porta e 
 * os endpoints para manipulação de projetos, anfitriões, voluntários e favoritos.
 */
public class Aplicacao {

    // Instâncias dos serviços responsáveis pelo gerenciamento das entidades da aplicação
    private static ProjetoService projetoService = new ProjetoService();
    private static VoluntarioService voluntarioService = new VoluntarioService();
    private static AnfitriaoService anfitriaoService = new AnfitriaoService();
    private static FavoritoService favoritoService = new FavoritoService();
    private static AuthService authService = new AuthService();

    /**
     * Método principal que configura o servidor e define os endpoints.
     * 
     * @param args Argumentos de linha de comando (não utilizados).
     */
    public static void main(String[] args) {
        // Define a porta do servidor como 6789
        port(6789);

        // Define a localização dos arquivos estáticos
        staticFiles.location("/public");

        // Endpoints para manipulação de projetos

        // Insere um novo projeto
        post("/projeto/insert", (request, response) -> projetoService.insert(request, response));

        // Obtém todos os projetos de um anfitrião específico
        get("/projeto/anfitriao/:idAnfitriao", (request, response) -> projetoService.getAllByAnfitriaoId(request, response));

        // Lista todos os projetos por tipo
        get("/projeto/list/:tipo", (request, response) -> projetoService.getAllByTipo(request, response));

        // Obtém um projeto específico pelo ID
        get("/projeto/:id", (request, response) -> projetoService.get(request, response));

        // Atualiza um projeto específico pelo ID
        post("/projeto/update/:id", (request, response) -> projetoService.update(request, response));

        // Deleta um projeto específico pelo ID
        get("/projeto/delete/:id", (request, response) -> projetoService.delete(request, response));

        // Endpoints para manipulação de anfitriões

        // Insere um novo anfitrião
        post("/anfitriao/insert", (request, response) -> anfitriaoService.insert(request, response));

        // Lista todos os anfitriões
        get("/anfitriao/list", (request, response) -> anfitriaoService.getAll(request, response));

        // Obtém um anfitrião específico pelo ID
        get("/anfitriao/:id", (request, response) -> anfitriaoService.get(request, response));

        // Atualiza um anfitrião específico pelo ID
        post("/anfitriao/update/:id", (request, response) -> anfitriaoService.update(request, response));

        // Deleta um anfitrião específico pelo ID
        get("/anfitriao/delete/:id", (request, response) -> anfitriaoService.delete(request, response));

        // Endpoints para manipulação de voluntários

        // Insere um novo voluntário
        post("/voluntario/insert", (request, response) -> voluntarioService.insert(request, response));

        // Lista todos os voluntários
        get("/voluntario/list", (request, response) -> voluntarioService.getAll(request, response));

        // Obtém um voluntário específico pelo ID
        get("/voluntario/:id", (request, response) -> voluntarioService.get(request, response));

        // Atualiza um voluntário específico pelo ID
        post("/voluntario/update/:id", (request, response) -> voluntarioService.update(request, response));

        // Deleta um voluntário específico pelo ID
        get("/voluntario/delete/:id", (request, response) -> voluntarioService.delete(request, response));

        // Endpoints para manipulação de favoritos

        // Adiciona um projeto aos favoritos de um voluntário
        post("/favorito/insert", (request, response) -> favoritoService.insert(request, response));

        // Obtém todos os projetos favoritos de um voluntário específico
        get("/favorito/:idVoluntario", (request, response) -> favoritoService.getAllProjetosByVoluntarioId(request, response));

        // Verifica se um projeto específico está nos favoritos de um voluntário
        get("/favorito/:idVoluntario/:idProjeto", (request, response) -> favoritoService.get(request, response));

        // Remove um projeto dos favoritos de um voluntário
        get("/favorito/delete/:idVoluntario/:idProjeto", (request, response) -> favoritoService.delete(request, response));

        post("/autenticador", (request, response) -> authService.autenticar(request, response));
    }
}
