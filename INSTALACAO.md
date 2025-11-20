# 📖 Guia de Instalação - Lumio Order

## 🎯 Passo a Passo para Hostinger

### 1️⃣ Preparação

#### Requisitos
- Conta na Hostinger (recomendado: plano Business ou superior)
- Acesso ao painel de controle (hPanel)
- Cliente FTP (FileZilla) ou use o File Manager da Hostinger

### 2️⃣ Configurar Banco de Dados MySQL

1. **Acesse o hPanel da Hostinger**
   - Faça login em: https://www.hostinger.com.br

2. **Criar Banco de Dados**
   - No hPanel, procure por "**Bancos de Dados MySQL**"
   - Clique em "**Gerenciar**"
   - Clique em "**Novo Banco de Dados**"
   - Nome sugerido: `u123456789_lumio` (use o prefixo da sua conta)
   - Anote as credenciais:
     * Nome do banco: `u123456789_lumio`
     * Usuário: `u123456789_admin`
     * Senha: (a senha que você definir)
     * Host: `localhost`

3. **Importar Estrutura do Banco**
   - Na mesma página de MySQL, clique em "**Entrar no phpMyAdmin**"
   - Selecione o banco de dados criado na barra lateral
   - Clique na aba "**Importar**"
   - Clique em "**Escolher arquivo**"
   - Selecione o arquivo: `database/lumio_order.sql`
   - Role até o final e clique em "**Executar**"
   - Aguarde a confirmação "Importação finalizada com sucesso"

### 3️⃣ Upload dos Arquivos

#### Opção A: Usando File Manager (Mais Fácil)

1. **Acessar File Manager**
   - No hPanel, procure por "**Gerenciador de Arquivos**"
   - Clique em "**Gerenciar**"

2. **Preparar Diretório**
   - Navegue até a pasta `public_html`
   - Delete os arquivos padrão (index.html, etc.) se existirem
   - Você pode criar uma subpasta se quiser: `public_html/lumio/`

3. **Fazer Upload**
   - Clique em "**Enviar**" (ícone de upload)
   - Selecione todos os arquivos do projeto:
     * landing.html
     * sistema-login.html
     * pasta assets/
     * pasta api/
     * pasta pictures/
     * pasta modules/
     * .htaccess
     * README.md
   - Aguarde o upload completar

#### Opção B: Usando FTP (FileZilla)

1. **Credenciais FTP**
   - No hPanel, vá em "**Contas FTP**"
   - Anote as credenciais:
     * Host: ftp.seudominio.com
     * Usuário: seu_usuario@seudominio.com
     * Senha: sua_senha_ftp
     * Porta: 21

2. **Conectar via FileZilla**
   - Abra o FileZilla
   - Insira as credenciais FTP
   - Conecte ao servidor

3. **Transferir Arquivos**
   - No lado esquerdo (local): navegue até a pasta do projeto
   - No lado direito (servidor): navegue até `public_html`
   - Selecione todos os arquivos e pastas
   - Arraste para o lado direito para fazer upload

### 4️⃣ Configurar Conexão com Banco de Dados

1. **Editar arquivo de configuração**
   - No File Manager, navegue até: `api/config/database.php`
   - Clique com botão direito e selecione "**Editar**"
   
2. **Atualizar credenciais**
   ```php
   private $host = "localhost";
   private $db_name = "u123456789_lumio";      // SEU BANCO
   private $username = "u123456789_admin";      // SEU USUÁRIO
   private $password = "SUA_SENHA_MYSQL";       // SUA SENHA
   ```

3. **Salvar arquivo**
   - Clique em "**Salvar e Fechar**"

### 5️⃣ Configurar Permissões

1. **Permissões de Pastas**
   - Clique com botão direito em cada pasta
   - Selecione "**Permissões**"
   - Configure para **755** (rwxr-xr-x)
   - Pastas importantes:
     * api/
     * assets/
     * pictures/
     * modules/

2. **Permissões de Arquivos**
   - Configure arquivos para **644** (rw-r--r--)
   - Arquivos importantes:
     * *.html
     * *.php
     * *.css
     * *.js

### 6️⃣ Testar Instalação

1. **Acessar Landing Page**
   ```
   https://seudominio.com/landing.html
   ```
   OU
   ```
   https://seudominio.com/lumio/landing.html
   ```

