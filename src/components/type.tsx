import "/src/assets/style/type.css";

export default function Types({types}: { types: any }) {
    const typesDetails = [
        {
            name: "normal",
            color: "#9FA39D"
        },
        {
            name: "fire",
            color: "#FF9900"
        },
        {
            name: "water",
            color: "#14A8FF"
        },
        {
            name: "grass",
            color: "#1CD80E"
        },
        {
            name: "electric",
            color: "#FFDE00"
        },
        {
            name: "ice",
            color: "#2EE4C6"
        },
        {
            name: "fighting",
            color: "#FF225C"
        },
        {
            name: "poison",
            color: "#F149FF"
        },
        {
            name: "ground",
            color: "#FF6B0D"
        },
        {
            name: "flying",
            color: "#89BDFF"
        },
        {
            name: "psychic",
            color: "#FF6C64"
        },
        {
            name: "bug",
            color: "#7BCF00"
        },
        {
            name: "rock",
            color: "#D8BC5A"
        },
        {
            name: "ghost",
            color: "#4E6AFF"
        },
        {
            name: "dragon",
            color: "#0076FF"
        },
        {
            name: "dark",
            color: "#5A566A"
        },
        {
            name: "steel",
            color: "#23A1BD"
        },
        {
            name: "fairy",
            color: "#FF8AFF"
        },
    ];

    return (
        <>
            {types.map((type: any) => {
                {
                    return (
                        <div className={"pokemon-type"} style={{
                            backgroundColor: typesDetails.find((typeDetail: any) => typeDetail.name === type.name)?.color,
                            boxShadow: "0 0 20px " + typesDetails.find((typeDetail: any) => typeDetail.name === type.name)?.color
                        }}>
                            <img src={"/src/assets/images/icons/" + type.name + ".svg"} alt={type.name}/>
                        </div>
                    )
                }
            })}
        </>
    );
}