import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './grid.module.css';
import UnitTollCard from './UnitTollCard';

const ResponseGrid = () => {
    const baseURL = "https://tolltax.xyz/demoapi/";
    const [data, setData] = useState([]);
    var image = 0;
    const getImageID = () => {
        return "image" + (image++);
    }
    var key = 0;
    const getKey = () => key++;
    const postData= {
            "licence_plate": "",
            "vehicle_type": "",
            "vehicle_subtype": "",
            "datefrom": "2021-08-01T00:00:00",
            "dateto": "2021-09-01T00:00:00"
    }
    const headers = {
        headers:{
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    }
    const getDataArray = async() => {
        const response = await axios.post(baseURL + "dashboard", postData, headers);
        const dataArray = await response.data.data;
        setData((dataArray));
        dataArray.map(async(obj) => {
            const imageData = await getImage(obj.image);
            return imageData;
        })
    }
    const getImage = async (filepath) => {
        const response = await axios.post(baseURL+"get_file", {
            "filepath": filepath
        },{
            responseType:'blob'
        },
            headers, 
        );
        const imgData = await response.data;
        console.log(response);
        const urlCreator = window.URL || window.webkitURL;
        document.getElementById(getImageID()).src = urlCreator.createObjectURL(imgData);
        const src = urlCreator.createObjectURL(imgData);
        return src;    
    }

    useEffect(() => {
        getDataArray();
    }, []);
    const gridItems = data.map((obj, index) => {
        console.log(obj)
        return (
            <UnitTollCard
                key={getKey()}
                jobID={obj.jobid}
                imageid={"image"+index}
                plate={obj.licence_plate}
                time={obj.time}
                type={obj.vehicle_type}
            />);
    })
    console.log(gridItems);

    useEffect(() => {
        console.log(data);
        if (data.length > 0) {
            data.map((obj) => {
                getImage(obj.image);
                return 1;
            });
        }   
    }, [data])
    
    return <div className={styles.container}>
        <div className={styles.text}> Displaying fetched data from the API</div>
        {data.length>0?gridItems:<div> Nothing here</div>}
        
  </div>;
};

export default ResponseGrid;