2. **Testar Login**
   - Clique em "**Acessar Sistema**"
   - Use as credenciais demo:
     * Email: `admin@lumio.com`
     * Senha: `admin123`

3. **Verificar Banco de Dados**
   - Se o login funcionar, o banco está configurado corretamente!

### 7️⃣ Configurações Adicionais

#### SSL/HTTPS (Obrigatório para produção)

1. **Ativar SSL Gratuito**
   - No hPanel, procure por "**SSL**"
   - Ative o certificado SSL gratuito (Let's Encrypt)
   - Aguarde alguns minutos para propagação

2. **Forçar HTTPS**
   - Edite o arquivo `.htaccess`
   - Descomente as linhas:
     ```apache
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
     ```

#### Configurar Domínio

1. **Página Inicial**
   - Se quiser que `landing.html` seja a página inicial:
   - No `.htaccess`, a linha já está configurada:
     ```apache
     DirectoryIndex landing.html index.html index.php
     ```

2. **Domínio Personalizado**
   - Configure seu domínio nas configurações da Hostinger
   - Aponte os DNS para os servidores da Hostinger

### 8️⃣ Otimizações de Performance

#### Ativar Cache

1. **No hPanel**
   - Procure por "**Cache**"
   - Ative o cache do servidor

2. **Verificar .htaccess**
   - O arquivo já possui configurações de cache
   - Configurações de GZIP já estão incluídas

#### Otimizar Imagens

1. **Comprimir Imagens**
   - Use ferramentas como TinyPNG
   - Comprima as imagens da pasta `pictures/`
   - Faça upload novamente

### 9️⃣ Segurança

#### Proteger Arquivos Sensíveis

O `.htaccess` já possui proteções para:
- Arquivos .sql
- Arquivos de configuração
- Pasta database/
- Pasta config/

#### Backup Regular

1. **Backup Automático**
   - Configure backups automáticos no hPanel
   - Recomendado: backup diário

2. **Backup Manual**
   - File Manager → Selecione tudo → Baixar
   - phpMyAdmin → Exportar banco de dados

### 🔟 Solução de Problemas

#### Erro 500 - Internal Server Error

**Causas:**
- Permissões incorretas
- Erro no .htaccess
- Erro no PHP

**Soluções:**
1. Verifique permissões (755 para pastas, 644 para arquivos)
2. Renomeie `.htaccess` temporariamente para testar
3. Verifique logs de erro no hPanel

#### Erro de Conexão com Banco

**Causas:**
- Credenciais incorretas
- Banco não criado
- Host incorreto

**Soluções:**
1. Verifique `api/config/database.php`
2. Confirme que o banco existe no phpMyAdmin
3. Teste credenciais no phpMyAdmin

#### Página em Branco

**Causas:**
- Erro PHP não exibido
- Arquivo não encontrado

**Soluções:**
1. Ative exibição de erros temporariamente:
   ```php
   ini_set('display_errors', 1);
   error_reporting(E_ALL);
   ```
2. Verifique logs de erro
3. Confirme que todos arquivos foram enviados

#### Imagens Não Aparecem

**Causas:**
- Caminho incorreto
- Permissões incorretas
- Arquivos não enviados

**Soluções:**
1. Verifique se a pasta `pictures/` existe
2. Confirme permissões 755
3. Verifique caminhos nos arquivos HTML

### 📞 Suporte

Se precisar de ajuda:

1. **Documentação Hostinger**
   - https://support.hostinger.com/pt-BR/

2. **Suporte Lumio Order**
   - Email: contato@lumioorder.com.br
   - Telefone: (11) 99999-9999

3. **Logs de Erro**
   - hPanel → Arquivos → Error Logs
   - Sempre verifique os logs para diagnóstico

### ✅ Checklist Final

Antes de colocar em produção, verifique:

- [ ] Banco de dados criado e importado
- [ ] Arquivos enviados corretamente
- [ ] Credenciais do banco configuradas
- [ ] Permissões corretas (755/644)
- [ ] SSL ativado e funcionando
- [ ] Login funcionando
- [ ] Todas as páginas carregando
- [ ] Imagens aparecendo
- [ ] Formulários funcionando
- [ ] Backup configurado
- [ ] Domínio configurado (se aplicável)

### 🎉 Pronto!

Seu sistema Lumio Order está instalado e funcionando!

Acesse: `https://seudominio.com/landing.html`

---

**Boa sorte com seu restaurante! 🍽️**
