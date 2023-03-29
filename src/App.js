
import './css/App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Load from './LoadForm';

 function List() {

  const [data, setData] = useState([]);  // carregando a tabela que contém as distancias do backend 
  const [list, setlist] = useState([]); // setando uma lista de indexes para buscar na tabela 
  const [distance, setDistance] = useState(); // inicializando variavel de distancia 
 // const [modalidade, setModalidade] = useState();
  const[costMod, setcostMod] = useState();  //inicializando variavel de custo 
  const[modOptions] = useState([4.87, 11.92, 27.44]); // coeficientes de preço po modalidade 

  const Additems = (e) => { //adiciona os indexes que queremos procurar 
    const arr = list.concat(e.target.value);
    setlist(arr);
  };

  const calculateDistance=()=>{ //procura distância na tabela 
    const indexes = [];
    list.slice().reverse().forEach((el)=>{
      indexes.push(data[0].indexOf(el));
    });
    let distance = 0;

    indexes.forEach((value, i) => { // encontra a distancia a partir dos indexes 
      if (i < (indexes.length-1)) {
          console.log(i)
          distance += parseFloat(data[indexes[i] + 1][indexes[i + 1]]); //[6][4] --> [][]
      };
  });
    setDistance((distance));
  }
  const calculateCost=(e)=>{  //calcula o custo 
    const cost = distance*modOptions[e.target.value];
    setcostMod(cost)
  }

  useEffect(() => {  // recarrega a tabela do lida no back- end
    try {
      axios.get('http://localhost:3002').then(res => setData(res.data)); //setting dataState
    } catch (e) {
      console.log(e)
    }
  }, [list]);

  return ( 
    <div className="App">
      <section className='feature-1'>
      <h1 id='title'>Escolha as cidades da sua rota</h1>

      <div className='select-city'>
      <select onChange={(e) => Additems(e)}>
        <option>Selecione as Cidades</option>
        {data.map((item, index) => (
          <option key={index}>
            {data[0][index]}
          </option>
        ))}</select>
      </div>
   
     
      <div className='selection'>
        <h1> cidades selecionadas </h1>
        <ul >
        {list.map((item, index) => (
            <li key={ index }>{item}</li>
          ))}
        </ul>
      </div>
        <div className='distance'>
          {list.length>=2 && (
            <button className='btn-calcular' onClick={calculateDistance}>
              Calcular Distância
            </button>
          )
          } {distance && (
            <div className='value'>
              {distance} Km's
            </div>)
          }
        </div>
        {
          distance && ( 
            <div className='modality'>
            <select className='select-modality' onChange={(e)=>calculateCost(e)}>
              <option> Selecione Modalidade</option>
              <option value={0}> Caminhão de Pequeno Porte</option>
              <option value={1}> Caminhão de Médio porte</option>
              <option value={2}> Caminhão	de Grande Porte</option>
            </select>
            { costMod && ( 
              <div className='cost-value'>
                R$ {costMod.toLocaleString('pt-br')}
              </div>
            )}
          </div>
          )
        }
      </section>
  
       < Table />

      { distance && (
        <Load props={[distance, modOptions]} />
      )}
     
    </div>
  );
}

export default List;
