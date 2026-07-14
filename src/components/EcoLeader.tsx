/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Trees, 
  Trophy, 
  User, 
  Award, 
  Flame, 
  Plus, 
  RotateCcw,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { EcoLog, ClassRank } from '../types';

export default function EcoLeader() {
  const [selectedClass, setSelectedClass] = useState("5학년 2반");
  const [userPoints, setUserPoints] = useState(38); // Starting point for the tree simulation
  const [userSavedCarbon, setUserSavedCarbon] = useState(4.56); // Starting kg CO2
  const [personalLogs, setPersonalLogs] = useState<EcoLog[]>([
    { id: "log-1", studentClass: "5학년 2반", leftoverLevel: "NONE", carbonSavedGrams: 120, timestamp: "어제" },
    { id: "log-2", studentClass: "5학년 2반", leftoverLevel: "LITTLE", carbonSavedGrams: 80, timestamp: "3일 전" },
    { id: "log-3", studentClass: "5학년 2반", leftoverLevel: "NONE", carbonSavedGrams: 120, timestamp: "지난 수다날" },
  ]);

  // Initial Class Rankings
  const [classRankings, setClassRankings] = useState<ClassRank[]>([
    { className: "5학년 2반", participationRate: 98, cleanPlateCount: 245, co2SavedKg: 29.4 },
    { className: "6학년 1반", participationRate: 92, cleanPlateCount: 220, co2SavedKg: 26.4 },
    { className: "4학년 3반", participationRate: 85, cleanPlateCount: 198, co2SavedKg: 23.7 },
    { className: "5학년 1반", participationRate: 80, cleanPlateCount: 164, co2SavedKg: 19.6 },
    { className: "6학년 2반", participationRate: 74, cleanPlateCount: 140, co2SavedKg: 16.8 }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  // Core calculations for tree growth simulation
  // Max tree level is 5
  const getTreeStage = (points: number) => {
    if (points < 20) return { level: 1, name: "어린 씨앗 🌱", heightClass: "h-12 w-12", color: "bg-emerald-300" };
    if (points < 40) return { level: 2, name: "파릇파릇 새싹 🌿", heightClass: "h-20 w-16", color: "bg-emerald-400" };
    if (points < 65) return { level: 3, name: "튼튼한 아기나무 🌳", heightClass: "h-32 w-28", color: "bg-emerald-500" };
    if (points < 95) return { level: 4, name: "풍성한 푸른나무 🌲", heightClass: "h-44 w-36", color: "bg-emerald-600" };
    return { level: 5, name: "울창한 거대 에코나무 👑", heightClass: "h-56 w-44", color: "bg-teal-600" };
  };

  const currentTree = getTreeStage(userPoints);

  // Handler to log student leftovers
  const handleLogLeftovers = (level: 'NONE' | 'LITTLE' | 'MEDIUM' | 'MUCH') => {
    let carbonGrams = 0;
    let pointsToAdd = 0;
    let text = "";

    switch (level) {
      case 'NONE':
        carbonGrams = 120;
        pointsToAdd = 15;
        text = "잔반 제로 달성! 대단해요. 탄소 120g을 감축하고 에코 나무 포인트를 15점 획득했습니다! 🥳";
        break;
      case 'LITTLE':
        carbonGrams = 80;
        pointsToAdd = 10;
        text = "잔반을 거의 남기지 않았습니다. 탄소 80g을 감축하고 에코 포인트 10점을 획득했습니다! 👍";
        break;
      case 'MEDIUM':
        carbonGrams = 40;
        pointsToAdd = 5;
        text = "먹을 만큼 조절했군요. 탄소 40g을 감축하고 에코 포인트 5점을 획득했습니다. 다음엔 잔반 제로를 도전해봐요! 🙂";
        break;
      case 'MUCH':
        carbonGrams = 0;
        pointsToAdd = 0;
        text = "아쉬워요! 먹지 않는 반찬은 배식 단계에서 미리 거절하는 법을 배워봐요. 환경을 위해 함께 노력해요! 💪";
        break;
    }

    // Add personal logs
    const newLog: EcoLog = {
      id: `log-${Date.now()}`,
      studentClass: selectedClass,
      leftoverLevel: level,
      carbonSavedGrams: carbonGrams,
      timestamp: "방금 전"
    };

    setPersonalLogs(prev => [newLog, ...prev]);
    setUserPoints(prev => Math.min(prev + pointsToAdd, 120)); // cap at 120 for visual
    setUserSavedCarbon(prev => Math.round((prev + carbonGrams / 1000) * 100) / 100);

    // Update class rankings
    setClassRankings(prev => prev.map(rank => {
      if (rank.className === selectedClass) {
        const addedKg = carbonGrams / 1000;
        return {
          ...rank,
          cleanPlateCount: rank.cleanPlateCount + (level === 'NONE' ? 1 : 0),
          co2SavedKg: Math.round((rank.co2SavedKg + addedKg) * 10) / 10,
          participationRate: Math.min(rank.participationRate + 1, 100)
        };
      }
      return rank;
    }).sort((a, b) => b.co2SavedKg - a.co2SavedKg)); // keep rankings sorted by CO2 saved!

    // Trigger toast notification
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleResetUser = () => {
    setUserPoints(12);
    setUserSavedCarbon(1.44);
    setPersonalLogs([
      { id: "log-1", studentClass: "5학년 2반", leftoverLevel: "LITTLE", carbonSavedGrams: 80, timestamp: "어제" }
    ]);
    setNotification("시뮬레이터 진행이 리셋되었습니다.");
  };

  return (
    <div className="space-y-8">
      {/* Toast alert */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-5 py-4 bg-emerald-900 text-white rounded-2xl shadow-xl flex items-start gap-3 border border-emerald-800"
          >
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold">에코 성과 업데이트!</p>
              <p className="text-emerald-100 mt-1 leading-relaxed">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-display tracking-tight flex items-center gap-2">
            [교육용] 에코-리더 <span className="text-emerald-600 font-medium">잔반 제로 & 탄소발자국 기록</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">
            학생들이 매일 잔반 제로 실천(수요일은 다 먹는 날: 수다날 등)에 자율적으로 도전하고, 그로 인해 감축된 온실가스(탄소 발자국) 수치를 직접 체감하며 재미를 부여하는 자기주도적 에코 스쿨 식생활 교육용 솔루션입니다.
          </p>
        </div>
        <button 
          onClick={handleResetUser}
          className="p-1.5 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          처음부터 키우기
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Student Logging & Virtual Tree Growth */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">My Eco Tree Status</span>
                <h3 className="font-bold text-gray-800 text-base flex items-center gap-1">
                  나의 성장 지표: <span className="text-emerald-600">{currentTree.name}</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">도전하는 반:</span>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-700 focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="5학년 2반">5학년 2반</option>
                  <option value="6학년 1반">6학년 1반</option>
                  <option value="4학년 3반">4학년 3반</option>
                </select>
              </div>
            </div>

            {/* Simulated Tree Canvas */}
            <div className="bg-linear-to-b from-sky-50 to-emerald-50/50 rounded-xl h-72 border border-sky-100 relative overflow-hidden flex flex-col justify-end items-center pb-8 p-4">
              {/* Sun & Cloud Decor */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-amber-400/20 blur-xs flex items-center justify-center border border-amber-300/30">
                <div className="w-6 h-6 rounded-full bg-amber-400"></div>
              </div>
              <div className="absolute top-6 right-6 flex gap-1 bg-white/70 px-2 py-1 rounded-full text-[9px] font-semibold text-sky-700 border border-sky-100/40">
                <Zap className="w-3 h-3 text-sky-500 shrink-0" />
                수다날 탄소 버프 활성화 중!
              </div>

              {/* Carbon saved accumulator visualizer */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center bg-white/90 border border-emerald-100 rounded-2xl px-5 py-2 shadow-xs max-w-xs w-fit">
                <span className="text-[10px] text-gray-400 font-semibold block uppercase">내가 줄인 온실가스 (누적)</span>
                <div className="flex items-baseline justify-center gap-1 mt-0.5">
                  <span className="text-xl font-black text-emerald-800 font-mono">{userSavedCarbon}</span>
                  <span className="text-xs font-bold text-emerald-600">kg CO₂</span>
                </div>
              </div>

              {/* VIRTUAL TREE GRAPHICS (Built pure CSS & Tailwind) */}
              <div className="relative flex flex-col items-center justify-end h-48 w-full">
                {/* Soil Base */}
                <div className="w-32 h-2.5 rounded-full bg-amber-900/40 border border-amber-950/10 absolute bottom-0"></div>

                {/* Tree Trunk & Canopy with Animation */}
                <motion.div
                  key={userPoints}
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="flex flex-col items-center justify-end absolute bottom-1.5"
                >
                  {/* Tree Foliage (Canopy) */}
                  {currentTree.level >= 3 && (
                    <div className="relative flex justify-center">
                      {/* Central Leaf Globe */}
                      <div className={`rounded-full bg-emerald-600/90 glow-green shadow-inner ${
                        currentTree.level === 3 ? 'w-16 h-16 -mb-6' : currentTree.level === 4 ? 'w-24 h-24 -mb-10' : 'w-32 h-32 -mb-14'
                      }`}></div>
                      
                      {/* Left Leaf Globe */}
                      {currentTree.level >= 4 && (
                        <div className={`absolute -left-4 rounded-full bg-emerald-500/80 ${
                          currentTree.level === 4 ? 'w-12 h-12 top-4' : 'w-16 h-16 top-6'
                        }`}></div>
                      )}

                      {/* Right Leaf Globe */}
                      {currentTree.level >= 4 && (
                        <div className={`absolute -right-4 rounded-full bg-emerald-700/80 ${
                          currentTree.level === 4 ? 'w-12 h-12 top-6' : 'w-16 h-16 top-8'
                        }`}></div>
                      )}

                      {/* Sparkles on highest level */}
                      {currentTree.level === 5 && (
                        <div className="absolute -top-4 text-amber-400 text-sm animate-bounce">👑</div>
                      )}
                    </div>
                  )}

                  {/* Seed / Sprout Visuals (Level 1-2) */}
                  {currentTree.level === 1 && (
                    <div className="w-6 h-6 rounded-full bg-amber-800/80 mb-1 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                  )}
                  {currentTree.level === 2 && (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200/50 flex items-center justify-center mb-1">
                      <Leaf className="w-5 h-5 text-emerald-500" />
                    </div>
                  )}

                  {/* Trunk */}
                  <div className={`bg-amber-800/95 rounded-t-md mx-auto ${
                    currentTree.level === 1 ? 'w-1.5 h-4' : 
                    currentTree.level === 2 ? 'w-2.5 h-8' : 
                    currentTree.level === 3 ? 'w-4 h-16' : 
                    currentTree.level === 4 ? 'w-5 h-20' : 'w-6.5 h-24'
                  }`}></div>
                </motion.div>
              </div>

              {/* Progress bar inside the tree box */}
              <div className="absolute bottom-2 left-6 right-6">
                <div className="flex justify-between text-[10px] text-emerald-950 font-bold mb-1">
                  <span>다음 나무 진화</span>
                  <span>{userPoints} / 120 XP</span>
                </div>
                <div className="w-full bg-emerald-200/50 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${(userPoints / 120) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Input Action Panel: Tap Leftover Level */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                식사 정리 후! 급식 식판 잔반 선택하기
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { level: 'NONE', label: '잔반 제로! 🍱', color: 'hover:border-emerald-500 hover:bg-emerald-50 text-emerald-800' },
                  { level: 'LITTLE', label: '아주 조금 남김 🤏', color: 'hover:border-teal-500 hover:bg-teal-50 text-teal-800' },
                  { level: 'MEDIUM', label: '보통 남김 🥢', color: 'hover:border-amber-400 hover:bg-amber-50 text-amber-800' },
                  { level: 'MUCH', label: '많이 남김 🥣', color: 'hover:border-gray-400 hover:bg-gray-50 text-gray-500' }
                ].map((act, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleLogLeftovers(act.level as any)}
                    className={`p-3.5 text-xs font-bold rounded-xl border border-gray-200 transition-all duration-200 bg-white shadow-2xs active:scale-95 ${act.color} text-center`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: High School Class Standings Leaderboard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-emerald-600" />
                선도학교 학급별 탄소 저감 순위
              </h3>
              <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">
                수다날 실시간
              </span>
            </div>

            <div className="space-y-3">
              {classRankings.map((rank, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    rank.className === selectedClass
                      ? 'bg-emerald-50/70 border-emerald-200/60 shadow-2xs'
                      : 'bg-gray-50/50 border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      idx === 0 ? 'bg-amber-100 text-amber-800' : 
                      idx === 1 ? 'bg-slate-200 text-slate-700' :
                      idx === 2 ? 'bg-amber-700/10 text-amber-900' : 'text-gray-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{rank.className}</h4>
                      <p className="text-[9px] text-gray-400 mt-0.5">
                        참여율: {rank.participationRate}% · 잔반제로 {rank.cleanPlateCount}회
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-xs text-emerald-700">
                      {rank.co2SavedKg}
                    </span>
                    <span className="text-[9px] text-emerald-600 font-medium ml-0.5">kg CO₂ ↓</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50/30 border border-emerald-100/40 rounded-xl p-3 text-[11px] text-emerald-800 leading-normal">
              💡 <b>생태교육적 효과:</b> 학생들은 잔반 저감량을 <b>탄소 가치(CO₂)</b>로 즉시 변환하여 실감함으로써 단순히 '남기지 말라'는 강요 대신, <b>자연보호 실천가</b>로서의 긍지를 가지고 급식실을 방문하게 됩니다.
            </div>
          </div>

          {/* Personal Record Log */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-gray-800 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-400" />
              나의 에코-리더 도전 기록
            </h3>
            <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
              {personalLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-center text-xs p-2.5 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${log.leftoverLevel === 'NONE' ? 'bg-emerald-500' : 'bg-teal-400'}`}></span>
                    <span className="font-bold text-gray-700">
                      {log.leftoverLevel === 'NONE' ? '잔반 제로 달성!' : '아주 조금 남김'}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center text-gray-400 text-[10px]">
                    <span>{log.timestamp}</span>
                    <span className="font-mono text-emerald-600 font-bold bg-white border border-emerald-100 px-1.5 py-0.5 rounded text-[9px]">
                      +{log.carbonSavedGrams}g CO₂
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
