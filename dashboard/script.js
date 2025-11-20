/**
 * Lumio Order - Dashboard JavaScript
 * Sistema de Gestão para Restaurantes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação
    checkAuth();

    // Elementos
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Toggle sidebar desktop
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
    }

    // Toggle sidebar mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Fechar sidebar ao clicar em item no mobile
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 968) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Deseja realmente sair do sistema?')) {
                localStorage.removeItem('lumioUser');
                localStorage.removeItem('lumioRemember');
                window.location.href = '../login/';
            }
        });
    }

    // Restaurar estado do sidebar
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
    if (sidebarCollapsed === 'true') {
        sidebar.classList.add('collapsed');
    }

    // Carregar dados do usuário
    loadUserData();

    // Inicializar gráfico (simulado)
    initChart();

    // Atualizar horário em tempo real
    updateClock();
    setInterval(updateClock, 1000);

    // Simular atualizações em tempo real
    simulateRealTimeUpdates();
});

/**
 * Verificar autenticação
 */
function checkAuth() {
    const user = localStorage.getItem('lumioUser');
    
    if (!user) {
        // Redirecionar para login se não estiver autenticado
        window.location.href = '../login/';
        return;
    }

    // Verificar se a sessão não expirou (opcional)
    const remember = localStorage.getItem('lumioRemember');
    if (!remember) {
        // Aqui você pode adicionar lógica de expiração de sessão
    }
}

/**
 * Carregar dados do usuário
 */
function loadUserData() {
    const userJson = localStorage.getItem('lumioUser');
    
    if (userJson) {
        try {
            const user = JSON.parse(userJson);
            
            // Atualizar nome e cargo
            const userName = document.getElementById('userName');
            const userRole = document.getElementById('userRole');
            
            if (userName) userName.textContent = user.name || 'Usuário';
            if (userRole) {
                const roleMap = {
                    'admin': 'Administrador',
                    'gerente': 'Gerente',
                    'garcom': 'Garçom',
                    'cozinha': 'Cozinha',
                    'caixa': 'Caixa'
                };
                userRole.textContent = roleMap[user.role] || user.role;
            }

            console.log('Usuário logado:', user.name);
        } catch (e) {
            console.error('Erro ao carregar dados do usuário:', e);
        }
    }
}

/**
 * Inicializar gráfico
 */
function initChart() {
    const canvas = document.getElementById('salesChart');
    
    if (!canvas) return;

    // Aqui você pode usar Chart.js ou outra biblioteca
    // Por enquanto, vamos apenas mostrar um placeholder
    const ctx = canvas.getContext('2d');
    
    // Desenhar um gráfico simples como exemplo
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;
    
    ctx.fillStyle = '#F8F9FA';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar linhas de grade
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 6; i++) {
        const y = (canvas.height / 6) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Desenhar linha do gráfico
    ctx.strokeStyle = '#FF6B35';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const points = [
        { x: 0.1, y: 0.6 },
        { x: 0.2, y: 0.4 },
        { x: 0.35, y: 0.5 },
        { x: 0.5, y: 0.3 },
        { x: 0.65, y: 0.45 },
        { x: 0.8, y: 0.25 },
        { x: 0.95, y: 0.35 }
    ];
    
    points.forEach((point, index) => {
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Desenhar pontos
    ctx.fillStyle = '#FF6B35';
    points.forEach(point => {
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Adicionar texto
    ctx.fillStyle = '#7F8C8D';
    ctx.font = '14px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Gráfico de vendas dos últimos 7 dias', canvas.width / 2, canvas.height / 2);
}

/**
 * Atualizar relógio
 */
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Você pode adicionar um elemento de relógio no topbar se desejar
    // document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

/**
 * Simular atualizações em tempo real
 */
function simulateRealTimeUpdates() {
    // Simular novos pedidos a cada 10 segundos
    setInterval(() => {
        const notificationBtn = document.querySelector('.notification-btn .badge');
        if (notificationBtn) {
            const currentCount = parseInt(notificationBtn.textContent) || 0;
            const newCount = currentCount + 1;
            notificationBtn.textContent = newCount;
            
            // Mostrar notificação visual
            showNotification('Novo pedido recebido!', 'info');
        }
    }, 10000);

    // Atualizar estatísticas aleatoriamente
    setInterval(() => {
        updateStats();
    }, 5000);
}

/**
 * Atualizar estatísticas
 */
function updateStats() {
    // Simular mudança nas estatísticas
    const stats = document.querySelectorAll('.stat-info h3');
    
    stats.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        
        if (!isNaN(currentValue) && Math.random() > 0.7) {
            const change = Math.random() > 0.5 ? 1 : -1;
            const newValue = Math.max(0, currentValue + change);
            
            // Animar mudança
            stat.style.transform = 'scale(1.1)';
            stat.style.color = change > 0 ? '#27AE60' : '#E74C3C';
            
            setTimeout(() => {
                stat.textContent = stat.textContent.includes('R$') ? `R$ ${newValue}` : newValue;
                stat.style.transform = 'scale(1)';
                stat.style.color = '';
            }, 300);
        }
    });
}

/**
 * Mostrar notificação
 */
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Funções utilitárias para interação com API (preparadas para implementação futura)
 */

// Função para buscar dados do dashboard
async function fetchDashboardData() {
    try {
        const response = await fetch('../api/dashboard.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Adicionar token de autenticação se necessário
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar dados');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao carregar dados', 'error');
        return null;
    }
}

// Função para atualizar status de mesa
async function updateMesaStatus(mesaId, status) {
    try {
        const response = await fetch('../api/mesas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'update_status',
                mesa_id: mesaId,
                status: status
            })
        });

        const data = await response.json();
        
        if (data.success) {
            showNotification('Status atualizado com sucesso!', 'success');
        } else {
            showNotification('Erro ao atualizar status', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao atualizar status', 'error');
    }
}

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .menu-item {
        position: relative;
        overflow: hidden;
    }

    .menu-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.5s;
    }

    .menu-item:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(style);

// Log de inicialização
console.log('Dashboard Lumio Order carregado com sucesso!');
console.log('Versão: 1.0.0');
