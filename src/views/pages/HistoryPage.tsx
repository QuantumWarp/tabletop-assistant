import React from 'react';
import { selectHistory } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import HistoryRow from '../../components/history/HistoryRow';

const HistoryPage = () => {
  const nodes = useAppSelector(selectHistory);

  return (
    <div>
      {nodes.map((x) => (
        <HistoryRow node={x} />
      ))}
    </div>
  );
};

export default HistoryPage;
