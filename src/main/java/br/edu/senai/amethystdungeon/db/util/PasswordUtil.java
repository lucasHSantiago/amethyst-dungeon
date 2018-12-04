package br.edu.senai.amethystdungeon.db.util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtil {

    public static String criptografaSenha(String senha) {
        String salGerado = BCrypt.gensalt();
        System.out.println("O sal gerado foi $" + salGerado + "$");

        return BCrypt.hashpw(senha, salGerado);
    }

    public static boolean autentica(String senhaBanco, String senhaInformada) {
        return BCrypt.checkpw(senhaInformada, senhaBanco);
    }
}
