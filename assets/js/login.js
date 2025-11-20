/**
 * Lumio Order - Login Page JavaScript
 * Sistema de Gestão para Restaurantes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const errorAlert = document.getElementById('errorAlert');
    const successAlert = document.getElementById('successAlert');
    const signupLink = document.getElementById('signupLink');
    const demoModal = document.getElementById('demoModal');
    const closeModal = document.getElementById('closeModal');
    const demoForm = document.getElementById('demoForm');

    // Toggle visibilidade da senha
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Alterar ícone
            const svg = this.querySelector('svg');
            if (type === 'text') {
                svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            }
        });
    }

    // Submissão do formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpar alertas anteriores
            hideAlerts();
            
            // Obter valores
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Validação básica
            if (!email || !password) {
                showError('Por favor, preencha todos os campos.');
                return;
            }
            
            // Desabilitar botão durante o processo
            const submitButton = this.querySelector('.btn-submit');
            const originalHTML = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Entrando...</span>';
            submitButton.disabled = true;
            
            // Simular autenticação (substituir por chamada real à API)
            setTimeout(() => {
                // Credenciais de demonstração
                if (email === 'admin@lumio.com' && password === 'admin123') {
                    showSuccess('Login realizado com sucesso! Redirecionando...');
                    
                    // Salvar sessão
                    if (remember) {
                        localStorage.setItem('lumioRemember', 'true');
                    }
                    localStorage.setItem('lumioUser', JSON.stringify({
                        email: email,
                        name: 'Administrador',
                        role: 'admin'
                    }));
                    
                    // Redirecionar após 1 segundo
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else if (email === 'demo@lumio.com' && password === 'demo123') {
                    showSuccess('Login realizado com sucesso! Redirecionando...');
                    
                    if (remember) {
                        localStorage.setItem('lumioRemember', 'true');
                    }
                    localStorage.setItem('lumioUser', JSON.stringify({
                        email: email,
                        name: 'Usuário Demo',
                        role: 'user'
                    }));
                    
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    showError('Email ou senha incorretos. Tente novamente.');
                    submitButton.innerHTML = originalHTML;
                    submitButton.disabled = false;
                }
            }, 1500);
        });
    }

    // Abrir modal de demonstração
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            demoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Fechar modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            demoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Fechar modal ao clicar fora
    if (demoModal) {
        demoModal.addEventListener('click', function(e) {
            if (e.target === demoModal) {
                demoModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Submissão do formulário de demonstração
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.btn-submit');
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simular envio
            setTimeout(() => {
                alert('Obrigado! Nossa equipe entrará em contato em breve.');
                demoModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                demoForm.reset();
                submitButton.textContent = 'Solicitar Demonstração';
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Funções auxiliares
    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';
        successAlert.style.display = 'none';
        
        // Animar
        errorAlert.style.animation = 'slideIn 0.3s ease';
    }

    function showSuccess(message) {
        successAlert.textContent = message;
        successAlert.style.display = 'block';
        errorAlert.style.display = 'none';
        
        // Animar
        successAlert.style.animation = 'slideIn 0.3s ease';
    }

    function hideAlerts() {
        errorAlert.style.display = 'none';
        successAlert.style.display = 'none';
    }

    // Verificar se já está logado
    const loggedUser = localStorage.getItem('lumioUser');
    if (loggedUser) {
        const remember = localStorage.getItem('lumioRemember');
        if (remember === 'true') {
            // Redirecionar automaticamente se "lembrar-me" estava marcado
            // window.location.href = 'dashboard.html';
        }
    }

    // Animação de entrada nos campos
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Máscara de telefone no modal
    const telInput = demoModal.querySelector('input[type="tel"]');
    if (telInput) {
        telInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }
            
            e.target.value = value;
        });
    }

    console.log('Sistema de login carregado - Lumio Order');
    console.log('Credenciais de teste:');
    console.log('Admin: admin@lumio.com / admin123');
    console.log('Demo: demo@lumio.com / demo123');
});

// Animação CSS adicional
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
