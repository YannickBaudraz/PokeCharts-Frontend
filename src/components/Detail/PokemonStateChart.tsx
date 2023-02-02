
import { Chart } from 'primereact/chart';
import { useState } from 'react';
import PokemonStats from '../../models/PokemonStats';

interface PokemonStateChartProps {
    pokemonStats: PokemonStats
}

export default function PokemonStateChart( {pokemonStats}: PokemonStateChartProps) {
     //data for chart
    const statLabel = () => Object.entries(pokemonStats).map(([key, value]) => value.name);
    const statData = () => Object.entries(pokemonStats).map(([key, value]) => value.value);
    
    const [basicData] = useState({
        labels: statLabel(),
        datasets: [
            {
                label: 'bases stats',
                backgroundColor: '#42A5F5',
                data: statData()
            },
        ]
     });
 
     let horizontalOptions = {
         indexAxis: 'y',
         maintainAspectRatio: false,
         aspectRatio: .8,
         plugins: {
             legend: {
                 labels: {
                     color: '#495057'
                 }
             }
         },
         scales: {
             x: {
                 ticks: {
                     color: '#495057'
                 },
                 grid: {
                     color: '#ebedef'
                 }
             },
             y: {
                 ticks: {
                     color: '#495057'
                 },
                 grid: {
                     color: '#ebedef'
                 }
             }
         }
     };
     return (
        <div className="card">
            <Chart type="bar" data={basicData} options={horizontalOptions} />
        </div> 
     )   
}