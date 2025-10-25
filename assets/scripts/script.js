
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

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM totalmente carregado e pronto para a interação.");
    aplicarMascaras();
});

