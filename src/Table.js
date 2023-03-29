import './css/Table.css';

function Table(){ //tabela com informações sobre os portes de caminhões 
    return(
        <div className='container-table'>
        <table>
          <thead>
            <tr>
              <th>Modalidade</th>
              <th>Preço por Km (R$/km)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Caminhão de Pequeno porte</td>
              <td>R$ 4,87</td>
            </tr>
            <tr>
              <td>Caminhão de Médio Porte</td>
              <td>R$ 11,92</td>
            </tr>
            <tr>
              <td>Caminhão de Grande Porte</td>
              <td>R$ 27,44</td>
            </tr>
  
          </tbody>
        </table>

      </div>
    )
}
export default Table