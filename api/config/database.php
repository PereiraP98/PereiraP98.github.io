<?php
/**
 * Lumio Order - Sistema de Gestão de Restaurante
 * Configuração do Banco de Dados
 */

class Database {
    private $host = "localhost";
    private $db_name = "lumio_order";
    private $username = "root";
    private $password = "";
    public $conn;

    // Método para obter conexão com o banco
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Erro de conexão: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
