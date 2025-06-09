document.addEventListener('DOMContentLoaded', function() {
    const pessoaButton = document.getElementById("pessoaButton");
    const estudButton = document.getElementById("estudanteButton");
    const btnCorner = document.getElementById("btnCorner");
    const cadPessoal = document.getElementById("cadPessoal");
    const cadEstudantil = document.getElementById("cadEstudantil");
    const itemCenter = document.querySelector(".item-center");
    const title = document.querySelector(".title");
    const popup = document.getElementById("popUp");
    const okConfirm = document.getElementById("okConfirm");
    
    const buttonsConfirm = document.querySelectorAll(".form-submit-button");

    function resetPopup() {
        popup.style.display = 'none';
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -100%)';
        popup.style.transition = 'none';
    }
    
    function init() {
        cadPessoal.style.display = 'none';
        cadEstudantil.style.display = 'none';
        btnCorner.style.display = 'none';
        resetPopup();
        pessoaButton.style.display = 'flex';
        estudButton.style.display = 'flex';
        itemCenter.style.flexDirection = 'row';
        title.textContent = 'Escolha o tipo de cadastro.';
    }


    function mostrarPessoa() {
        cadPessoal.style.display = 'block';
        cadEstudantil.style.display = 'none';
        pessoaButton.style.display = 'none';
        estudButton.style.display = 'none';
        btnCorner.style.display = 'block';
        itemCenter.style.flexDirection = 'column';
        title.textContent = 'Cadastro Pessoal';
    }

    function mostrarEstudante() {
        cadPessoal.style.display = 'none';
        cadEstudantil.style.display = 'block';
        pessoaButton.style.display = 'none';
        estudButton.style.display = 'none';
        btnCorner.style.display = 'block';
        itemCenter.style.flexDirection = 'column';
        title.textContent = 'Cadastro Estudantil';
    }

    function voltar() {
        cadPessoal.style.display = 'none';
        cadEstudantil.style.display = 'none';
        pessoaButton.style.display = 'flex';
        estudButton.style.display = 'flex';
        btnCorner.style.display = 'none';
        itemCenter.style.flexDirection = 'row';
        title.textContent = 'Escolha o tipo de cadastro.';
    }
    
    function abrirPopup(e) {
        e.preventDefault();
        resetPopup();
        void popup.offsetWidth;
        popup.style.display = 'block';
        popup.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
        
        setTimeout(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translate(-50%, -50%)';
        }, 10);
    }

    buttonsConfirm.forEach(button => {
        button.addEventListener('click', abrirPopup);
    });

    function RegisterSubmitted() {
        resetPopup();
        void popup.offsetWidth;
        popup.style.display = 'block';
        popup.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
        setTimeout(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translate(-50%, -50%)';
        }, 10);
    }

    function closePopup() {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -100%)';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 400);
    }

    buttonsConfirm.forEach(button => {
        button.addEventListener('click', RegisterSubmitted);
    });

    pessoaButton.addEventListener('click', mostrarPessoa);
    estudButton.addEventListener('click', mostrarEstudante);
    btnCorner.addEventListener('click', voltar);
    okConfirm.addEventListener('click', closePopup);

    init();
});