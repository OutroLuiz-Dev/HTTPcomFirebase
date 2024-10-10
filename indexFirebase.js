import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvYT93c2tSFQ8iyvqprDpWVIMtHtuTgmA",
    authDomain: "honorina-82a7c.firebaseapp.com",
    databaseURL: "https://honorina-82a7c-default-rtdb.firebaseio.com",
    projectId: "honorina-82a7c",
    storageBucket: "honorina-82a7c.appspot.com",
    messagingSenderId: "282741363642",
    appId: "1:282741363642:web:ba5308ed05481279f60383"
};

//Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


//Faz uma chamada dos meus elementos HTML para a DOM do javascript
const modal = document.querySelector('#dialog');
const cadastrar = document.querySelector('#Bcadastrar');
const nome = document.querySelector('#nome');
const ra = document.querySelector('#ra');

// Função para adicionar o item 
const addItem = async (data) => {
    const newItemRef = ref(db, 'Alunos');
    const newItemKey = push(newItemRef).key;

    try {
        await set(ref(db, `Alunos/${newItemKey}`), data);
        console.log('Documento adicionado com ID: ', newItemKey);
        alert('Aluno cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar documento: ', error);
        alert('Erro ao cadastrar o aluno. Tente novamente.');
    }
};

// Função para validar os campos de nome e RA
const validarCampos = () => {
    if (nome.value.trim() === '' || ra.value.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    return true;
};


cadastrar.addEventListener('click', () => {
    if (validarCampos()) {
        addItem({
            nome: nome.value,
            ra: ra.value
        });
      
    }
});


// Exemplo de uso:
// addItem({ nome: 'Aline', ra: 10222444, sala: 3 });

//GET todos os alunos
const getItems = async () => {
    const itemsRef = ref(db, 'Alunos'); // Altere 'Alunos' para o caminho desejado
    try {
        const snapshot = await get(itemsRef);
        if (snapshot.exists()) {
            const items = snapshot.val(); // Obtenha os dados como um objeto
            Object.keys(items).forEach((key) => {
                console.log(`${key} =>`, items[key]);
            });
        } else {
            console.log('Nenhum documento encontrado!');
        }
    } catch (error) {
        console.error('Erro ao obter documentos: ', error);
    }
};


// getItems();

// GET pelo ra
const getItemByRa = async (ra) => {
    const itemsRef = ref(db, 'Alunos'); // Altere 'Alunos' para a sua coleção
    try {
        const snapshot = await get(itemsRef);
        if (snapshot.exists()) {
            const items = snapshot.val(); // Obtenha todos os dados como um objeto
            let foundItem = null;

            // Percorre sua coleção para encontrar pelo RA
            Object.keys(items).forEach((key) => {
                if (items[key].ra === ra) {
                    foundItem = { key, ...items[key] }; // Salva o documento encontrado
                }
            });

            if (foundItem) {
                console.log('Documento encontrado:', foundItem);
            } else {
                console.log('Nenhum documento encontrado com o RA:', ra);
            }
        } else {
            console.log('Nenhum documento encontrado!');
        }
    } catch (error) {
        console.error('Erro ao obter documentos: ', error);
    }
};

// Exemplo de uso:
// getItemByRa(10222333); // Altere 'RA_DO_ALUNO' para o RA real


//PUT pelo RA
const updateItemByRa = async (ra, data) => {
    const itemsRef = ref(db, 'Alunos'); // Altere 'Alunos' para sua coleção
    try {
        const snapshot = await get(itemsRef);
        if (snapshot.exists()) {
            const items = snapshot.val();
            let foundKey = null;

            // Percorre os alunos para encontrar pelo RA
            Object.keys(items).forEach((key) => {
                if (items[key].ra === ra) {
                    foundKey = key; // Salva a chave do documento encontrado
                }
            });

            if (foundKey) {
                const itemRef = ref(db, `Alunos/${foundKey}`); // Referência ao item encontrado
                await update(itemRef, data); // Atualiza os dados
                console.log('Documento atualizado com sucesso!');
            } else {
                console.log('Nenhum documento encontrado com o RA:', ra);
            }
        } else {
            console.log('Nenhum documento encontrado!');
        }
    } catch (error) {
        console.error('Erro ao atualizar documento: ', error);
    }
};

// Exemplo de uso:
// updateItemByRa(10222333, { ra: 1252523, sala: 8, nome: 'João'}); // Altere 'RA_DO_ALUNO' para o RA real

// DELETE pelo ra:
const deleteItemByRa = async (ra) => {
    const itemsRef = ref(db, 'Alunos'); // Altere 'Alunos' para o caminho desejado
    try {
        const snapshot = await get(itemsRef);
        if (snapshot.exists()) {
            const items = snapshot.val();
            let foundKey = null;

            // Percorre os alunos para encontrar pelo RA
            Object.keys(items).forEach((key) => {

                if (items[key].ra === ra) {
                    foundKey = key; // Salva a chave do documento encontrado
                }

            });

            if (foundKey) {
                const itemRef = ref(db, `Alunos/${foundKey}`); // Referência ao item encontrado
                await remove(itemRef); // Remove o item
                console.log('Documento excluído com sucesso!');
            } else {
                console.log('Nenhum documento encontrado com o RA:', ra);
            }
        } else {
            console.log('Nenhum documento encontrado!');
        }
    } catch (error) {
        console.error('Erro ao excluir documento: ', error);
    }
};

// Exemplo de uso:
// deleteItemByRa(333333); // Altere 'RA_DO_ALUNO' para o RA real

