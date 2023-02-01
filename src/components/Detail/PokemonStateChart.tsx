
import { Chart } from 'primereact/chart';
import { useState } from 'react';

export default function PokemonStateChart( {stats}) {
     //data for chart
     const statLabel = () => stats?.map((stat: { pokemon_v2_stat: { name: any; }; }) => ( stat.pokemon_v2_stat.name ))
     const statData = () =>  stats?.map((stat: { base_stat: any; }) => ( stat.base_stat ))
 
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