document.getElementById("formNovaTriagem").addEventListener('submit', e =>{
    e.preventDefault()
    const valor = document.getElementById("data_triagem").value;
    const dataTrigem = new Date(valor + "T00:00:00").toISOString();
    
})