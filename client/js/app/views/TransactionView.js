class TransactionView extends View {

    constructor(element){
        super(element);
    }

    template(model){
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
                ${model.transactions.map(transaction => `
                    
                    <tr>
                        <td>${transaction.stringDate}</td>
                        <td>${transaction.quantity}</td>
                        <td>${transaction.value}</td>
                        <td>${transaction.volume}</td>
                    </tr>
                    
                `).join('')}
            </tbody>
            
            <tfoot>
                <tr>
                    <td colspan='3'></td>
                    <td>
                        ${model.transactions.reduce((total, n) => total + n.volume, 0.0)}
                    </td>


                </tr>
            </tfoot>
        </table>
        
        `;
    }

    _generateTr(model){
        console.log(model);
        
        model.forEach(transaction => {
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