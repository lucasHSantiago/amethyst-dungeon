package br.edu.senai.amethystdungeon.db.util;

import br.edu.senai.amethystdungeon.dto.UsuarioDTO;
import com.auth0.jwt.Algorithm;
import com.auth0.jwt.JWTSigner;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.JWTVerifyException;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.auth0.jwt.JWTSigner.Options;

public class JwtUtil {

    private static final Logger LOGGER = Logger.getLogger(JwtUtil.class.getName());

    private SecretKey secretKey;
    private static JwtUtil instance;
    private final int TEMPO_VIDA_TOKEN = 18000;

    JwtUtil() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("AES");
            keyGen.init(256);
            secretKey = keyGen.generateKey();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error creating key for JWT", e);
        }
    }

    public static JwtUtil getInstance() {
        if (instance == null) {
            instance = new JwtUtil();
        }
        return instance;
    }

    public String createToken(UsuarioDTO usuario) throws NoSuchAlgorithmException {
        JWTSigner signer = new JWTSigner(secretKey.getEncoded());
        HashMap<String, Object> claims = new HashMap<String, Object>();
        claims.put("login", usuario.getLogin());
        claims.put("id", usuario.getId());
        claims.put("admin", usuario.getAdmin());
        String token = signer.sign(claims, getOptions());
        return token;
    }

    private Options getOptions() {
        return new JWTSigner.Options().setAlgorithm(Algorithm.HS256).setExpirySeconds(TEMPO_VIDA_TOKEN).setIssuedAt(true);
    }

    public String createTokenMap(Map<String, Object> claims) throws  NoSuchAlgorithmException {
        JWTSigner signer = new JWTSigner(secretKey.getEncoded());
        String token = signer.sign(claims, getOptions());
        return token;
    }

    public Map<String, Object> decode(String token) throws InvalidKeyException, NoSuchAlgorithmException, IllegalStateException, SignatureException, IOException, JWTVerifyException {
        JWTVerifier verifier = new JWTVerifier(secretKey.getEncoded());
        Map<String, Object> map = null;
        map = verifier.verify(token);
        return map;
    }
}
