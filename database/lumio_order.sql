-- ============================================
-- Lumio Order - Sistema de Gestão para Restaurantes
-- Script de Criação do Banco de Dados
-- ============================================

CREATE DATABASE IF NOT EXISTS lumio_order CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lumio_order;

-- ============================================
-- TABELA: restaurantes
-- ============================================
CREATE TABLE IF NOT EXISTS restaurantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    email VARCHAR(150),
    telefone VARCHAR(20),
    endereco TEXT,
    logo VARCHAR(255),
    plano ENUM('basico', 'profissional', 'enterprise') DEFAULT 'basico',
    status ENUM('ativo', 'suspenso', 'cancelado') DEFAULT 'ativo',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: usuarios
-- ============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurante_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'gerente', 'garcom', 'cozinha', 'caixa') DEFAULT 'garcom',
    avatar VARCHAR(255),
    telefone VARCHAR(20),
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    ultimo_acesso TIMESTAMP NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE,
    INDEX idx_email (email),
    INDEX idx_restaurante (restaurante_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: mesas
-- ============================================
CREATE TABLE IF NOT EXISTS mesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurante_id INT NOT NULL,
    numero VARCHAR(20) NOT NULL,
    capacidade INT DEFAULT 4,
    localizacao VARCHAR(100),
    status ENUM('livre', 'ocupada', 'reservada', 'manutencao') DEFAULT 'livre',
    qrcode VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_mesa (restaurante_id, numero)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: categorias
-- ============================================
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurante_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    icone VARCHAR(100),
    ordem INT DEFAULT 0,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: produtos
-- ============================================
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurante_id INT NOT NULL,
    categoria_id INT,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    custo DECIMAL(10, 2),
    imagem VARCHAR(255),
    codigo_barras VARCHAR(50),
    estoque_atual INT DEFAULT 0,
    estoque_minimo INT DEFAULT 0,
    unidade_medida VARCHAR(20) DEFAULT 'un',
    controla_estoque BOOLEAN DEFAULT TRUE,
    disponivel BOOLEAN DEFAULT TRUE,
    destaque BOOLEAN DEFAULT FALSE,
    tempo_preparo INT COMMENT 'Tempo em minutos',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    INDEX idx_nome (nome),
    INDEX idx_categoria (categoria_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: comandas
-- ============================================
CREATE TABLE IF NOT EXISTS comandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurante_id INT NOT NULL,
    mesa_id INT,
    numero VARCHAR(50) NOT NULL,
    cliente_nome VARCHAR(150),
    cliente_telefone VARCHAR(20),
    tipo ENUM('mesa', 'balcao', 'delivery') DEFAULT 'mesa',
    status ENUM('aberta', 'fechada', 'cancelada') DEFAULT 'aberta',
    subtotal DECIMAL(10, 2) DEFAULT 0,
    desconto DECIMAL(10, 2) DEFAULT 0,
    taxa_servico DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) DEFAULT 0,
    observacoes TEXT,
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP NULL,
    usuario_abertura_id INT,
    usuario_fechamento_id INT,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE,
    FOREIGN KEY (mesa_id) REFERENCES mesas(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_abertura_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_fechamento_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_numero (numero),
    INDEX idx_status (status),
    INDEX idx_data (data_abertura)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: pedidos
-- ============================================
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comanda_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade DECIMAL(10, 2) NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    observacoes TEXT,
    status ENUM('pendente', 'preparando', 'pronto', 'entregue', 'cancelado') DEFAULT 'pendente',
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    usuario_id INT,
    FOREIGN KEY (comanda_id) REFERENCES comandas(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE RESTRICT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_comanda (comanda_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: pagamentos
-- ============================================
CREATE TABLE IF NOT EXISTS pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comanda_id INT NOT NULL,
    forma_pagamento ENUM('dinheiro', 'credito', 'debito', 'pix', 'vale') NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    troco DECIMAL(10, 2) DEFAULT 0,
    status ENUM('pendente', 'aprovado', 'cancelado') DEFAULT 'pendente',
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT,
    FOREIGN KEY (comanda_id) REFERENCES comandas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: caixa
-- ============================================
CREATE TABLE IF NOT EXISTS caixa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurante_id INT NOT NULL,
    usuario_abertura_id INT,
    usuario_fechamento_id INT,
    valor_inicial DECIMAL(10, 2) NOT NULL,
    valor_vendas DECIMAL(10, 2) DEFAULT 0,
    valor_sangrias DECIMAL(10, 2) DEFAULT 0,
    valor_final DECIMAL(10, 2),
    status ENUM('aberto', 'fechado') DEFAULT 'aberto',
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP NULL,
    observacoes TEXT,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_abertura_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_fechamento_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: sangrias
-- ============================================
CREATE TABLE IF NOT EXISTS sangrias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    caixa_id INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    motivo VARCHAR(255),
    data_sangria TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT,
    FOREIGN KEY (caixa_id) REFERENCES caixa(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: delivery
-- ============================================
CREATE TABLE IF NOT EXISTS delivery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comanda_id INT NOT NULL,
    endereco_entrega TEXT NOT NULL,
    complemento VARCHAR(255),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    taxa_entrega DECIMAL(10, 2) DEFAULT 0,
    tempo_estimado INT COMMENT 'Minutos',
    status ENUM('aguardando', 'preparando', 'saiu_entrega', 'entregue', 'cancelado') DEFAULT 'aguardando',
    entregador VARCHAR(150),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_entrega TIMESTAMP NULL,
    FOREIGN KEY (comanda_id) REFERENCES comandas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: estoque_movimentacoes
-- ============================================
CREATE TABLE IF NOT EXISTS estoque_movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    tipo ENUM('entrada', 'saida', 'ajuste') NOT NULL,
    quantidade DECIMAL(10, 2) NOT NULL,
    motivo VARCHAR(255),
    custo_unitario DECIMAL(10, 2),
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: reservas
-- ============================================
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurante_id INT NOT NULL,
    mesa_id INT,
    cliente_nome VARCHAR(150) NOT NULL,
    cliente_telefone VARCHAR(20) NOT NULL,
    cliente_email VARCHAR(150),
    data_reserva DATETIME NOT NULL,
    numero_pessoas INT NOT NULL,
    observacoes TEXT,
    status ENUM('confirmada', 'cancelada', 'concluida') DEFAULT 'confirmada',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE,
    FOREIGN KEY (mesa_id) REFERENCES mesas(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: logs_acesso
-- ============================================
CREATE TABLE IF NOT EXISTS logs_acesso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo_acao VARCHAR(50) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    data_acesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_data (data_acesso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DADOS INICIAIS - Restaurante Demo
-- ============================================
INSERT INTO restaurantes (nome, email, telefone, plano, status) VALUES
('Restaurante Demo', 'contato@demo.com', '(11) 99999-9999', 'profissional', 'ativo');

-- ============================================
-- DADOS INICIAIS - Usuários
-- Senha padrão: admin123 e demo123 (hash: password_hash)
-- ============================================
INSERT INTO usuarios (restaurante_id, nome, email, senha, tipo, status) VALUES
(1, 'Administrador', 'admin@lumio.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'ativo'),
(1, 'Usuário Demo', 'demo@lumio.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'gerente', 'ativo');

-- ============================================
-- DADOS INICIAIS - Mesas
-- ============================================
INSERT INTO mesas (restaurante_id, numero, capacidade, localizacao, status) VALUES
(1, '1', 4, 'Salão Principal', 'livre'),
(1, '2', 4, 'Salão Principal', 'livre'),
(1, '3', 2, 'Varanda', 'livre'),
(1, '4', 6, 'Salão Principal', 'livre'),
(1, '5', 4, 'Área Externa', 'livre'),
(1, '6', 2, 'Salão Principal', 'livre'),
(1, '7', 8, 'Salão VIP', 'livre'),
(1, '8', 4, 'Salão Principal', 'livre');

-- ============================================
-- DADOS INICIAIS - Categorias
-- ============================================
INSERT INTO categorias (restaurante_id, nome, descricao, ordem) VALUES
(1, 'Entradas', 'Petiscos e aperitivos', 1),
(1, 'Pratos Principais', 'Refeições completas', 2),
(1, 'Bebidas', 'Bebidas diversas', 3),
(1, 'Sobremesas', 'Doces e sobremesas', 4),
(1, 'Lanches', 'Sanduíches e lanches', 5);

-- ============================================
-- DADOS INICIAIS - Produtos
-- ============================================
INSERT INTO produtos (restaurante_id, categoria_id, nome, descricao, preco, custo, estoque_atual, disponivel) VALUES
(1, 1, 'Batata Frita', 'Porção de batata frita crocante', 25.00, 8.00, 50, TRUE),
(1, 1, 'Pastéis Sortidos', '10 unidades de pastéis variados', 35.00, 12.00, 30, TRUE),
(1, 2, 'Filé à Parmegiana', 'Filé empanado com molho e queijo', 58.00, 22.00, 20, TRUE),
(1, 2, 'Feijoada Completa', 'Feijoada tradicional para 1 pessoa', 45.00, 18.00, 15, TRUE),
(1, 3, 'Refrigerante Lata', 'Refrigerante 350ml', 6.00, 2.50, 100, TRUE),
(1, 3, 'Suco Natural', 'Suco natural de frutas 500ml', 12.00, 4.00, 50, TRUE),
(1, 4, 'Pudim', 'Pudim de leite condensado', 15.00, 5.00, 25, TRUE),
(1, 4, 'Petit Gateau', 'Bolinho de chocolate com sorvete', 28.00, 10.00, 15, TRUE),
(1, 5, 'Hambúrguer Artesanal', 'Hambúrguer 180g com fritas', 38.00, 14.00, 30, TRUE),
(1, 5, 'Sanduíche Natural', 'Sanduíche natural integral', 18.00, 6.00, 40, TRUE);

-- ============================================
-- Fim do Script
-- ============================================
