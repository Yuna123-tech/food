/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Vote, 
  Smile, 
  ThumbsUp, 
  TrendingUp, 
  Utensils, 
  Sparkles, 
  AlertCircle, 
  Check, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { MenuItem } from '../types';

export default function TodaysPick() {
  // Preset menu datasets for different days to let users experiment
  const menuPresets = [
    {
      dayName: "월요일 (한식 대첩)",
      optionA: {
        id: "mon-a",
        name: "불타는 매콤 치즈 닭갈비",
        category: "A",
        description: "청양고추로 알싸하게 매운 양념에 모짜렐라 치즈를 듬뿍 얹은 매콤 고소한 닭갈비",
        votes: 142,
        rating: 4.6
      } as MenuItem,
      optionB: {
        id: "mon-b",
        name: "순한 궁중 데리야끼 안동찜닭",
        category: "B",
        description: "간장의 감칠맛과 흑설탕의 단맛이 완벽한 조화를 이루는 달콤 담백한 영양 안동찜닭",
        votes: 84,
        rating: 4.4
      } as MenuItem
    },
    {
      dayName: "화요일 (면류 특별식)",
      optionA: {
        id: "tue-a",
        name: "얼큰 칼칼 짬뽕 우동",
        category: "A",
        description: "오징어와 홍합을 볶아 진한 불맛을 내어 스트레스를 한방에 풀어주는 화끈한 짬뽕 국물 우동",
        votes: 165,
        rating: 4.7
      } as MenuItem,
      optionB: {
        id: "tue-b",
        name: "깔끔 담백 사골 가쓰오 가락국수",
        category: "B",
        description: "24시간 푹 곤 사골 육수에 일본식 가쓰오부시를 블렌딩하여 국물이 깊고 개운한 순한 가락국수",
        votes: 52,
        rating: 4.2
      } as MenuItem
    }
  ];

  const [currentPresetIndex, setCurrentPresetIndex] = useState(0);
  const activePreset = menuPresets[currentPresetIndex];

  // Simulator Interactive States
  const [votesA, setVotesA] = useState(activePreset.optionA.votes);
  const [votesB, setVotesB] = useState(activePreset.optionB.votes);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  
  // Satisfaction States
  const [rating, setRating] = useState<number>(0);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<string[]>([
    "매운맛이 딱 먹기 좋았어요!",
    "치즈가 듬뿍 들어있어서 최고였습니다.",
    "역시 화요일엔 국수 선택 급식이 진리네요."
  ]);

  const totalVotes = votesA + votesB;
  const percentageA = Math.round((votesA / (totalVotes || 1)) * 100);
  const percentageB = 100 - percentageA;

  // Handler to vote
  const handleVote = (option: 'A' | 'B') => {
    if (hasVoted) return;
    if (option === 'A') {
      setVotesA(prev => prev + 1);
    } else {
      setVotesB(prev => prev + 1);
    }
    setSelectedOption(option);
    setHasVoted(true);
  };

  // Handler to submit satisfaction
  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setSurveySubmitted(true);
    if (comment.trim()) {
      setCommentList(prev => [comment, ...prev]);
      setComment("");
    }
  };

  // Switch presets
  const handlePresetChange = (idx: number) => {
    setCurrentPresetIndex(idx);
    setVotesA(menuPresets[idx].optionA.votes);
    setVotesB(menuPresets[idx].optionB.votes);
    setHasVoted(false);
    setSelectedOption(null);
    setRating(0);
    setSurveySubmitted(false);
  };

  const handleReset = () => {
    setVotesA(activePreset.optionA.votes);
    setVotesB(activePreset.optionB.votes);
    setHasVoted(false);
    setSelectedOption(null);
    setRating(0);
    setSurveySubmitted(false);
  };

  // Educational calculations for dietitian's view
  const schoolTotalStudents = 320; // Assume 320 expected students
  const forecastShareA = percentageA / 100;
  const forecastShareB = percentageB / 100;
  
  // Predict ingredient quantities (e.g., 150g meat per portion of Choice A, 140g per Choice B)
  const requiredMeatA_kg = Math.round((schoolTotalStudents * forecastShareA * 0.15) * 10) / 10;
  const requiredMeatB_kg = Math.round((schoolTotalStudents * forecastShareB * 0.14) * 10) / 10;
  const standardSingleMeat_kg = Math.round((schoolTotalStudents * 0.15) * 10) / 10;

  // Leftover saving calculation: 
  // Predicting exact ratio cuts leftovers by roughly 80% compared to standard batch cooking!
  const predictedLeftovers_kg = Math.round((schoolTotalStudents * 0.02) * 10) / 10; // 2% waste
  const conventionalLeftovers_kg = Math.round((schoolTotalStudents * 0.12) * 10) / 10; // 12% waste
  const savedLeftovers_kg = Math.round((conventionalLeftovers_kg - predictedLeftovers_kg) * 10) / 10;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Simulated Student Mobile Interface */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            실시간 스마트폰 화면 데모
          </span>
          <p className="text-xs text-gray-400 mt-1">마우스로 직접 터치하며 투표해 보세요.</p>
        </div>

        {/* Mobile Phone Device Frame wrapper */}
        <div className="w-full max-w-[340px] h-[640px] bg-slate-900 rounded-[40px] p-3.5 shadow-xl border-4 border-slate-800 relative overflow-hidden flex flex-col select-none">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-2xl z-40 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2"></div>
            <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
          </div>

          {/* Screen Content */}
          <div className="bg-slate-50 w-full h-full rounded-[28px] overflow-y-auto flex flex-col pt-6 font-sans text-gray-800 text-sm">
            {/* App Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                  픽
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-none">오늘의 픽</h4>
                  <span className="text-[9px] text-gray-400 font-medium">자율선택급식 선호도조사</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button 
                  onClick={handleReset}
                  className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
                  title="새 투표하기"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* App Body */}
            <div className="p-4 space-y-4 flex-1">
              {/* Menu Banner */}
              <div className="bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-3.5 shadow-xs">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium inline-block mb-1.5">
                  실시간 자율 급식 투표
                </span>
                <h5 className="font-bold text-sm flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" />
                  {activePreset.dayName}
                </h5>
                <p className="text-[10px] text-emerald-100 mt-1">원하는 식단을 골라주시면 조리량이 자동 조절됩니다.</p>
              </div>

              {/* Voting Zone */}
              <div className="space-y-3">
                <h6 className="font-bold text-xs text-gray-400 uppercase tracking-wider">메뉴 선택 (A vs B)</h6>
                
                {/* Option A Card */}
                <button
                  disabled={hasVoted}
                  onClick={() => handleVote('A')}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden flex flex-col gap-1.5 ${
                    hasVoted 
                      ? selectedOption === 'A'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                        : 'border-gray-200 bg-white opacity-60'
                      : 'border-gray-200 bg-white hover:border-emerald-200 hover:shadow-xs active:scale-[0.98]'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-[9px] font-bold">
                      매콤 메뉴
                    </span>
                    {hasVoted && selectedOption === 'A' && (
                      <span className="p-0.5 bg-emerald-500 text-white rounded-full">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h6 className="font-bold text-xs text-gray-900">{activePreset.optionA.name}</h6>
                  <p className="text-[10px] text-gray-500 leading-normal">{activePreset.optionA.description}</p>
                  
                  {hasVoted && (
                    <div className="w-full mt-2">
                      <div className="flex justify-between text-[10px] font-semibold text-gray-600 mb-1">
                        <span>득표율</span>
                        <span>{percentageA}% ({votesA}표)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percentageA}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </button>

                {/* Option B Card */}
                <button
                  disabled={hasVoted}
                  onClick={() => handleVote('B')}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden flex flex-col gap-1.5 ${
                    hasVoted 
                      ? selectedOption === 'B'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                        : 'border-gray-200 bg-white opacity-60'
                      : 'border-gray-200 bg-white hover:border-emerald-200 hover:shadow-xs active:scale-[0.98]'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[9px] font-bold">
                      순한 메뉴
                    </span>
                    {hasVoted && selectedOption === 'B' && (
                      <span className="p-0.5 bg-emerald-500 text-white rounded-full">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h6 className="font-bold text-xs text-gray-900">{activePreset.optionB.name}</h6>
                  <p className="text-[10px] text-gray-500 leading-normal">{activePreset.optionB.description}</p>
                  
                  {hasVoted && (
                    <div className="w-full mt-2">
                      <div className="flex justify-between text-[10px] font-semibold text-gray-600 mb-1">
                        <span>득표율</span>
                        <span>{percentageB}% ({votesB}표)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percentageB}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </button>
              </div>

              {/* Dynamic Step 2: Post-Meal Satisfaction Survey */}
              <AnimatePresence>
                {hasVoted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white border border-gray-100 rounded-xl p-3.5 space-y-3"
                  >
                    <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs">
                      <Smile className="w-3.5 h-3.5" />
                      오늘 급식 한마디 (식사 후 조사)
                    </div>

                    {!surveySubmitted ? (
                      <form onSubmit={handleSubmitSurvey} className="space-y-3">
                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">식사는 만족스러우셨나요?</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-base transition-transform active:scale-125 ${
                                  star <= rating ? 'text-amber-400' : 'text-gray-200'
                                }`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="의견을 적어주세요 (예: 치즈 최고)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full text-[11px] p-2 bg-gray-50 border border-gray-150 rounded-md focus:outline-hidden focus:border-emerald-500"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={rating === 0}
                          className="w-full py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                          만족도 제출하기
                        </button>
                      </form>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="text-center py-2 space-y-1.5"
                      >
                        <div className="inline-flex p-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-[11px] font-bold text-emerald-800">피드백이 접수되었습니다!</p>
                        <p className="text-[9px] text-gray-400">잔식 예측과 영양 가이드 자료로 즉시 전달됩니다.</p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Explanations and Dynamic Admin Panel Dashboard */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-display tracking-tight">
            [학생용] 오늘의 픽 <span className="text-emerald-600 font-medium">메뉴 투표 & 만족도조사</span>
          </h2>
        </div>

        {/* Preset Selector */}
        <div className="flex gap-2.5 p-1.5 bg-gray-100 rounded-lg w-fit">
          {menuPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetChange(idx)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                currentPresetIndex === idx 
                  ? 'bg-white text-gray-900 shadow-xs' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {preset.dayName}
            </button>
          ))}
        </div>

        {/* Dietitian Backstage Analytics Cockpit */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="bg-slate-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              급식소 실시간 수요예측 백스테이지 (영양사 및 조리용 화면)
            </h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
              연동 완료
            </span>
          </div>

          <div className="p-6 space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                <span className="text-xs font-semibold text-emerald-800 block mb-1">A 식단 예상 식수</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-emerald-950">
                    {Math.round(schoolTotalStudents * forecastShareA)}
                  </span>
                  <span className="text-xs text-emerald-700">명 ({percentageA}%)</span>
                </div>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                <span className="text-xs font-semibold text-amber-800 block mb-1">B 식단 예상 식수</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-amber-950">
                    {Math.round(schoolTotalStudents * forecastShareB)}
                  </span>
                  <span className="text-xs text-amber-700">명 ({percentageB}%)</span>
                </div>
              </div>

              <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100/50">
                <span className="text-xs font-semibold text-sky-800 block mb-1">금일 잔반 절감 예상</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-sky-950">-{savedLeftovers_kg}</span>
                  <span className="text-xs text-sky-700">kg (약 {Math.round(savedLeftovers_kg * 0.12 * 100)}% ↓)</span>
                </div>
              </div>
            </div>

            {/* Calculations and predictions detail */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                선택 급식에 따른 소요 식자재(육류) 자동 산출법
              </h4>
              
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-150 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500 block mb-1">A 식단 닭고기 필요량:</span>
                    <p className="font-mono font-bold text-gray-800 text-sm">
                      {requiredMeatA_kg} kg <span className="font-sans text-xs text-gray-400 font-normal">(인당 150g 계산)</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">B 식단 닭고기 필요량:</span>
                    <p className="font-mono font-bold text-gray-800 text-sm">
                      {requiredMeatB_kg} kg <span className="font-sans text-xs text-gray-400 font-normal">(인당 140g 계산)</span>
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200/60 pt-3 flex flex-col sm:flex-row justify-between text-xs gap-2">
                  <div className="text-gray-600">
                    💡 <b>기존 방식 대비 장점:</b> 전체 {schoolTotalStudents}명 분을 임의로 다 만들지 않고 투표율에 맞춰 <b>치즈 닭갈비 {requiredMeatA_kg}kg, 안동찜닭 {requiredMeatB_kg}kg</b>으로 배분함으로써 식재료비 낭비를 완벽 차단합니다!
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live Comments */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">실시간 전송된 만족도 피드백 ({commentList.length})</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {commentList.map((cmt, index) => (
                  <div key={index} className="flex gap-2.5 items-start p-2.5 bg-gray-50/70 border border-gray-100 rounded-lg text-xs text-gray-700">
                    <span className="text-amber-400 font-semibold shrink-0">★ 5</span>
                    <p className="leading-relaxed">{cmt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
