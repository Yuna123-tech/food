/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Utensils, 
  ShieldAlert, 
  TrendingDown, 
  Flame, 
  Download, 
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';

import ConceptOverview from './components/ConceptOverview';
import TodaysPick from './components/TodaysPick';
import SmartCCP from './components/SmartCCP';
import EcoLeader from './components/EcoLeader';
import AdminConsole from './components/AdminConsole';

export default function App() {
  const [activeTab, setActiveTab] = useState<'CONCEPT' | 'STUDENT' | 'CCP' | 'ECO' | 'ADMIN'>('CONCEPT');
  const [showQuickGuide, setShowQuickGuide] = useState(true);

  // Tabs structure
  const tabs = [
    { id: 'CONCEPT' as const, label: '🏫 정책 가치관 소개', desc: '선도학교 개념 및 핵심 가치' },
    { id: 'STUDENT' as const, label: '🍱 [학생용] 오늘의 픽', desc: '선호도 조사 & 식수 예측' },
    { id: 'CCP' as const, label: '🛡️ [조리실] 스마트 CCP', desc: '디지털 HACCP 위생 관리' },
    { id: 'ECO' as const, label: '🌱 [교육용] 에코-리더', desc: '잔반 제로 & 탄소 저감' },
    { id: 'ADMIN' as const, label: '📊 [관리자] 성과 분석', desc: '정책 효과 시뮬레이터' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans antialiased flex flex-col justify-between">
      
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-600 font-black tracking-widest block uppercase">School Lunch Innovation</span>
              <h1 className="text-base font-extrabold text-gray-900 font-display leading-tight">학교 급식 정책 선도학교 교육지원관</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-gray-500">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
              교육자료 시뮬레이션 통합 버전
            </span>
            <span className="text-gray-300">|</span>
            <span>선도초등학교 급식운영위원회</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Navigation Selector Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-3 rounded-xl transition-all duration-200 text-left flex flex-col justify-center relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'hover:bg-gray-50 bg-white border border-transparent'
                  }`}
                >
                  <span className={`font-bold text-xs md:text-sm ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                    {tab.label}
                  </span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-gray-400 font-medium'}`}>
                    {tab.desc}
                  </span>
                  {isSelected && (
                    <div className="absolute right-2 bottom-2 w-1.5 h-1.5 rounded-full bg-emerald-300"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Content Section */}
        <div className="bg-white rounded-3xl border border-gray-100/80 p-6 md:p-8 shadow-xs min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'CONCEPT' && <ConceptOverview />}
              {activeTab === 'STUDENT' && <TodaysPick />}
              {activeTab === 'CCP' && <SmartCCP />}
              {activeTab === 'ECO' && <EcoLeader />}
              {activeTab === 'ADMIN' && <AdminConsole />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic Static Training Document Panel */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-gray-900 font-display">
                학교 급식 정책 선도학교 핵심 가치 및 교육 자료 매뉴얼
              </h3>
            </div>
            <button 
              onClick={() => setShowQuickGuide(prev => !prev)}
              className="text-xs text-emerald-600 font-bold hover:underline"
            >
              {showQuickGuide ? '매뉴얼 접기 ▲' : '매뉴얼 펼치기 ▼'}
            </button>
          </div>

          <AnimatePresence>
            {showQuickGuide && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-6 text-sm text-gray-650 leading-relaxed"
              >
                <p>
                  본 교육자료는 교육부 및 시도교육청에서 권장하는 <b>‘자율선택급식’</b>과 <b>‘스마트 위생 관리(HACCP)’</b> 지침을 학교 현장에서 알기 쉽게 실천할 수 있도록 설계된 통합 디지털 시뮬레이터입니다. 각 구성원별 핵심 교육 내용을 반드시 숙지하고 적극 동참해 주시길 바랍니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2.5">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">학생 대상 교육안</span>
                    <h4 className="font-bold text-gray-800 text-sm">🍽️ 스스로 선택하고 책임지는 식판</h4>
                    <p className="text-xs text-gray-500 leading-normal">
                      자율선택급식을 이용할 때는 자신이 <b>먹을 수 있는 정량만큼만 정성껏 배식</b> 받습니다. 오늘의 픽 모바일 투표에 적극 참여하여 맛 선호도를 표명하고 조리원들의 과잉 생산 부담을 덜어주는 주체적인 선도학생이 됩니다.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2.5">
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">조리 종사자 교육안</span>
                    <h4 className="font-bold text-gray-800 text-sm">🛡️ 스마트 계측 및 행정 최소화</h4>
                    <p className="text-xs text-gray-500 leading-normal">
                      위험 중심점인 CCP(검수, 가열, 보온) 온도를 디지털 기기를 통해 간편하게 터치식으로 보관합니다. 측정 한계 온도가 벗어날 시 시스템 경보에 귀를 기울이고 <b>재가열 등 즉각적인 보완조치</b>를 수행해 전산 일지 기록을 유지합니다.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">교육가정 및 영양사 교육안</span>
                    <h4 className="font-bold text-gray-800 text-sm">🌱 탄소 발자국과 경제적 환원</h4>
                    <p className="text-xs text-gray-500 leading-normal">
                      매주 수요일 다 먹는 날(수다날)에 <b>‘에코-리더’</b> 챌린지를 적용하여, 잔반 없는 교실 랭킹을 관리합니다. 학생들에게 잔반 제거가 환경 보호(이산화탄소 저감)와 직결됨을 시각적인 푸른 나무 육성을 통해 주지시켜 주십시오.
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
                  <div>이 가이드북은 누구나 열람할 수 있는 공용 교육 지침입니다.</div>
                  <div className="flex gap-1.5 items-center text-emerald-700 font-bold">
                    <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                    안심 급식 · 푸른 환경 · 맛있는 하루
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-850 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="font-bold text-slate-300">학교 급식 정책 선도학교 교육지원관</p>
          <p className="max-w-2xl mx-auto text-slate-500">
            본 통합 시뮬레이터는 학교 급식 정책인 "학생의 자율권 존중" 및 "조리원 노동 환경 개선과 위생 관리 효율화"를 동시에 실천할 수 있는 3대 연동형 혁신 앱 모델의 가치를 설명하기 위한 가상 환경 실증형 교육 포털입니다.
          </p>
          <p className="text-[10px] text-slate-600">© 2026 School Lunch Policy Innovation Committee. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
