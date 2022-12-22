import "/src/assets/style/type.css";

export default function Types({types}: { types: any }) {
    const typesDetails = [
        {
            name: "Normal",
            color: "#9FA39D"
        },
        {
            name: "Fire",
            color: "#FF9900"
        },
        {
            name: "Water",
            color: "#14A8FF"
        },
        {
            name: "Grass",
            color: "#1CD80E"
        },
        {
            name: "Electric",
            color: "#FFDE00"
        },
        {
            name: "Ice",
            color: "#2EE4C6"
        },
        {
            name: "Fighting",
            color: "#FF225C"
        },
        {
            name: "Poison",
            color: "#F149FF"
        },
        {
            name: "Ground",
            color: "#FF6B0D"
        },
        {
            name: "Flying",
            color: "#89BDFF"
        },
        {
            name: "Psychic",
            color: "#FF6C64"
        },
        {
            name: "Bug",
            color: "#7BCF00"
        },
        {
            name: "Rock",
            color: "#D8BC5A"
        },
        {
            name: "Ghost",
            color: "#4E6AFF"
        },
        {
            name: "Dragon",
            color: "#0076FF"
        },
        {
            name: "Dark",
            color: "#5A566A"
        },
        {
            name: "Steel",
            color: "#23A1BD"
        },
        {
            name: "Fairy",
            color: "#FF8AFF"
        },
    ];

    return (
        <div className="pokemon-types">
            {types.map((type: string) => {
                {
                    return (
                        <div
                            style={{backgroundColor: typesDetails.find((typeDetail: any) => typeDetail.name === type)?.color}}>
                            <h2>{type}</h2>
                        </div>
                    )
                }
            })}
        </div>
    );
}