import '/src/assets/style/navbar.css';

import {Link} from "react-router-dom";
import {Button} from 'primereact/button';

export default function Navbar() {
    return (
        <div className={'navbar_container'}>
            <img src={'/src/assets/images/logo.png'} alt={'pokeball'} className={'navbar_logo'}/>

            <Link to={'/'} className={'navbar_link'}>
                <Button label="Home" className="p-button-rounded p-button-text"/>
            </Link>

            <Link to={'/search'} className={'navbar_link'}>
                <Button label="Search" className="p-button-rounded p-button-text"/>
            </Link>

            <Link to={'/detail'} className={'navbar_link'}>
                <Button label="Detail" className="p-button-rounded p-button-text"/>
            </Link>

            <Link to={'/compare'} className={'navbar_link'}>
                <Button label="Compare" className="p-button-rounded p-button-text"/>
            </Link>
        </div>

    )
        ;
}