const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(fileUpload());

app.post('/upload', async (req, res) => {
    if (!req.files || !req.files.pdf) {
        return res.status(400).send('Nenhum arquivo enviado.');
    }

    const pdfFile = req.files.pdf;
    const path = `./${pdfFile.name}`;

    try {
        await pdfFile.mv(path);
        const dataBuffer = fs.readFileSync(path);
        const data = await pdfParse(dataBuffer);

        const text = data.text;
        
        const regexCnpjEmitente = /DANFE[\s\S]*?CNPJ[\s\S]*?([\d]{2}\.[\d]{3}\.[\d]{3}\/[\d]{4}\-[\d]{2})/i;
        
        const regexValor = /(?:VALOR TOTAL DA NOTA|VALOR TOTAL DOS PRODUTOS)[\s\S]*?([\d.,]+)/i;
        
        const regexData = /(?:DATA DA EMISSÃO|DATA EMISSÃO)[\s\S]*?(\d{2}\/\d{2}\/\d{4})/;

        const regexChave = /CHAVE DE ACESSO[\s\S]*?(\d[\s\d]{54})/i;

        const regexNatureza = /NATUREZA DA OPERAÇÃO[\s\S]*?([^\n]+)/i;

        const rawChave = text.match(regexChave)?.[1] || null;

        const result = {
            cnpj: text.match(regexCnpjEmitente)?.[1] || null,
            valor: text.match(regexValor)?.[1] || null,
            data: text.match(regexData)?.[1] || null,
            chave_de_acesso: rawChave ? rawChave.replace(/\s/g, '') : null,
            natureza_da_operacao: text.match(regexNatureza)?.[1]?.trim() || null
        };
        
        fs.unlinkSync(path);
        res.json(result);

    } catch (error) {
        console.error("Erro ao processar PDF:", error);
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
        res.status(500).send("Erro ao processar o PDF.");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});