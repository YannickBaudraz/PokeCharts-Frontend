import "/src/assets/style/home.css";
import {Button} from "primereact/button";

export default function Home() {
    return (
        <>
            <img src="/src/assets/images/background.png" alt="Background" className={"background-image"}/>
            <div className={"home-container"}>
                <a href={"/search"}>
                    <Button label="Search" className="p-button-rounded p-button-lg"/>
                </a>

                <a href={"/detail"}>
                    <Button label="Detail" className="p-button-rounded p-button-lg"/>
                </a>
                <a href={"/compare"}>
                    <Button label="Compare" className="p-button-rounded p-button-lg"/>
                </a>
            </div>
        </>
    );
}