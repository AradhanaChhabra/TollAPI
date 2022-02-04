import React from 'react';
import styles from './UnitTollCard.module.css';

const UnitTollCard = ({ jobID, plate, time, type, imageid, videoid }) => {
  
  // capitalize first character of a string
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const vehicle = capitalize(type);
  
  return (<div className={styles.container}>
    <div className={styles.left}>
      <div className={styles.leftheader}>
        <div className={styles.vehicle}>
          {vehicle}
        </div>
        <div className={styles.licence}>
          <div className={styles.plateHeading}>Licence Plate</div>
          <div className={styles.plateNo}>{plate}</div>
        </div>
      </div>
      <hr className={styles.hrH}/>
      <img id={imageid} alt="0"></img>
    </div>

    <hr className={styles.hrV} />

    {/* right section */}
    
    <div className={styles.left}>
      <div className={styles.rightheader}>
        <div className={styles.licence}>
          <div className={styles.plateHeading}>Job ID</div>
          <div className={styles.headerText}>{jobID}</div>
        </div>
        <div className={styles.licence}>
          <div className={styles.plateHeading}>Time</div>
          <div className={styles.headerText}>{time}</div>
        </div>
      </div>

      <hr className={styles.hrH} />

      <video id={videoid} type="video/mp4" autoPlay controls loop muted>
        </video>
    </div>
  </div>);
};

export default UnitTollCard;
