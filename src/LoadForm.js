import './css/Load.css'
import { useState } from 'react'


function Load(props){

    const [weights] = useState([0.5, 60, 100, 5, 0.8,120]); //variável com os pesos dos items

    const [load, setLoad] = useState(); //carga total que será renderizada

    const [cost, setCost] = useState() //custo aser calculado 

    const [FormValues, setFormValues] = useState({}) //valores do formulário 

    const [caminhao, setCaminhoes] = useState(); //caminhão a ser utilizado 

    const handleInputChange = (e) => {
         
        e.preventDefault()
        const { target } = e;
        const { id, value} = target;
        setFormValues({
            ...FormValues,
            [id]: value,
        });
        console.log(load)
    }
    function Cost(weight){
        const distance = Object.values(props)[0][0];
        const mods = Object.values(props)[0][1];

        if(weight <= 1000 || weight < 1){   // lista de condicionais para determinar o peso 
            setCost(distance * mods[0])
            setCaminhoes('1 Caminhão de pequeno porte')
            return
        }
        if(weight > 1000 && weight <= 4000){
            setCost(distance * mods[1])
            setCaminhoes('1 Caminhão de médio porte')
            return
        }
        if(weight > 4000 && weight <= 10000){
            setCost(distance * mods[2])
            setCaminhoes('1 Caminhão de grande porte')  
            return
        }
        if( weight > 10000 && weight <= 11000){ //caminhão grande e pequeno / 10 a 11 toneladas 
            setCost(distance * mods[2] + distance * mods[0] );
            setCaminhoes('1 Caminhão de grande porte e um de pequeno')
            return
        }
        if( weight > 11000 && weight <= 15000){ //caminhãao grande e médio / 11 a 15 toneladas
            setCost(distance * mods[3] + distance * mods[1]);
            setCaminhoes('1 Caminhão de grande porte e um médio')
            return
        }
        if( weight < 15000){ //caminhãao grande e grande /  15 tonelads +
            setCost(distance * mods[3]  + distance * mods[2]);
            setCaminhoes('2 Caminhões de grande porte')
            return
        }

    }
    function TotalWeight(){ // função que calcula o peso total 
        let totalWeight = 0;
        const ids = Object.keys(FormValues);
        ids.forEach((id)=>{
            totalWeight += parseFloat(FormValues[id]) * weights[id];
        });
        return totalWeight;
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        const totalWeight = TotalWeight()
        setLoad(totalWeight);
        Cost(totalWeight)
    }
    
    return (
        <div className='container-form'>
            <p>Voce pode escolher a modalidade ou informar os items e lhe-diremos a melhor modalidade</p>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="celular">Celular</label>
                    <input type="number" id="0" placeholder="Quantidade"
                    onChange={handleInputChange} />
                </div>
                <div class="form-group">
                    <label for="geladeira">Geladeira</label>
                    <input type="number" id="1" placeholder="Quantidade" 
                     onChange={handleInputChange} />
                </div>
                <div class="form-group">
                    <label for="freezer">Freezer</label>
                    <input type="number" id="2" placeholder="Quantidade" 
                    onChange={handleInputChange} />
                </div>
                <div class="form-group">
                    <label for="cadeira">Cadeira</label>
                    <input type="number" id="3" placeholder="Quantidade" 
                    onChange={handleInputChange}/>
                </div>
                <div class="form-group">
                    <label for="luminaria">Luminária</label>
                    <input type="number" id="4" placeholder="Quantidade" 
                     onChange={handleInputChange}/>
                </div>
                <div class="form-group">
                    <label for="lavadora">Lavadora de Roupa</label>
                    <input type="number" id="5" placeholder="Quantidade" 
                     onChange={handleInputChange}/>
                </div>
                <button type="submit">Calcular</button>
            </form>
            { load>=1 && cost &&(
                <div className='load-result'>{ load } Kg's<br></br>
                <br></br>
                R$ {cost.toLocaleString('pt-br')}
                </div>

            )}{ load < 0 && (
                <div className='load-result'>Valores Inválidos</div>
            )}
    
            {
              caminhao && load>0 && ( <p> { caminhao }</p>)  
            }

        </div>
    )
}
export default Load
