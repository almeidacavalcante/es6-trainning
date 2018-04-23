class MessageView extends View{

    constructor(element){
        super(element);
    }

    template(model) {
        if(!model.text == ''){
            this._fadeOut();
            this._element.classList.add('fadeIn');
            return `<p class="alert alert-info">${model.text}</p>`;
        }
        return '';
    }


    _fadeOut(){
        setTimeout(() => {
            this._element.classList.remove('fadeIn');
            this._element.classList.add('fadeOut');
        }, 4000);
    }
}