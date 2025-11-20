# 📁 Estrutura do Projeto - Lumio Order

## 🎯 Nova Organização

```
/workspace/
│
├── 📄 index.html                    ← LANDING PAGE (Raiz)
├── 📄 style.css                     ← Estilos da Landing
├── 📄 script.js                     ← Scripts da Landing
│
├── 📁 login/                        ← PÁGINA DE LOGIN
│   ├── index.html                   ← HTML do Login
│   ├── style.css                    ← Estilos do Login
│   └── script.js                    ← Scripts do Login
│
├── 📁 dashboard/                    ← DASHBOARD DO SISTEMA
│   ├── index.html                   ← HTML do Dashboard
│   ├── style.css                    ← Estilos do Dashboard
│   └── script.js                    ← Scripts do Dashboard
│
├── 📁 api/                          ← BACKEND PHP
│   ├── 📁 config/
│   │   └── database.php             ← Configuração do BD
│   ├── auth.php                     ← API de Autenticação
│   ├── 📁 controllers/              ← Controllers (a implementar)
│   └── 📁 models/                   ← Models (a implementar)
│
├── 📁 database/                     ← BANCO DE DADOS
│   └── lumio_order.sql              ← Script SQL completo
│
├── 📁 pictures/                     ← IMAGENS E ÍCONES
│   ├── LumioOrder_logo.png
│   ├── mesas.png
│   ├── comandas.png
│   ├── estoque.png
│   ├── delivery.png
│   ├── relatorios.png
│   ├── usuarios.png
│   ├── notificacoes.png
│   ├── configuracoes.png
│   ├── fecharcaixa.png
│   ├── voltar.png
│   └── ... (outros ícones)
│
├── 📁 assets/                       ← ASSETS (backup)
│   ├── 📁 css/
│   │   ├── landing.css
│   │   └── login.css
│   └── 📁 js/
│       ├── landing.js
│       └── login.js
│
├── 📄 .htaccess                     ← Configuração Apache
├── 📄 README.md                     ← Documentação Completa
├── 📄 INSTALACAO.md                 ← Guia de Instalação
├── 📄 INICIO-RAPIDO.txt             ← Guia Rápido
├── 📄 CREDENCIAIS.txt               ← Credenciais de Acesso
└── 📄 ESTRUTURA.md                  ← Este arquivo
```

## 🌐 URLs de Acesso

### Desenvolvimento Local (XAMPP/WAMP)
```
http://localhost/                    → Landing Page
http://localhost/login/              → Login
http://localhost/dashboard/          → Dashboard
```

### Produção (Hostinger)
```
https://seudominio.com/              → Landing Page
https://seudominio.com/login/        → Login
https://seudominio.com/dashboard/    → Dashboard
```

## 📝 Características de Cada Seção

### 🏠 Landing Page (`/index.html`)
- Hero section com estatísticas
- 8 recursos principais
- 6 vantagens competitivas
- 3 planos de preços
- Formulário de contato
- Footer completo
- 100% Responsivo

**Arquivos:**
- `index.html` - Estrutura HTML
- `style.css` - Estilos (11.7KB)
- `script.js` - Funcionalidades JavaScript

**Funcionalidades:**
- ✓ Menu responsivo (mobile e desktop)
- ✓ Scroll suave para seções
- ✓ Animações ao scroll
- ✓ Formulário de contato
- ✓ Parallax no hero

### 🔐 Login (`/login/index.html`)
- Interface split-screen moderna
- Formulário de login
- Toggle de senha
- Opção "Lembrar-me"
- Modal de demonstração
- Links para recuperação

**Arquivos:**
- `index.html` - Estrutura HTML
- `style.css` - Estilos (8.6KB)
- `script.js` - Lógica de autenticação

**Funcionalidades:**
- ✓ Validação de formulário
- ✓ Autenticação com credenciais
- ✓ LocalStorage para sessão
- ✓ Redirecionamento automático
- ✓ Mensagens de erro/sucesso

**Credenciais de Teste:**
```
Admin: admin@lumio.com / admin123
Demo:  demo@lumio.com / demo123
```

### 📊 Dashboard (`/dashboard/index.html`)
- Sidebar com menu de navegação
- Topbar com busca e notificações
- Cards de estatísticas
- Gráfico de vendas
- Status de mesas em tempo real
- Tabela de pedidos recentes

**Arquivos:**
- `index.html` - Estrutura HTML
- `style.css` - Estilos completos
- `script.js` - Funcionalidades interativas

**Funcionalidades:**
- ✓ Verificação de autenticação
- ✓ Sidebar colapsável
- ✓ Menu mobile
- ✓ Logout funcional
- ✓ Gráfico de vendas (canvas)
- ✓ Atualizações em tempo real (simuladas)
- ✓ Notificações visuais
- ✓ Dados do usuário logado

**Módulos no Menu:**
- Dashboard (atual)
- Mesas
- Comandas
- Estoque
- Caixa
- Delivery
- Usuários
- Configurações

## 🔄 Fluxo de Navegação

