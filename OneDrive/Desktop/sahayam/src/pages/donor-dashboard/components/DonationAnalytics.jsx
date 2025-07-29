import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const DonationAnalytics = ({ analyticsData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [selectedChart, setSelectedChart] = useState('monthly');

  const chartColors = ['#FF8A50', '#4CAF50', '#FF6B35', '#F59E0B', '#EF4444', '#8B5CF6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-soft">
          <p className="font-body font-body-medium text-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value.toLocaleString('en-IN')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-soft">
          <p className="font-body font-body-medium text-foreground">{data.name}</p>
          <p className="text-sm text-primary">
            ₹{data.value.toLocaleString('en-IN')} ({data.payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const getChartData = () => {
    switch (selectedChart) {
      case 'monthly':
        return analyticsData.monthlyData;
      case 'category':
        return analyticsData.categoryData;
      case 'trend':
        return analyticsData.trendData;
      default:
        return analyticsData.monthlyData;
    }
  };

  const renderChart = () => {
    const data = getChartData();

    switch (selectedChart) {
      case 'monthly':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#666666" 
                fontSize={12}
                fontFamily="'Open Sans', sans-serif"
              />
              <YAxis 
                stroke="#666666" 
                fontSize={12}
                fontFamily="'JetBrains Mono', monospace"
                tickFormatter={(value) => `₹${(value / 1000)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#FF8A50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'category':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
                label={({ name, percentage }) => `${name} (${percentage}%)`}
                labelLine={false}
                fontSize={12}
                fontFamily="'Open Sans', sans-serif"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'trend':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="period" 
                stroke="#666666" 
                fontSize={12}
                fontFamily="'Open Sans', sans-serif"
              />
              <YAxis 
                stroke="#666666" 
                fontSize={12}
                fontFamily="'JetBrains Mono', monospace"
                tickFormatter={(value) => `₹${(value / 1000)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#FF8A50" 
                strokeWidth={3}
                dot={{ fill: '#FF8A50', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#FF8A50', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-heading font-heading-semibold text-lg text-foreground">
            Donation Analytics
          </h3>
          <p className="text-sm text-muted-foreground">
            Visualize your donation patterns and impact
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="px-4 py-2 border border-border rounded-button bg-input focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="monthly">Monthly Donations</option>
            <option value="category">By Category</option>
            <option value="trend">Donation Trend</option>
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-border rounded-button bg-input focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="year">This Year</option>
            <option value="6months">Last 6 Months</option>
            <option value="3months">Last 3 Months</option>
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-card rounded-card p-6 border border-border">
        <div className="mb-4">
          <h4 className="font-body font-body-semibold text-foreground mb-2">
            {selectedChart === 'monthly' && 'Monthly Donation Pattern'}
            {selectedChart === 'category' && 'Donations by Category'}
            {selectedChart === 'trend' && 'Donation Trend Over Time'}
          </h4>
          <p className="text-sm text-muted-foreground">
            {selectedChart === 'monthly' && 'Track your monthly donation amounts'}
            {selectedChart === 'category' && 'See how your donations are distributed across different causes'}
            {selectedChart === 'trend' && 'Observe your donation patterns over time'}
          </p>
        </div>
        
        <div className="w-full" aria-label={`${selectedChart} donation chart`}>
          {renderChart()}
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-card p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-heading font-heading-bold text-foreground">
                ₹{analyticsData.insights.averageMonthly.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-muted-foreground">Avg Monthly</div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-card p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="Heart" size={20} className="text-accent" />
            </div>
            <div>
              <div className="text-lg font-heading font-heading-bold text-foreground">
                {analyticsData.insights.topCategory}
              </div>
              <div className="text-sm text-muted-foreground">Top Category</div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-card p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
              <Icon name="Calendar" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-lg font-heading font-heading-bold text-foreground">
                {analyticsData.insights.bestMonth}
              </div>
              <div className="text-sm text-muted-foreground">Best Month</div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-card p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
              <Icon name="Target" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-lg font-heading font-heading-bold text-foreground">
                {analyticsData.insights.impactScore}
              </div>
              <div className="text-sm text-muted-foreground">Impact Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Goals */}
      <div className="bg-card rounded-card p-6 border border-border">
        <h4 className="font-body font-body-semibold text-lg text-foreground mb-4">
          Annual Donation Goal
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress towards ₹{analyticsData.goals.annual.toLocaleString('en-IN')} goal</span>
            <span className="text-sm font-data text-foreground">
              {Math.round((analyticsData.goals.current / analyticsData.goals.annual) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((analyticsData.goals.current / analyticsData.goals.annual) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-data text-primary">
              ₹{analyticsData.goals.current.toLocaleString('en-IN')} donated
            </span>
            <span className="text-muted-foreground">
              ₹{(analyticsData.goals.annual - analyticsData.goals.current).toLocaleString('en-IN')} remaining
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationAnalytics;