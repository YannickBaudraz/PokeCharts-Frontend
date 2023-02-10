import '/src/assets/style/navbar.css';

import {Link} from "react-router-dom";
import {Button} from 'primereact/button';

export default function Navbar() {
    return (
        <div className={'navbar_container'}>
            <Link to={'/'} className={'navbar_link'}>
                <img src={'/src/assets/images/logo.png'} alt={'pokeball'} className={'navbar_logo'}/>
                <Button label="PokeCharts" className="p-button-rounded p-button-text p-button-lg"/>
            </Link>
            <div>
                <Link to={'/search'} className={'navbar_link'}>
                    <Button label="Search" className="p-button-rounded p-button-text p-button-lg"/>
                </Link>

                <Link to={'/detail'} className={'navbar_link'}>
                    <Button label="Detail" className="p-button-rounded p-button-text p-button-lg"/>
                </Link>

                <Link to={'/compare'} className={'navbar_link'}>
                    <Button label="Compare" className="p-button-rounded p-button-text p-button-lg"/>
                </Link>
            </div>

        </div>

    )
        ;
}