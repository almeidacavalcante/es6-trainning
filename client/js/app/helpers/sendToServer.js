function sendPost(event) {

    event.preventDefault();

    let $ = document.querySelector.bind(document);
    //aqui você deve ler os dados do formulário
    let inputDate = $('#data');
    let inputQuantity = $('#quantidade');
    let inputValue = $('#valor');

    //construir o json
    let transaction = {
        data: inputDate.value,
        quantidade: inputQuantity.value,
        valor: inputValue.value
    }

    console.log(transaction);
    

    //enviar o XMLHttpReques
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'negociacoes', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log('Connected');
                inputDate.value = '';
                inputQuantity.value = 1;
                inputValue.value = 0.0;
            
                inputDate.focus();
            }else{
                console.log(`Não foi possível enviar a negociação: ${xhr.responseText}`);
            }
        }
    }
    let jsonString = JSON.stringify(transaction);
    console.log(jsonString);
    
    xhr.send(jsonString);
}

function toString(date){
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}