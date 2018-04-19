
// Select the fields
// Create the TR element
// Insert the fields on the TR
// Clear the form and put the focus on the date


var fields = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

var tbody = document.querySelector('table tbody');
console.log(tbody);

var form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    var tr = setupTrWithFields(fields);
    console.log(tr);
    
    tbody.appendChild(tr);
    setDefaultValues(fields);
})



function setDefaultValues(fields) {
    fields[0].value = '';
    fields[1].value = 1;
    fields[2].value = 0.0; 

    fields[0].focus();
}

function setupTrWithFields(fields){
    var tr = document.createElement('tr');
    console.log(fields);
    
    fields.forEach(field => {
        var td = document.createElement('td');
        td.textContent = field.value;
        tr.appendChild(td);
    });

    var tdVolume = document.createElement('td');
    tdVolume.textContent = fields[1].value * fields[2].value;

    tr.appendChild(tdVolume);

    return tr;
}

