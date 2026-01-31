
import React from 'react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const styles = {
    [RiskLevel.HIGH]: "bg-red-100 text-red-700 border-red-200",
    [RiskLevel.MEDIUM]: "bg-amber-100 text-amber-700 border-amber-200",
    [RiskLevel.LOW]: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${styles[level]}`}>
      {level} RISK
    </span>
  );
};

export default RiskBadge;
