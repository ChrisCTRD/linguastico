// Função para obter variáveis CSS
function cssvar(root) {
    return getComputedStyle(document.documentElement).getPropertyValue(root).trim();
}

// Dados para os gráficos
const xCursos = ["Inglês", "Francês", "Espanhol", "Japonês", "Coreano"];
const yValuesCursos = [55, 49, 44, 24, 15];
const barColorsCursos = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

const xMedia = ["2020", "2021", "2022", "2023"];
const yValuesMedia = [2500, 2800, 3200, 3500];
const barColorsMedia = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"];

// Gráfico de Doughnut (Cursos)
function createCursosChart() {
    const ctx = document.getElementById('CursosChart');
    if (!ctx) {
        console.error('Elemento CursosChart não encontrado');
        return;
    }

    new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: xCursos,
            datasets: [{
                data: yValuesCursos,
                backgroundColor: barColorsCursos,
                borderColor: cssvar('--base-variant'),
                borderWidth: 1
            }]
        },
        options: getChartOptions('Distribuição de Alunos por Curso')
    });
}

function createRendaMediaChart() {
    const ctx = document.getElementById('RendaMedia');
    if (!ctx) {
        console.error('Elemento RendaMedia não encontrado');
        return;
    }

    // Restaurando as faixas originais
    const xMedia = ["0-399", "400-899", "900-1199", "1200+"];
    const yValuesMedia = [15, 25, 10, 5]; // Valores de exemplo - ajuste conforme seus dados
    
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: xMedia,
            datasets: [{
                label: 'Quantidade de Alunos',
                data: yValuesMedia,
                backgroundColor: barColorsMedia,
                borderColor: cssvar('--navtext-color'),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Média Salarial',
                    color: cssvar('--navtext-color'),
                    font: { size: 16 }
                },
                legend: {
                    labels: {
                        color: cssvar('--navtext-color'),
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    titleColor: cssvar('--navtext-color'),
                    bodyColor: cssvar('--navtext-color'),
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: cssvar('--navtext-color') // Cor dos números no eixo X
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: cssvar('--navtext-color'), // Cor dos números no eixo Y
                        callback: function(value) {
                            return value; // Mostra os valores originais
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Configurações comuns para ambos os gráficos
function getChartOptions(title) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title,
                color: cssvar('--navtext-color'),
                font: { size: 16 }
            },
            legend: {
                labels: {
                    color: cssvar('--navtext-color'),
                    font: { size: 12 }
                }
            },
            tooltip: {
                titleColor: cssvar('--navtext-color'),
                bodyColor: cssvar('--navtext-color'),
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }
        }
    };
}

// Inicializa os gráficos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    createCursosChart();  // Mudado de createAlunosChart para createCursosChart
    createRendaMediaChart();
    
    // Observador para dark mode
    new MutationObserver(() => {
        createCursosChart();
        createRendaMediaChart();
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
});