async function sendPDF() {
    const input = document.getElementById('pdfInput');
    const resultElement = document.getElementById('result');
    const loadingElement = document.getElementById('loading');

    if (!input.files.length) {
        alert('Por favor, selecione um arquivo.');
        return;
    }

    const formData = new FormData();
    formData.append('pdf', input.files[0]);

    loadingElement.style.display = 'block';
    resultElement.innerHTML = ''; 

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const data = await response.json();
        
        const fields = [
            { label: 'CNPJ do Emitente', value: data.cnpj || 'Não encontrado' },
            { label: 'Valor Total', value: `R$ ${data.valor || 'Não encontrado'}` },
            { label: 'Data de Emissão', value: data.data || 'Não encontrado' },
            { label: 'Chave de Acesso', value: data.chave_de_acesso || 'Não encontrada' },
            { label: 'Natureza da Operação', value: data.natureza_da_operacao || 'Não encontrada' }
        ];

        fields.forEach(field => {
            const dataLine = document.createElement('div');
            dataLine.classList.add('data-line');
            
            const label = document.createElement('span');
            label.classList.add('data-label');
            label.textContent = `${field.label}:`;
            
            const value = document.createElement('span');
            value.classList.add('data-value');
            value.textContent = field.value;

            dataLine.appendChild(label);
            dataLine.appendChild(value);
            resultElement.appendChild(dataLine);
        });

    } catch (error) {
        resultElement.textContent = `Erro ao processar o PDF: ${error.message}`;
        console.error("Erro:", error);
    } finally {
        loadingElement.style.display = 'none';
    }
}