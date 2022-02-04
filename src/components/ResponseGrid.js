import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './grid.module.css';
import UnitTollCard from './UnitTollCard';

const ResponseGrid = () => {
    const baseURL = "https://tolltax.xyz/demoapi/";
    const [data, setData] = useState([]);
    // to get unique image ids
    var image = 0;
    const getImageID = () => {
        return "image" + (image++);
    }
    // to get unique video ids
    var video = 0;
    const getVideoID = () => {
        return "video" + (video++);
    }
    // to get unique keys for map function
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

    // funciton to fetch data array from api 
    const getDataArray = async() => {
        const response = await axios.post(baseURL + "dashboard", postData, headers);
        const dataArray = await response.data.data;
        setData((dataArray));
        dataArray.map(async(obj) => {
            const imageData = await getImage(obj.image);
            return imageData;
        })
    }
    // funciton to fetch image file as blob from api and set the source of image elements 
    const getImage = async (filepath) => {
        const response = await axios.post(baseURL+"get_file", {
            "filepath": filepath
        },{
            responseType:'blob'
        },
            headers, 
        );
        const imgData = await response.data;
        const urlCreator = window.URL || window.webkitURL;
        document.getElementById(getImageID()).src = urlCreator.createObjectURL(imgData);
        return urlCreator.createObjectURL(imgData);   
    }

    // funciton to fetch video file as blob from api and set the source of video elements 
    const getVideo = async (filepath) => {
        const response = await axios.post(baseURL+"get_videoclip", {
            "filepath": filepath
        },{
            responseType:'blob'
        },
            headers, 
        );
        const vidData = await response.data;
        const urlCreator = window.URL || window.webkitURL;
        document.getElementById(getVideoID()).src = urlCreator.createObjectURL(vidData);
        const src = urlCreator.createObjectURL(vidData);
        return src;    
    }

    // receive data array 
    useEffect(() => {
        getDataArray();
    }, []);

    // array of elements mapped from the data received, to be rendered
    const gridItems = data.map((obj, index) => {
        return (
            <UnitTollCard
                key={getKey()}
                jobID={obj.jobid}
                imageid={"image" + index}
                videoid={"video"+index}
                plate={obj.licence_plate}
                time={obj.time}
                type={obj.vehicle_type}
            />);
    })

    // calling functions to set src of images and videos 
    useEffect(() => {
        if (data.length > 0) {
            data.map((obj) => {
                getImage(obj.image);
                return 1;
            });
            data.map((obj) => {
                getVideo(obj.videoclip);
                return 0;
            })
        }   
    }, [data])
    
    return <div className={styles.container}>
        <div className={styles.text}> Displaying fetched data from the API</div>
        {data.length > 0 ? gridItems : <div> Nothing here</div>}

        
  </div>;
};

export default ResponseGrid;
