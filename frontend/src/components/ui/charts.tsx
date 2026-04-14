import React from 'react';
import { cn } from '@/lib/utils';

// Simple Chart Components (using CSS and SVG)
// For more complex charts, you would integrate with libraries like Chart.js, D3, or Recharts

// Bar Chart component
interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  showValues?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

const BarChart: React.FC<BarChartProps> = ({
  className,
  data,
  height = 200,
  showValues = false,
  orientation = 'vertical',
  ...props
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className={cn('w-full', className)} {...props}>
      <div
        className={cn(
          'flex items-end justify-between',
          orientation === 'horizontal' ? 'flex-col space-y-2' : 'space-x-2'
        )}
        style={{ height }}
      >
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const barColor = item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`;

          return (
            <div
              key={item.label}
              className={cn(
                'flex items-end',
                orientation === 'horizontal' ? 'flex-row-reverse space-x-reverse space-x-2' : 'flex-col items-center space-y-1'
              )}
            >
              {showValues && (
                <span className="text-xs text-lingua-text-muted font-medium">
                  {item.value}
                </span>
              )}
              <div
                className="rounded-sm transition-all duration-300 hover:opacity-80"
                style={{
                  width: orientation === 'horizontal' ? `${percentage}%` : '100%',
                  height: orientation === 'horizontal' ? '100%' : `${percentage}%`,
                  backgroundColor: barColor,
                  minWidth: orientation === 'horizontal' ? '20px' : '20px',
                  minHeight: orientation === 'horizontal' ? '20px' : '20px',
                }}
              />
              <span className={cn(
                'text-xs text-lingua-text-muted font-medium',
                orientation === 'horizontal' ? 'whitespace-nowrap' : 'text-center'
              )}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Line Chart component
interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{
    label: string;
    value: number;
  }>;
  height?: number;
  color?: string;
  showPoints?: boolean;
  showGrid?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  className,
  data,
  height = 200,
  color = '#6366f1',
  showPoints = true,
  showGrid = true,
  ...props
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = range === 0 ? 50 : 100 - ((item.value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={cn('w-full relative', className)} style={{ height }} {...props}>
      {/* Grid lines */}
      {showGrid && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" opacity="0.3" className="text-lingua-border" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      )}

      {/* Line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="drop-shadow-sm"
        />

        {/* Points */}
        {showPoints && data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = range === 0 ? 50 : 100 - ((item.value - minValue) / range) * 100;

          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill={color}
              className="hover:r-2 transition-all cursor-pointer"
            />
          );
        })}
      </svg>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-lingua-text-muted">
        {data.map((item, index) => (
          <span key={index} className="text-center">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// Pie Chart component
interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  size?: number;
  showLabels?: boolean;
  showLegend?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({
  className,
  data,
  size = 200,
  showLabels = false,
  showLegend = true,
  ...props
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start from top

  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = Math.cos(startAngleRad) * 50 + 50;
    const y1 = Math.sin(startAngleRad) * 50 + 50;
    const x2 = Math.cos(endAngleRad) * 50 + 50;
    const y2 = Math.sin(endAngleRad) * 50 + 50;

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    currentAngle = endAngle;

    const color = item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`;

    return {
      ...item,
      pathData,
      color,
      percentage,
      midAngle: startAngle + angle / 2,
    };
  });

  return (
    <div className={cn('flex items-center space-x-4', className)} {...props}>
      {/* Chart */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          {slices.map((slice, index) => (
            <path
              key={index}
              d={slice.pathData}
              fill={slice.color}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              stroke="white"
              strokeWidth="0.5"
            />
          ))}

          {/* Labels */}
          {showLabels && slices.map((slice, index) => {
            const labelRadius = 35;
            const labelAngle = (slice.midAngle * Math.PI) / 180;
            const labelX = Math.cos(labelAngle) * labelRadius + 50;
            const labelY = Math.sin(labelAngle) * labelRadius + 50;

            return (
              <text
                key={index}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-white drop-shadow-sm"
              >
                {slice.percentage.toFixed(1)}%
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="space-y-2">
          {slices.map((slice, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-sm text-lingua-text">
                {slice.label} ({slice.percentage.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Progress Ring component
interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
  label?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  className,
  value,
  size = 100,
  strokeWidth = 8,
  color = '#6366f1',
  backgroundColor = '#e5e7eb',
  showLabel = true,
  label,
  ...props
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} {...props}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>

      {/* Label */}
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-lingua-text">
            {label || `${Math.round(value)}%`}
          </span>
        </div>
      )}
    </div>
  );
};

// Sparkline component (mini line chart)
interface SparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

const Sparkline: React.FC<SparklineProps> = ({
  className,
  data,
  width = 100,
  height = 20,
  color = '#6366f1',
  strokeWidth = 1.5,
  ...props
}) => {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg
      className={cn('overflow-visible', className)}
      width={width}
      height={height}
      {...props}
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Metric Card with Sparkline
interface MetricCardWithSparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  data?: number[];
  color?: string;
}

const MetricCardWithSparkline: React.FC<MetricCardWithSparklineProps> = ({
  className,
  title,
  value,
  change,
  data,
  color = '#6366f1',
  ...props
}) => {
  const trendColors = {
    up: 'text-lingua-success',
    down: 'text-lingua-error',
    neutral: 'text-lingua-text',
  };

  return (
    <div className={cn('p-4 border border-lingua-border rounded-lg bg-lingua-bg-card', className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-lingua-text-muted">{title}</p>
          <p className="text-2xl font-bold text-lingua-text">{value}</p>
          {change && (
            <p className={cn('text-xs font-medium flex items-center', trendColors[change.trend])}>
              <span className="mr-1">
                {change.trend === 'up' && '↗'}
                {change.trend === 'down' && '↘'}
                {change.trend === 'neutral' && '→'}
              </span>
              {Math.abs(change.value)}%
            </p>
          )}
        </div>
        {data && data.length > 0 && (
          <div className="ml-4">
            <Sparkline data={data} width={60} height={30} color={color} />
          </div>
        )}
      </div>
    </div>
  );
};

// Data Table with sorting and filtering capabilities
interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: DataTableColumn<T>[];
  sortable?: boolean;
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  sortKey?: keyof T;
  sortDirection?: 'asc' | 'desc';
  loading?: boolean;
  emptyMessage?: string;
}

function DataTable<T extends Record<string, any>>({
  className,
  data,
  columns,
  sortable = true,
  onSort,
  sortKey,
  sortDirection = 'asc',
  loading = false,
  emptyMessage = 'No data available',
  ...props
}: DataTableProps<T>) {
  const handleSort = (key: keyof T) => {
    if (!sortable || !onSort) return;

    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, newDirection);
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="border border-lingua-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-lingua-bg-surface">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium text-lingua-text-muted uppercase tracking-wider',
                    column.sortable && sortable && 'cursor-pointer hover:bg-lingua-bg-surface-hover',
                    column.width && `w-[${column.width}]`
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortable && sortKey === column.key && (
                      <span className="text-lingua-text-muted">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-lingua-border">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-lingua-primary"></div>
                    <span className="ml-2 text-lingua-text-muted">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-lingua-text-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-lingua-bg-surface-hover">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-4 py-3 text-sm text-lingua-text"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key])
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export {
  BarChart,
  LineChart,
  PieChart,
  ProgressRing,
  Sparkline,
  MetricCardWithSparkline,
  DataTable,
};

export type {
  BarChartProps,
  LineChartProps,
  PieChartProps,
  ProgressRingProps,
  SparklineProps,
  MetricCardWithSparklineProps,
  DataTableProps,
  DataTableColumn,
};