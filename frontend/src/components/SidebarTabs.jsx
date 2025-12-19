import React from 'react';
import '../styles/sidebar.css';

const SidebarTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="sidebar-tabs">
      {tabs.map(tab => (
        <button
          key={tab}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SidebarTabs;
