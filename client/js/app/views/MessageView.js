class MessageView extends View{

    constructor(element){
        super(element);
    }

    template(model) {

        this._fadeOut();
        this._element.classList.add('fadeIn');
        return `<p class="alert alert-info">${model.text}</p>`;
    }



    _fadeOut(){

        setTimeout(() => {
            this._element.classList.remove('fadeIn');
            this._element.classList.add('fadeOut');
        }, 4000);
    }
}