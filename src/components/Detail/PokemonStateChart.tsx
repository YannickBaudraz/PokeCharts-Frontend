
import { Chart } from 'primereact/chart';
import { useState } from 'react';
import PokemonStats from '../../models/Stats';

interface PokemonStateChartProps {
    pokemonStats: PokemonStats
}

export default function PokemonStateChart( {pokemonStats}: PokemonStateChartProps) {
     //data for chart
    const statLabel =  Object.keys(pokemonStats)
    const statData =  Object.values(pokemonStats)

    const [basicData] = useState({
        labels: statLabel,
        datasets: [
            {
                label: 'bases stats',
                backgroundColor: '#42A5F5',
                data: statData
            },
        ]
     });

     let horizontalOptions = {
         indexAxis: 'y',
         reponsive: true,
         maintainAspectRatio: false,
         aspectRatio: 1,
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
