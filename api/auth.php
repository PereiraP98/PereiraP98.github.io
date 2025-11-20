<?php
/**
 * Lumio Order - API de Autenticação
 * Sistema de Gestão para Restaurantes
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config/database.php';

// Método da requisição
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Obter dados JSON
    $data = json_decode(file_get_contents('php://input'), true);
    $action = isset($data['action']) ? $data['action'] : '';

    switch ($action) {
        case 'login':
            login($data);
            break;
        case 'logout':
            logout();
            break;
        case 'verify':
            verifySession();
            break;
        default:
            echo json_encode([
                'success' => false,
                'message' => 'Ação inválida'
            ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido'
    ]);
}

/**
 * Função de Login
 */
function login($data) {
    if (!isset($data['email']) || !isset($data['password'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Email e senha são obrigatórios'
        ]);
        return;
    }

    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = $data['password'];

    try {
        $database = new Database();
        $db = $database->getConnection();

        $query = "SELECT 
                    u.id, 
                    u.nome, 
                    u.email, 
                    u.senha, 
                    u.tipo,
                    u.status,
                    u.avatar,
                    r.id as restaurante_id,
                    r.nome as restaurante_nome
                FROM usuarios u
                LEFT JOIN restaurantes r ON u.restaurante_id = r.id
                WHERE u.email = :email AND u.status = 'ativo'
                LIMIT 1";

        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verificar senha (usando password_verify para senhas criptografadas)
            if (password_verify($password, $user['senha'])) {
                // Iniciar sessão
                session_start();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['nome'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_type'] = $user['tipo'];
                $_SESSION['restaurante_id'] = $user['restaurante_id'];
                $_SESSION['restaurante_nome'] = $user['restaurante_nome'];
                $_SESSION['logged_in'] = true;

                // Registrar login no log
                $log_query = "INSERT INTO logs_acesso (usuario_id, tipo_acao, ip_address, user_agent) 
                             VALUES (:user_id, 'login', :ip, :user_agent)";
                $log_stmt = $db->prepare($log_query);
                $log_stmt->bindParam(':user_id', $user['id']);
                $log_stmt->bindParam(':ip', $_SERVER['REMOTE_ADDR']);
                $log_stmt->bindParam(':user_agent', $_SERVER['HTTP_USER_AGENT']);
                $log_stmt->execute();

                echo json_encode([
                    'success' => true,
                    'message' => 'Login realizado com sucesso',
                    'user' => [
                        'id' => $user['id'],
                        'nome' => $user['nome'],
                        'email' => $user['email'],
                        'tipo' => $user['tipo'],
                        'avatar' => $user['avatar'],
                        'restaurante' => [
                            'id' => $user['restaurante_id'],
                            'nome' => $user['restaurante_nome']
                        ]
                    ]
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Email ou senha incorretos'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Usuário não encontrado ou inativo'
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao processar login: ' . $e->getMessage()
        ]);
    }
}

/**
 * Função de Logout
 */
function logout() {
    session_start();
    session_unset();
    session_destroy();

    echo json_encode([
        'success' => true,
        'message' => 'Logout realizado com sucesso'
    ]);
}

/**
 * Verificar Sessão Ativa
 */
function verifySession() {
    session_start();

    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        echo json_encode([
            'success' => true,
            'logged_in' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'nome' => $_SESSION['user_name'],
                'email' => $_SESSION['user_email'],
                'tipo' => $_SESSION['user_type']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'logged_in' => false,
            'message' => 'Sessão não encontrada'
        ]);
    }
}
?>
