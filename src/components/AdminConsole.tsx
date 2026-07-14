/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Leaf, 
  Clock, 
  Scale, 
  Coins,
  Cpu,
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function AdminConsole() {
  // Simulator Input Parameters
  const [studentCount, setStudentCount] = useState(450);
  const [weeklyChoiceDays, setWeeklyChoiceDays] = useState(3);
  const [useSmartHaccp, setUseSmartHaccp] = useState(true);

  // Calculated impact outputs
  const dailyDisposalCostPerStudent = 350; // KRW per student conventional waste treatment cost
  const conventionalWasteTons_Year = Math.round((studentCount * 0.12 * 190) / 1000 * 10) / 10; // 120g per day per student, 190 school days
  const leadingSchoolWasteTons_Year = Math.round((studentCount * (0.12 * (1 - (weeklyChoiceDays * 0.12))) * 190) / 1000 * 10) / 10;
  const savedDisposalCost_Won = Math.round((conventionalWasteTons_Year - leadingSchoolWasteTons_Year) * 1000 * 350).toLocaleString('ko-KR');

  const co2ReductionKg_Year = Math.round((conventionalWasteTons_Year - leadingSchoolWasteTons_Year) * 1000 * 0.85);
  const equivalentTreeCount = Math.round(co2ReductionKg_Year / 6.6); // 1 young pine tree absorbs 6.6kg CO2/year

  const monthlyStaffAdminHoursSaved = useSmartHaccp ? Math.round((45 / 60) * 20 * 4) : 0; // 45 mins saved per day, 20 cooking days/month, 4 staff members

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display tracking-tight flex items-center gap-2">
          [관리자용] 급식 정책 <span className="text-emerald-600 font-medium">종합 성과 분석 및 효과 산출기</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1.5">
          자율선택급식(학생 오늘의 픽), 스마트 위생 관리(조리 스마트 CCP), 탄소 중립 참여(에코-리더)가 유기적으로 연합하였을 때 
          학교에 발생할 수 있는 <b>재정적, 행정적, 환경적 성과</b>를 미리 계산해볼 수 있는 정책 효과 기획 산출 보드입니다.
        </p>
      </div>

      {/* Interactive Simulator Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="bg-emerald-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-sm">우리 학교 맞춤형 정책 도입 성과 모의 시뮬레이터</h3>
          </div>
          <span className="text-xs bg-emerald-900/50 px-2.5 py-1 rounded-md text-emerald-100 font-bold border border-emerald-700/30">
            실시간 영향 시뮬레이션
          </span>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-5 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">우리 학교 환경 변수 설정</h4>

            <div className="space-y-4">
              {/* Student count range slider */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex justify-between">
                  <span>학교 급식 학생 수</span>
                  <span className="text-emerald-700 font-mono font-black">{studentCount}명</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="10"
                  value={studentCount}
                  onChange={(e) => setStudentCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Weekly Choice Menu Days */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">
                  주간 자율선택식단 운영 횟수
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setWeeklyChoiceDays(day)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        weeklyChoiceDays === day
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-2xs'
                          : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {day}일
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">주 3일 이상 제공 시 학생 기호 보장이 원활해지며 잔반이 급감합니다.</span>
              </div>

              {/* Smart HACCP toggle */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-gray-700 block">
                  스마트 CCP 위생 전산 장비 도입 여부
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setUseSmartHaccp(true)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      useSmartHaccp
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-2xs'
                        : 'border-gray-200 text-gray-500 bg-white'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    도입하기 (권장)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseSmartHaccp(false)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      !useSmartHaccp
                        ? 'border-rose-600 bg-rose-50/50 text-rose-800 shadow-2xs'
                        : 'border-gray-200 text-gray-500 bg-white'
                    }`}
                  >
                    미도입 (수기 작성)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest block">예상 연간 성과 리포트</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Financial Saving */}
              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 space-y-1.5 flex flex-col justify-between">
                <div>
                  <Coins className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="text-xs font-bold text-gray-600">음식물 쓰레기 처리 예산 절감액</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-mono font-black text-emerald-800">
                    ₩ {savedDisposalCost_Won}
                  </span>
                  <span className="text-[10px] text-gray-500">원 / 년</span>
                </div>
              </div>

              {/* Carbon Reduction */}
              <div className="p-4 rounded-xl border border-teal-100 bg-teal-50/20 space-y-1.5 flex flex-col justify-between">
                <div>
                  <Leaf className="w-5 h-5 text-teal-600 mb-1" />
                  <span className="text-xs font-bold text-gray-600">온실가스 탄소 저감 기여량</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-mono font-black text-teal-800">
                      {co2ReductionKg_Year.toLocaleString('ko-KR')}
                    </span>
                    <span className="text-[10px] text-gray-500">kg CO₂ / 년</span>
                  </div>
                  <span className="text-[10px] text-teal-600 font-medium mt-1">
                    🌳 어린 소나무 약 {equivalentTreeCount}그루 식재 효과와 동일
                  </span>
                </div>
              </div>

              {/* Administrative Workload saved */}
              <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 space-y-1.5 flex flex-col justify-between">
                <div>
                  <Clock className="w-5 h-5 text-sky-600 mb-1" />
                  <span className="text-xs font-bold text-gray-600">조리종사원 서류 업무 절감량</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-mono font-black text-sky-800">
                    {monthlyStaffAdminHoursSaved}
                  </span>
                  <span className="text-[10px] text-gray-500">시간 / 월</span>
                </div>
              </div>

              {/* Waste Reduced Weight */}
              <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/20 space-y-1.5 flex flex-col justify-between">
                <div>
                  <Scale className="w-5 h-5 text-amber-600 mb-1" />
                  <span className="text-xs font-bold text-gray-600">연간 급식 폐기물 중량 감축</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-mono font-black text-amber-800">
                      {Math.round((conventionalWasteTons_Year - leadingSchoolWasteTons_Year) * 10) / 10}
                    </span>
                    <span className="text-[10px] text-gray-500">톤 (Ton) / 년</span>
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1">기존: {conventionalWasteTons_Year}톤 ➔ 개선: {leadingSchoolWasteTons_Year}톤</span>
                </div>
              </div>
            </div>

            {/* Simulated policy advice output box */}
            <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-2">
              <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold text-slate-800 uppercase inline-block">
                선도학교 운영 컨설팅 진단 소견
              </span>
              <p className="text-xs text-gray-700 leading-relaxed">
                학생 수 <b>{studentCount}명</b> 규모의 우리 학교에서 자율 선택 식단을 <b>주 {weeklyChoiceDays}일</b> 제공하면, 
                학생들의 급식 만족도가 획기적으로 상승함과 동시에 연간 약 <b>{(conventionalWasteTons_Year - leadingSchoolWasteTons_Year).toFixed(1)}톤</b>의 음식 폐기물이 사전에 절감됩니다. 
                {useSmartHaccp 
                  ? ` 추가로 스마트 HACCP 위생 기록판 도입을 선택하셨으므로 조리종사원이 월 총 ${monthlyStaffAdminHoursSaved}시간의 서류 작성 부담에서 벗어나 온전히 '안전 조리 및 위생 가공'에 집중할 수 있게 되어, 조리 품질 향상과 근골격계 안전사고 0건을 달성할 것입니다.`
                  : " 단, 스마트 HACCP 위생 장비가 도입되지 않을 시 조리종사원의 수기 장부 작성 부담이 지속되므로 조리실 스마트화 지원금 제도를 활용해 태블릿 보급을 추진할 것을 강력 권고합니다."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
