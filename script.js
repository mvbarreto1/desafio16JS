async function obterCotacaoMoeda(moedaBase, moedaDestino) {
    const url = `https://open.er-api.com/v6/latest/${moedaBase}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }

        const data = await response.json();
        if (!data.rates || !data.rates[moedaDestino]) {
            throw new Error(`Moeda de destino "${moedaDestino}" não encontrada.`);
        }

        return data.rates[moedaDestino];

    } catch (error) {
        console.error(error);
        throw error; 
    }
}


async function converterMoeda(event) {
    event.preventDefault();
    const moedaBase = document.getElementById('moedaBase').value;
    const moedaDestino = document.getElementById('moedaDestino').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const resultadoDiv = document.getElementById('resultado');

    try {
        const taxa = await obterCotacaoMoeda(moedaBase, moedaDestino);
        const valorConvertido = valor * taxa;
        resultadoDiv.textContent = `R$ ${valor} ${moedaBase} é equivalente a € ${valorConvertido.toFixed(2)} ${moedaDestino}`;
    } catch (error) {
        resultadoDiv.textContent = 'Erro na conversão: ' + error.message;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('converter-form').addEventListener('submit', converterMoeda);
});

