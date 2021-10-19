import React, { ReactNode } from 'react';
import './TopBar.css';

interface TopBarProps {
  title: string;
  children: ReactNode;
}

const TopBar = ({ title, children }: TopBarProps) => (
  <div className="top-nav">
    <div className="title">{title}</div>
    {children}
  </div>
);

export default TopBar;
