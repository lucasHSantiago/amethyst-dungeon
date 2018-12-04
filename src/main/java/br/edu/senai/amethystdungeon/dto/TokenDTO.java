package br.edu.senai.amethystdungeon.dto;

public class TokenDTO {

    private String token;

    TokenDTO(){}

    public static TokenDTO of (String token) {
        TokenDTO dto = new TokenDTO();
        dto.setToken(token);
        return dto;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
