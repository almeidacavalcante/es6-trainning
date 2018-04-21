class MessageView {

    _template(model) {
        debugger
        return `<p class="alert alert-info">${model.text}</p>`;

    }

    update(model) {
        document.querySelector('#message-view').innerHTML = this._template(model);
    }
}