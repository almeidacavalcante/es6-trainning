class TransactionView extends View {

    constructor(element){
        super(element);
    }

    template(model){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="transactionController.sort('date')">DATA</th>
                    <th onclick="transactionController.sort('quantity')">QUANTIDADE</th>
                    <th onclick="transactionController.sort('value')">VALOR</th>
                    <th onclick="transactionController.sort('volume')">VOLUME</th>
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
                        ${model.totalVolume}
                    </td>


                </tr>
            </tfoot>
        </table>
        
        `;
    }
}