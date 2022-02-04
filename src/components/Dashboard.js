import React from 'react';
import styles from './dashboard.module.css';
import ResponseGrid from './ResponseGrid';

const Dashboard = () => {
  return <div className={styles.container}>
    {/* Page Header */}
    <div className={styles.title}>
      <h1 className={styles.heading}>
        DASHBOARD
      </h1>
    </div>
    {/* Page Content */}
    <ResponseGrid/>
  </div>;
};

export default Dashboard;