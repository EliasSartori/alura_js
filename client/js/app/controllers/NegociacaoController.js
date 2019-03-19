class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'add', 'esvazia'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'add', 'esvazia', 'ordena', 'inverteOrdem');

        this._ordemAtual = '';
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso!"
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.add(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._limpaFormulario();
    }

    importaNegociacoes() {

        let service = new NegociacaoService();
        service
            .obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.add(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso!';
            })
            .catch(error => this._mensagem.texto = error);
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
            this._mensagem.texto = "Negociações ordenadas na decresente!";
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
            this._mensagem.texto = "Negociações ordenadas na acrescente!";
        }
        this._ordemAtual = coluna;
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}