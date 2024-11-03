export async function showState() {
    const resp = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    const data = await resp.json()
    const select = document.querySelector('#state')

    data.map(obj => {
        select.innerHTML += `<option value="${obj.sigla}">${obj.nome}</option>`
    }) 
}

