document.addEventListener("DOMContentLoaded", function() {
    let allData = []; // Armazenará todos os dados
    let currentPage = 1;
    const itemsPerPage = 10; // Itens por página

    fetch('alunos.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            populateTable(data);
            setupFilters(data);
            updatePaginationControls(data.length);
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error)
        });

    // Função para popular a tabela com dados
    function populateTable(data) {
        const tbody = document.querySelector('#alunos tbody');
        // Limpa apenas as linhas de dados, mantendo o cabeçalho
        while (tbody.children.length > 1) {
            tbody.removeChild(tbody.lastChild);
        }

        // Calcula os itens para a página atual
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        paginatedData.forEach(item => {
            const tr = document.createElement('tr');
            ['id', 'nome', 'data_nascimento', 'ra', 'curso', 'turno', 'cidade'].forEach(field => {
                const td = document.createElement('td');
                td.textContent = item[field];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    // Configura os filtros
    function setupFilters(data) {
        // Preenche opções dos selects
        const cursos = [...new Set(data.map(item => item.curso))];
        const turnos = [...new Set(data.map(item => item.turno))];
        
        const cursoFilter = document.getElementById('cursoFilter');
        const turnoFilter = document.getElementById('turnoFilter');
        
        cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso;
            option.textContent = curso;
            cursoFilter.appendChild(option);
        });
        
        turnos.forEach(turno => {
            const option = document.createElement('option');
            option.value = turno;
            option.textContent = turno;
            turnoFilter.appendChild(option);
        });

        // Adiciona eventos aos filtros
        document.getElementById('searchInput').addEventListener('input', applyFilters);
        cursoFilter.addEventListener('change', applyFilters);
        turnoFilter.addEventListener('change', applyFilters);
    }

    // Aplica todos os filtros
    function applyFilters() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const curso = document.getElementById('cursoFilter').value;
        const turno = document.getElementById('turnoFilter').value;

        const filteredData = allData.filter(item => {
            const matchesSearch = 
                item.nome.toLowerCase().includes(searchTerm) ||
                item.ra.toLowerCase().includes(searchTerm) ||
                item.cidade.toLowerCase().includes(searchTerm);
            
            const matchesCurso = curso ? item.curso === curso : true;
            const matchesTurno = turno ? item.turno === turno : true;
            
            return matchesSearch && matchesCurso && matchesTurno;
        });

        currentPage = 1; // Reset para a primeira página
        populateTable(filteredData);
        updatePaginationControls(filteredData.length);
    }

    // Atualiza controles de paginação
    function updatePaginationControls(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        document.getElementById('pageInfo').textContent = 
            `Página ${currentPage} de ${totalPages}`;
        
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
    }

    document.getElementById('prevPage').addEventListener('click', () => {
        const filteredData = getFilteredData();
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        
        if (currentPage > 1) {
            currentPage--;
            populateTable(filteredData);
            updatePaginationControls(filteredData.length);
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', () => {
        const filteredData = getFilteredData();
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        
        if (currentPage < totalPages) {
            currentPage++;
            populateTable(filteredData);
            updatePaginationControls(filteredData.length);
        }
    });

    function getFilteredData() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const curso = document.getElementById('cursoFilter').value;
        const turno = document.getElementById('turnoFilter').value;
    
        return allData.filter(item => {
            const matchesSearch = 
                item.nome.toLowerCase().includes(searchTerm) ||
                item.ra.toLowerCase().includes(searchTerm) ||
                item.cidade.toLowerCase().includes(searchTerm);
            
            const matchesCurso = curso ? item.curso === curso : true;
            const matchesTurno = turno ? item.turno === turno : true;
            
            return matchesSearch && matchesCurso && matchesTurno;
        });
    }
    
    function applyFilters() {
    const filteredData = getFilteredData();
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage > totalPages) {
        currentPage = Math.max(1, totalPages);
    }
    populateTable(filteredData);
    updatePaginationControls(filteredData.length);
}
});