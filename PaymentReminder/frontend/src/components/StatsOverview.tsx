import React from 'react';
import { MessageCircle as MessageCircleCheck, MessageCircleX } from 'lucide-react';
import StatsCard from './ui/StatsCard';
import { NotificationStats } from '../types/notification';

interface StatsOverviewProps {
  stats: NotificationStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-fade-in-up">
      <StatsCard
        title="Total Sent"
        value={stats.totalSent}
        icon={<MessageCircleCheck size={24} className="text-green-600" />}
        className="hover-scale border-l-4 border-green-500 shadow-md hover:shadow-xl"
      />
      <StatsCard
        title="Total Failed"
        value={stats.totalFailed}
        icon={<MessageCircleX size={24} className="text-red-600" />}
        className="hover-scale border-l-4 border-red-500 shadow-md hover:shadow-xl"
      />
    </div>
  );
};

export default StatsOverview;