/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  category: 'A' | 'B'; // Selection Option A vs Option B
  description: string;
  votes: number;
  rating: number; // Satisfaction 0-5
}

export interface VoteSession {
  date: string;
  menuA: MenuItem;
  menuB: MenuItem;
  totalStudents: number;
  attendanceRate: number; // e.g. 0.95
}

export interface CCPCheckItem {
  id: string;
  ccpType: 'CCP-1' | 'CCP-2' | 'CCP-3';
  name: string;
  target: string; // Target standard e.g., "가열온도 85°C 이상 (패티 등 육류는 75°C)"
  currentValue: number;
  unit: string;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  manager: string;
  timestamp: string;
  isCompleted: boolean;
}

export interface EcoLog {
  id: string;
  studentClass: string;
  leftoverLevel: 'NONE' | 'LITTLE' | 'MEDIUM' | 'MUCH';
  carbonSavedGrams: number; // Grams of CO2 saved
  timestamp: string;
}

export interface ClassRank {
  className: string;
  participationRate: number;
  cleanPlateCount: number;
  co2SavedKg: number;
}
