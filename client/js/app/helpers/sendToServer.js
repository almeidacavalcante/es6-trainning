
let $ = document.querySelector.bind(document);
//aqui você deve ler os dados do formulário
let inputDate = $('#data');
let inputQuantity = $('#quantidade');
let inputValue = $('#valor');

function sendPost(event) {

    event.preventDefault();
    
    //construir o json
    let transaction = {
        data: inputDate.value,
        quantidade: inputQuantity.value,
        valor: inputValue.value
    }

    let http = new HttpService();
    http.post('negociacoes', transaction).then((resolve, rejact) => {
        clearForm();
    })
}

function clearForm(){       
    inputDate.value = '';
    inputQuantity.value = 1;
    inputValue.value = 0.0;

    inputDate.focus();
}
