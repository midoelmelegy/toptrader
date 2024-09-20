'use client'

import React, { ReactNode } from 'react'

interface CustomScrollAreaProps {
  children: ReactNode
  className?: string
  height?: string
  width?: string
}

export default function CustomScrollArea({ children, className = '', height = '200px', width = '100%' }: CustomScrollAreaProps) {
  return (
    <div
      className={`custom-scroll-area ${className}`}
      style={{
        height,
        width,
        overflow: 'auto',
        position: 'relative',
        borderRadius: '0.375rem',
        border: '1px solid #e2e8f0',
      }}
    >
      <div className="custom-scroll-area-content" style={{ padding: '1rem' }}>
        {children}
      </div>
      <style jsx>{`
        .custom-scroll-area::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scroll-area::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 0.375rem;
        }
        .custom-scroll-area::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 0.375rem;
        }
        .custom-scroll-area::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  )
}