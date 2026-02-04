// Variável para controlar o observador de memória
let imageObserver;

function abrir(titulo, tag, fotos) {
    const modal = document.getElementById('modal-projeto');
    const galeria = document.getElementById('m-galeria');
    
    document.getElementById('m-titulo').innerText = titulo;
    document.getElementById('m-tag').innerText = tag;
    
    // 1. Limpeza total antes de abrir para não acumular lixo na memória
    galeria.innerHTML = '';

    // 2. Configura o Observador Inteligente
    imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src; // Só baixa a foto quando ela aparece
                    img.removeAttribute('data-src');
                }
            }
        });
    }, { root: galeria, threshold: 0.1 });

    // 3. Cria as imagens de forma leve
    fotos.forEach(src => {
        const img = document.createElement('img');
        img.dataset.src = 'assets/' + src; // Caminho fica guardado aqui
        img.alt = titulo;
        
        // Placeholder: evita que o layout pule enquanto carrega
        img.style.backgroundColor = '#111'; 
        img.style.minWidth = '100%';
        
        galeria.appendChild(img);
        imageObserver.observe(img);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    galeria.scrollLeft = 0;
}

function fechar() {
    document.getElementById('modal-projeto').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // 4. Mata o processo ao fechar para o site voltar a ficar leve
    if(imageObserver) imageObserver.disconnect();
    document.getElementById('m-galeria').innerHTML = '';
}

function move(dir) {
    const galeria = document.getElementById('m-galeria');
    // Move exatamente a largura de um card por vez
    galeria.scrollBy({ left: dir * galeria.offsetWidth, behavior: 'smooth' });
}