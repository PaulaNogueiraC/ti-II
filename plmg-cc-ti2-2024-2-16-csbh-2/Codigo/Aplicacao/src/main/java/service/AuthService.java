package service;
import java.util.Map;

import org.mindrot.jbcrypt.BCrypt;

import com.google.gson.Gson;

import spark.Request;
import spark.Response;
public class AuthService {
    public String autenticar(Request request, Response response) {
        Map<String, String> dados = new Gson().fromJson(request.body(), Map.class);
        String senhaCriptografada = dados.get("senhaCriptografada");
        String senhaFornecida = dados.get("senhaFornecida");

        boolean autenticado = BCrypt.checkpw(senhaFornecida, senhaCriptografada);

        // Retornar a resposta como JSON
        response.type("application/json");
        return new Gson().toJson(autenticado);
    }
}