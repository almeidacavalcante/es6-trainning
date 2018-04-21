class TransactionsView {

    constructor(){
        this._viewLocation = document.querySelector('#transactions-view');

    }

    update(transactionList){
        this._viewLocation.innerHTML = this._template(transactionList);
    }

    _template(transactionList){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${transactionList.map(transaction => `
                    
                    <tr>
                        <td>${transaction.stringDate}</td>
                        <td>${transaction.quantity}</td>
                        <td>${transaction.value}</td>
                        <td>${transaction.volume}</td>
                    </tr>
                    
                `).join('')}
            </tbody>
            
            <tfoot>
            </tfoot>
        </table>
        
        `;
    }

    _generateTr(transactionList){
        console.log(transactionList);
        
        transactionList.forEach(transaction => {
            let tr = document.createElement('tr');
       
            
            let tdDate = this._generateTd(transaction.stringDate);
            let tdQuantity = this._generateTd(transaction.quantity);
            let tdValue = this._generateTd(transaction.value);
            let tdVolume = this._generateTd(transaction.volume);

            tr.appendChild(tdDate);
            tr.appendChild(tdQuantity);
            tr.appendChild(tdValue);
            tr.appendChild(tdVolume);

            let tbody = document.querySelector('table tbody');
            tbody.appendChild(tr);
        });
    }

    _generateTd(value){
        let td = document.createElement('td');
        td.textContent = value;
        return td
    }
}