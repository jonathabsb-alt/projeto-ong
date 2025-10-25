
console.log("Script.js carregado com sucesso! Iniciando funcionalidades dinâmicas...");

function aplicarMascara(digitos, mascara) {
    let i = 0, out = '';
    for (const ch of mascara) {
        if (ch === '#') {
        if (i >= digitos.length) break;
        out += digitos[i++];
        } else {
        if (i < digitos.length) out += ch;
        }
    }
    return out;
}


function mascararCampo(campo, mascaraOuFn) {
    campo.addEventListener('input', (e) => {
        const somenteDigitos = e.target.value.replace(/\D/g, '');
        const mascara = typeof mascaraOuFn === 'function'
        ? mascaraOuFn(somenteDigitos)
        : mascaraOuFn;
        e.target.value = aplicarMascara(somenteDigitos, mascara);
    });
}

function aplicarMascaras() {
    const cpfInput = document.getElementById('cpf');
    const telInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');

    if (cpfInput)  mascararCampo(cpfInput,  '###.###.###-##');    
    if (cepInput)  mascararCampo(cepInput,  '#####-###');          

    if (telInput) {
        
        mascararCampo(telInput, (digs) => digs.length > 10
        ? '(##) #####-####'
        : '(##) ####-####'
        );
    }
}

function atualizarProgressoCampanha() {
    
    const meta = 10000; 
    
    
    const valorArrecadado = 7350; 

    
    let porcentagem = (valorArrecadado / meta) * 100;
    if (porcentagem > 100) porcentagem = 100;

    
    const formatarBRL = (valor) => valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    
    const metaElemento = document.getElementById('meta-valor');
    const arrecadadoElemento = document.getElementById('arrecadado-valor');
    const barraProgresso = document.getElementById('progresso-preenchimento');
    const porcentagemElemento = document.getElementById('progresso-porcentagem');

    if (metaElemento && arrecadadoElemento && barraProgresso && porcentagemElemento) {
        metaElemento.textContent = formatarBRL(meta);
        arrecadadoElemento.textContent = formatarBRL(valorArrecadado);

        barraProgresso.style.width = porcentagem.toFixed(2) + '%';
        porcentagemElemento.textContent = porcentagem.toFixed(2) + '% concluído';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM totalmente carregado e pronto para a interação.");
    aplicarMascaras();
    atualizarProgressoCampanha()
});

