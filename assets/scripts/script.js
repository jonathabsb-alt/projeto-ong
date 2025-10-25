
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
    const cartaoInput = document.getElementById('numero-cartao');

    if (cpfInput)  mascararCampo(cpfInput,  '###.###.###-##');    
    if (cepInput)  mascararCampo(cepInput,  '#####-###');          
    if (cartaoInput) {
        mascararCampo(cartaoInput, '#### #### #### ####'); 
    }

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

function configurarDetalhesProjeto() {
    const botoesToggle = document.querySelectorAll('.toggle-detalhes');

    botoesToggle.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const idProjeto = e.target.getAttribute('data-target');
            
            const projetoDetalhes = document.getElementById(idProjeto).querySelector('.projeto-detalhes');
            
            if (projetoDetalhes.style.display === 'none') {
                projetoDetalhes.style.display = 'block';
                e.target.textContent = 'Ocultar Detalhes';
            } else {
                projetoDetalhes.style.display = 'none';
                e.target.textContent = 'Ver Mais Detalhes';
            }
        });
    });
}

function configurarValidacaoEmTempoReal() {
    const emailInput = document.getElementById('email');
    const emailErroSpan = document.getElementById('email-erro');

    if (emailInput) {
        
        emailInput.addEventListener('input', () => {
            
            
            if (emailInput.validity.valid) {
                
                emailErroSpan.textContent = '';
            } else {
                
                if (emailInput.validity.valueMissing) {
                    emailErroSpan.textContent = 'O campo E-mail é obrigatório.';
                } else if (emailInput.validity.typeMismatch) {
                    emailErroSpan.textContent = 'Por favor, insira um endereço de e-mail válido.';
                } else {
                    emailErroSpan.textContent = 'E-mail inválido.';
                }
            }
        });
        
        
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', () => {
                if (!cpfInput.validity.valid && cpfInput.value.length > 0) {
                    cpfInput.setCustomValidity("Formato de CPF deve ser 000.000.000-00.");
                } else {
                    cpfInput.setCustomValidity(""); 
                }
            });
        }
    }
}

function configurarDoacao() {
    const formDoacao = document.getElementById('form-doacao');

    if (formDoacao) {
        formDoacao.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            if (!formDoacao.checkValidity()) {
                formDoacao.reportValidity();
                return;
            }

            
            const valorInput = document.getElementById('valor-doacao');
            const valor = parseFloat(valorInput.value);
            
            if (isNaN(valor) || valor < 5) {
                alert('O valor mínimo para doação é de R$ 5,00. Por favor, ajuste o valor.');
                valorInput.focus();
                return;
            }

            
            const valorFormatado = valor.toLocaleString('pt-BR', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });
            
            alert(`🎉 Doação de R$ ${valorFormatado} efetuada com sucesso! \n\nMuito obrigado por seu apoio!`);
            
            
            formDoacao.reset();
        });
    }
}

function configurarValidacaoValorDoacao() {
    const valorInput = document.getElementById('valor-doacao');
    const valorErroSpan = document.getElementById('valor-erro');
    const valorMinimo = 5;

    if (valorInput) {
        valorInput.addEventListener('input', () => {
            const valor = parseFloat(valorInput.value);


            if (valorInput.validity.valid) {

                if (valor < valorMinimo && valorInput.value.length > 0) {
                    valorErroSpan.textContent = `O valor mínimo para doação é R$ ${valorMinimo.toFixed(2).replace('.', ',')}.`;
                    valorInput.style.border = '2px solid red'; 
                    valorErroSpan.textContent = '';
                    valorInput.style.border = ''; 
                }
            } else {
                
                if (valorInput.validity.valueMissing) {
                    valorErroSpan.textContent = 'Este campo é obrigatório.';
                } else if (valorInput.validity.badInput) {
                     valorErroSpan.textContent = 'Por favor, insira um número válido.';
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM totalmente carregado e pronto para a interação.");
    aplicarMascaras();
    atualizarProgressoCampanha();
    configurarDetalhesProjeto();
    configurarValidacaoEmTempoReal();
    configurarDoacao();
    configurarValidacaoValorDoacao();
});

