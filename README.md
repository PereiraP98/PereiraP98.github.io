# 🍽️ Lumio Order - Sistema de Gestão para Restaurantes

Sistema SaaS profissional completo para gestão de restaurantes, incluindo controle de mesas, comandas, pedidos, estoque, caixa e delivery.

## 📋 Recursos Principais

- ✅ **Gestão de Mesas** - Controle completo de mesas, reservas e transferências
- ✅ **Comandas Digitais** - Sistema eletrônico de comandas e pedidos
- ✅ **Controle de Estoque** - Gestão inteligente com alertas de reposição
- ✅ **Controle de Caixa** - Abertura, fechamento e sangria
- ✅ **Sistema Delivery** - Gestão completa de pedidos delivery
- ✅ **Relatórios Gerenciais** - Dashboards e relatórios detalhados
- ✅ **Gestão de Usuários** - Controle de permissões por perfil
- ✅ **Notificações em Tempo Real** - Alertas instantâneos
- ✅ **100% Responsivo** - Interface adaptável para desktop, tablet e mobile

## 🚀 Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3 (Design Moderno e Responsivo)
- JavaScript (Vanilla JS)
- Google Fonts (Poppins)

### Backend
- PHP 7.4+
- MySQL 5.7+
- API REST

## 📦 Estrutura do Projeto

```
/workspace/
├── landing.html              # Landing page principal
├── sistema-login.html        # Página de login
├── dashboard.html            # Dashboard (a ser criado)
├── assets/
│   ├── css/
│   │   ├── landing.css      # Estilos da landing page
│   │   └── login.css        # Estilos da página de login
│   └── js/
│       ├── landing.js       # Scripts da landing page
│       └── login.js         # Scripts da página de login
├── api/
│   ├── config/
│   │   └── database.php     # Configuração do banco de dados
│   ├── auth.php             # API de autenticação
│   └── controllers/         # Controllers da API
├── database/
│   └── lumio_order.sql      # Script de criação do banco
├── pictures/                 # Imagens e ícones do sistema
└── modules/                  # Módulos do sistema (a serem criados)
```

## ⚙️ Instalação e Configuração

### 1. Requisitos do Servidor

- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Apache ou Nginx
- mod_rewrite habilitado

### 2. Configuração do Banco de Dados

```bash
# 1. Criar o banco de dados
mysql -u root -p < database/lumio_order.sql

# 2. Configurar credenciais
# Edite o arquivo: api/config/database.php
# Atualize as credenciais do banco de dados
```

### 3. Configuração do PHP

Edite o arquivo `api/config/database.php`:

```php
private $host = "localhost";       // Host do banco
private $db_name = "lumio_order";  // Nome do banco
private $username = "seu_usuario"; // Seu usuário MySQL
private $password = "sua_senha";   // Sua senha MySQL
```

### 4. Hospedagem na Hostinger

#### Upload dos Arquivos
1. Acesse o **File Manager** ou use FTP
2. Faça upload de todos os arquivos para `public_html/`
3. Certifique-se de que as permissões estão corretas (755 para pastas, 644 para arquivos)

#### Configurar Banco de Dados
1. Acesse **MySQL Databases** no painel da Hostinger
2. Crie um novo banco de dados
3. Importe o arquivo `database/lumio_order.sql`
4. Anote as credenciais de acesso

#### Atualizar Configurações
1. Edite `api/config/database.php` com as credenciais corretas
2. Teste o acesso ao site

## 👤 Credenciais de Acesso Demo

### Administrador
- **Email:** admin@lumio.com
- **Senha:** admin123

### Usuário Demo
- **Email:** demo@lumio.com
- **Senha:** demo123

## 🎨 Páginas Disponíveis

### ✅ Landing Page (`landing.html`)
- Hero section com estatísticas
- Seção de recursos completos
- Vantagens do sistema
- Planos e preços
- Formulário de contato
- Design moderno e responsivo

### ✅ Página de Login (`sistema-login.html`)
- Interface profissional
- Validação de formulário
- Toggle de visualização de senha
- Modal de demonstração
- Animações suaves
- Totalmente responsivo

### 🔄 Em Desenvolvimento
- Dashboard principal
- Módulo de mesas
- Módulo de comandas
- Módulo de estoque
- Módulo de caixa
- Módulo de relatórios
- Módulo de delivery
- Módulo de configurações

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais
- `restaurantes` - Dados dos restaurantes
- `usuarios` - Usuários do sistema
- `mesas` - Controle de mesas
- `categorias` - Categorias de produtos
- `produtos` - Produtos/pratos
- `comandas` - Comandas abertas/fechadas
- `pedidos` - Pedidos das comandas
- `pagamentos` - Registro de pagamentos
- `caixa` - Controle de caixa
- `sangrias` - Registro de sangrias
- `delivery` - Pedidos delivery
- `estoque_movimentacoes` - Movimentações de estoque
- `reservas` - Reservas de mesas
- `logs_acesso` - Logs de acesso

## 🎯 Funcionalidades Detalhadas

### Sistema de Autenticação
- Login seguro com hash de senha (bcrypt)
- Sessões PHP
- Logs de acesso
- Controle de permissões por tipo de usuário

### Gestão de Mesas
- Status em tempo real (livre, ocupada, reservada)
- QR Code para cada mesa
- Capacidade e localização
- Transferência entre mesas
- Agrupamento de mesas

### Sistema de Comandas
- Abertura/fechamento de comandas
- Adição de pedidos
- Cálculo automático de totais
- Desconto e taxa de serviço
- Múltiplas formas de pagamento

### Controle de Estoque
- Entrada/saída de produtos
- Alertas de estoque mínimo
- Controle de custos
- Histórico de movimentações

### Controle de Caixa
- Abertura com valor inicial
- Registro de vendas
- Sangrias
- Fechamento com conferência
- Relatório de caixa

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- 🖥️ Desktop (1920px+)
- 💻 Laptop (1366px - 1920px)
- 📱 Tablet (768px - 1366px)
- 📱 Mobile (320px - 768px)

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Proteção contra SQL Injection (PDO)
- Validação de dados no frontend e backend
- Sessões seguras
- Logs de auditoria
- HTTPS recomendado em produção

## 🛠️ Próximos Passos

1. ✅ Landing page criada
2. ✅ Sistema de login criado
3. 🔄 Dashboard principal (em desenvolvimento)
4. 🔄 Módulos funcionais
5. 🔄 API REST completa
6. 🔄 Testes e otimizações

## 📞 Suporte

- **Email:** contato@lumioorder.com.br
- **Telefone:** (11) 99999-9999
- **Horário:** Segunda a Sexta, 8h às 18h

## 📄 Licença

Copyright © 2024 Lumio Order. Todos os direitos reservados.

## 🙏 Agradecimentos

Desenvolvido com ❤️ para transformar a gestão de restaurantes!

---

**Versão:** 1.0.0
**Última Atualização:** Novembro 2024
