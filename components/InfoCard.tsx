"use client";

import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export default function InfoCard({ icon, title, subtitle }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="text-red-600 text-4xl mb-2">{icon}</div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}
