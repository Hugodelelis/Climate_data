export async function savePDF() {
    const report = document.querySelector("#report");

    const options = {
        margin: [5, 5, 5, 5],
        filename: 'Relatiorio-climatico' + '.pdf',
        html2canvas: { 
            scale: 2, 
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'landscape',
        }
    };

    try {
        await html2pdf().set(options).from(report).save();
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
    }
}

