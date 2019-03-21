class View {

    constructor(elemento){
        this._elemento = elemento;
    }

    template(){
        throw new Error('A classe template() deve ser implementada!');
    }

    update(model){
        this._elemento.innerHTML = this.template(model);
    }

}