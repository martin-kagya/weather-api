import React from "react";

function Details({humidity, date, data}){
    return(
        <>
            <div className="card h-48 flex items-center justify-between">
                <div>
                    <h3>Humidity: {humidity}</h3>
                    <h3>Wind Speed: {data.wind["speed"]}</h3>
                </div>
                <div>
                    <h3>Pressure: {data.main["pressure"]}</h3>
                    <h3>{date}</h3>
                </div>
            </div>
        </>
    )
}
export default Details;