```
Landing Page (/)
     ↓
[Botão "Acessar Sistema"]
     ↓
Login (/login/)
     ↓
[Autenticação bem-sucedida]
     ↓
Dashboard (/dashboard/)
     ↓
[Botão "Sair"]
     ↓
Login (/login/)
```

## 📦 Dependências

### Frontend
- **Google Fonts:** Poppins (300, 400, 500, 600, 700)
- **CSS:** Vanilla CSS3 (sem frameworks)
- **JavaScript:** Vanilla JS (sem jQuery)

### Backend
- **PHP:** 7.4+
- **MySQL:** 5.7+
- **PDO:** Para queries seguras

### Bibliotecas Opcionais (Futuras)
- Chart.js (para gráficos avançados)
- SweetAlert2 (para modais bonitos)
- DataTables (para tabelas avançadas)

## 🎨 Sistema de Design

### Cores Principais
```css
--primary-color: #FF6B35     /* Laranja principal */
--secondary-color: #004E89   /* Azul escuro */
--accent-color: #FFD23F      /* Amarelo */
--success: #27AE60           /* Verde */
--danger: #E74C3C            /* Vermelho */
--info: #3498DB              /* Azul */
--warning: #F39C12           /* Laranja escuro */
```

### Tipografia
- **Fonte:** Poppins
- **Tamanhos:**
  - H1: 52px / 32px (mobile)
  - H2: 42px / 28px (mobile)
  - H3: 24px / 20px (mobile)
  - Body: 16px / 14px (mobile)

### Espaçamentos
- **Container:** max-width: 1200px
- **Padding:** 20px - 80px
- **Gaps:** 20px - 60px

## 📱 Responsividade

### Breakpoints
```css
Desktop:  1200px+
Laptop:   968px - 1200px
Tablet:   600px - 968px
Mobile:   320px - 600px
```

### Ajustes por Dispositivo
- **Mobile:** Menu hamburger, stack layout
- **Tablet:** Grid 2 colunas, sidebar colapsável
- **Desktop:** Grid completo, sidebar fixa

## 🔐 Segurança Implementada

### Frontend
- ✓ Validação de inputs
- ✓ Sanitização de dados
- ✓ Proteção XSS básica
- ✓ LocalStorage para sessão

### Backend
- ✓ Prepared Statements (PDO)
- ✓ Password hashing (bcrypt)
- ✓ Proteção SQL Injection
- ✓ CORS configurado
- ✓ Headers de segurança (.htaccess)

### Arquivos Protegidos
- ✓ `/api/config/` bloqueado
- ✓ `/database/` bloqueado
- ✓ Arquivos `.sql` bloqueados
- ✓ Arquivos de configuração bloqueados

## 🚀 Performance

### Otimizações Aplicadas
- ✓ GZIP Compression (.htaccess)
- ✓ Browser Caching
- ✓ CSS/JS minificados (prontos para produção)
- ✓ Imagens otimizadas
- ✓ Lazy loading de conteúdo
- ✓ Code splitting por página

### Métricas Alvo
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.0s
- **Lighthouse Score:** > 90

## 📊 Banco de Dados

### Tabelas Criadas (14)
1. `restaurantes` - Dados dos restaurantes
2. `usuarios` - Usuários do sistema
3. `mesas` - Controle de mesas
4. `categorias` - Categorias de produtos
5. `produtos` - Produtos/pratos
6. `comandas` - Comandas abertas/fechadas
7. `pedidos` - Pedidos das comandas
8. `pagamentos` - Registro de pagamentos
9. `caixa` - Controle de caixa
10. `sangrias` - Registro de sangrias
11. `delivery` - Pedidos delivery
12. `estoque_movimentacoes` - Movimentações
13. `reservas` - Reservas de mesas
14. `logs_acesso` - Logs de acesso

### Dados Iniciais
- ✓ 1 Restaurante demo
- ✓ 2 Usuários (admin e demo)
- ✓ 8 Mesas
- ✓ 5 Categorias
- ✓ 10 Produtos

## 🔄 Próximos Passos

### Fase 1 - Concluída ✅
- [x] Landing page profissional
- [x] Sistema de login
- [x] Dashboard básico
- [x] Estrutura de banco de dados
- [x] API de autenticação

### Fase 2 - A Implementar
- [ ] Módulo de Mesas (CRUD completo)
- [ ] Módulo de Comandas
- [ ] Módulo de Pedidos
- [ ] Integração completa com API

### Fase 3 - A Implementar
- [ ] Módulo de Estoque
- [ ] Módulo de Caixa
- [ ] Módulo de Delivery
- [ ] Relatórios avançados

### Fase 4 - Futuro
- [ ] Impressão de comandas/cupons
- [ ] Integração com impressoras térmicas
- [ ] App mobile (PWA)
- [ ] Notificações push
- [ ] Chat de suporte

## 📞 Suporte

**Email:** contato@lumioorder.com.br
**Telefone:** (11) 99999-9999
**Horário:** Segunda a Sexta, 8h às 18h

---

**Versão:** 1.0.0
**Última Atualização:** Novembro 2024
**Status:** ✅ Pronto para Produção (Fase 1)
