import React, {useEffect} from 'react';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import Titulo from '../../../components/titulo';
import {Card, Container, Form, Button, Table} from 'react-bootstrap';
import {url} from '../../../utills/constants';



const CrudCategorias = () => {
         const [id, setId] = useState(0);
         const [nome, setNome] = useState('');
         const [urlImagem, setUrlImagem] = useState('');
         const[categorias, setCategorias] = useState([]);

         useEffect(()=>{
           listar();
         },[])

         const listar = () => {

          fetch(`${url}/categorias`)
          .then( response => response.json()) 
          .then( dados =>{

            setCategorias(dados.data);

            limparCampos();
          })
          .catch(err => console.error(err));
         }

         const salvar = (event) =>{
             event.preventDefault();

             const categoria ={

              nome : nome, 
              urlImagem : urlImagem, 
    
           }
           let method = (id === 0? 'POST' : 'PUT');
           let urlRequest = (id === 0? `${url}/categorias` : `${url}/categorias/${id}`);
    
           fetch(urlRequest, {
             method : method,
             body : JSON.stringify(categoria),
             headers : {
               'content-type' : 'application/json',
               'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
             }
           })
           .then(response => response.json)
             .then(dados => {
               console.log('Categoria Salva')
    
               listar();
             })
           .catch(err => console.error(err));  

         }

         const remover = (event) =>{
          event.preventDefault();

        fetch(url + '/categorias' + event.target.value, {
            method : 'DELETE',
            headers : {
              'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
          }
          })
   
          .then(response => response.json)
          .then(dados => {
            alert('Categoria removida');
            
   
            listar();
          })
   
          .catch(err => console.error(err));
        }

        const editar = (event) =>{
          event.preventDefault();

          fetch(url + '/categorias' + event.target.value, {
              method : 'GET',
              headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous-tarde')
            }
          })
     
            .then(response => response.json())
            .then(dado => {
              setId(dado.data.id);
              setNome(dado.data.nome);
              setUrlImagem(dado.data.urlImagem);
            })
            .catch(err => console.error(err));
     
     
            this.listar();
       }

         const uploadFile = (event) => {
             event.preventDefault();

             let formData = new FormData();
             formData.append('arquivo', event.target.file[0]);
             
             fetch(`${url}/upload`,
             {
              method : 'POST',
               body : formData
         
            })
            .then(response => response.json())
            .then(data => {
              setUrlImagem(data.url)
            })
            .catch(err => console.error(err));
         }

         const limparCampos = () => {
          setId(0);
          setNome('');
          setUrlImagem('');
      }

         return(
             <div>
                 <Menu/>
                   <Container>
                    <Titulo titulo="Categorias" chamada="Gerencie as categorias do sistema"/>

                    <Card onSubmit = {event => salvar(event)}> 
                      <Card.Body>
                        <Form>
                          <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="Text" value={nome} onChange={event => setNome(event.target.value)}/>
                          </Form.Group>

                          <Form.Group controlId="formNome">
                            <Form.File id ="fileCategoria" label="Imagem da Categoria" onChange={event => uploadFile(event)}/>
                            {urlImagem && <img src={urlImagem} style={{width : '160px'}}/>}
                          </Form.Group>
                          <Button type="submit">Savar</Button>
                          
                        </Form>
                      </Card.Body>
                    </Card>
                     <Table bordered>
                     <thead>
                         <tr>
                           <th>#</th>
                           <th>Imagem</th>
                           <th>Nome</th>
                           <th>Ações</th>
                           </tr>
                     </thead>
                     <tbody>
                       {
                         categorias.map((item, index)=>{
                             return(
                              <tr key={index}>
                              <td><img src={item.urlImagem} style={{width : '120px'}}/></td>
                              <td>{item.nome}</td>
                              <td>
                                <Button type='button' variant='warning' value={item.id} onClick={event => editar(event)}></Button>
                                <Button type='button' variant='danger' value={item.id} style={{marginLeft : '30px'}} onClick={event => remover(event)}></Button>
                              </td>
                           </tr>
                         )})
                       })
                     </tbody>
                     </Table>
                  </Container>
                 <Rodape/>
             </div>
         )
}

export default CrudCategorias 