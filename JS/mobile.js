document.addEventListener('DOMContentLoaded', function() {
    const MobNav = document.getElementById('mob-nav');
    const OpenNav = document.getElementById('opennav');
    const CloseNav = document.getElementById('closenav');
    const Overlay = document.getElementById('overlay');

    function openSidebar(){
        MobNav.classList.add('show');
        Overlay.style.display = 'block';
    }
    function closeSidebar(){
        MobNav.classList.remove('show');
        Overlay.style.display = 'none';
    }

    OpenNav.addEventListener('click', openSidebar);
    CloseNav.addEventListener('click', closeSidebar);
    Overlay.addEventListener('click', closeSidebar);
})