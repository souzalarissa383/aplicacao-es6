import api from './api';


class App{
    constructor(){
        this.repositories = [];

        //referencia ao formulario
        this.formEl = document.getElementById('repo-form');
         //registrar referencia do input
        this.inputEl = document.querySelector('input[name=repository]');

        //registrar referencia da ul repo-list
        this.listEl = document.getElementById('repo-list');

        //registrar os eventos
        this.registerHandlers();

    }

//registrar eventos
    registerHandlers() {
        // arrow function
        this.formEl.onsubmit =  event  => this.addRepository(event);
    }
//funcao que irá receber a informacao de login true ou false
    setLoading(loading = true) {
        // elemento para carregar tela
        if (loading === true) {
            //exibir elemento em tela com mensagem 
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando!!!'));

            loadingEl.setAttribute('id', 'loading');

            //acionar elemento do form
            this.formEl.appendChild(loadingEl);
        } else {
            //apagar elemento da tela
            document.getElementById('loading').remove();
        }
    }
//Adicionar repositorio dentro do array
    async addRepository(event){
        event.preventDefault();
//
        const repoInput = this.inputEl.value;

        if (repoInput.length === 0)
            return;

        this.setLoading();


        try {
        const response = await api.get(`/repos/${repoInput}`);

        const { name, description, html_url, owner: { avatar_url } } = response.data;

        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url,
        });

        this.inputEl.value = ' ';

       this.render();

        } catch (err) {
            alert('O repositório não existe!');
        }
        this.setLoading(false);

    }
    //A função do metodo render é apagar todo conteudo da lista e renderizar tudo do zero 
    render(){
        this.listEl.innerHTML = ' ';
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);

        });
    }
}

new App();
