'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function Card({ children, className, href, onClick, interactive = false }: CardProps) {
  const baseClasses = cn(
    'bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden',
    interactive && 'cursor-pointer',
    className
  );

  const content = (
    <motion.div
      className={baseClasses}
      whileHover={
        interactive
          ? {
              y: -2,
              borderColor: 'rgb(63 63 70)', // zinc-700
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
            }
          : {}
      }
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-5 py-4 border-b border-zinc-800', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-5 py-4 border-t border-zinc-800 bg-zinc-900/50', className)}>
      {children}
    </div>
  );
}

// Stats Card with animated number
interface StatsCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon?: ReactNode;
  className?: string;
}

export function StatsCard({ label, value, change, icon, className }: StatsCardProps) {
  return (
    <motion.div
      className={cn('bg-zinc-900 border border-zinc-800 rounded-xl p-5', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <motion.p
            className="text-2xl font-bold text-white mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {value}
          </motion.p>
          {change && (
            <p
              className={cn(
                'text-xs mt-1 flex items-center gap-1',
                change.trend === 'up' ? 'text-green-400' : 'text-red-400'
              )}
            >
              <span>{change.trend === 'up' ? '↑' : '↓'}</span>
              <span>{Math.abs(change.value)}%</span>
              <span className="text-zinc-500">vs last week</span>
            </p>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Empty State Card
interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      className={cn(
        'bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-4 text-zinc-600"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {action.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
            >
              {action.label}
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
