/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Users, 
  Settings, 
  ShieldCheck, 
  TrendingDown, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';

export default function ConceptOverview() {
  const coreValues = [
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "학생의 자율권 존중",
      subtitle: "스스로 선택하는 식문화",
      description: "기존의 일방적 배식을 탈피하여 학생들이 직접 식사량과 메뉴(매운맛/순한맛, 주식 선택 등)를 자율적으로 조절하고 선택하는 능동적인 식생활 문화를 조성합니다.",
      highlights: [
        "기호와 섭취량에 맞춘 '자율선택형 급식' 확대",
        "자기주도적인 건강한 식습관 및 식생활 교육 강화",
        "수요자 중심 급식 만족도 실시간 반영"
      ],
      color: "from-emerald-50 h-to-emerald-100/50 border-emerald-100"
    },
    {
      icon: <Cpu className="w-8 h-8 text-sky-600" />,
      title: "조리 업무 효율화",
      subtitle: "안전하고 스마트한 일터",
      description: "급식 현장의 만성적인 구인난과 고강도 노동 문제를 해결하기 위해 디지털 기술을 도입하고 서류 작업을 자동화하여 쾌적하고 안전한 조리 환경을 구축합니다.",
      highlights: [
        "수기 위생 기록의 디지털화 (스마트 HACCP)",
        "반복적이고 번거로운 조리 단계 및 위생 관리 간소화",
        "근무 환경 개선을 통한 안전사고 및 피로도 급감"
      ],
      color: "from-sky-50 to-sky-100/50 border-sky-100"
    }
  ];

  const policyKeypoints = [
    {
      title: "자율선택급식",
      desc: "다양한 학생 기호를 반영해 맛과 영양의 균형을 이룬 주식 및 반찬 선택 메뉴를 제공합니다.",
      badge: "핵심 전략"
    },
    {
      title: "생태전환교육",
      desc: "지나친 잔반 발생이 환경에 미치는 악영향을 자각하고, 기후위기 시대를 극복할 식습관을 익힙니다.",
      badge: "가치 확산"
    },
    {
      title: "스마트 HACCP",
      desc: "HACCP 기준 위생 검사를 실시간 스마트 계측기로 자동 기록하고 관리해 안전을 극대화합니다.",
      badge: "기술 융합"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 p-8 md:p-12 text-white shadow-lg"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-700/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl"></div>
        
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            2026 급식정책 트렌드
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight">
            학교 급식 정책 <span className="text-emerald-300 font-extrabold">선도학교</span> 란?
          </h1>
          <p className="text-emerald-100/90 text-base md:text-lg leading-relaxed font-sans font-light">
            급식 수요자인 <b>학생의 주도적 자율권</b>을 보장하고, 급식 제공자인 <b>조리 종사자의 조리실 업무 생산성</b>을 대폭 향상하여, 모두가 만족하고 친환경을 함께 실천하는 미래형 안심 학교 급식 모델을 제안하는 선구적 학교입니다.
          </p>
        </div>
      </motion.div>

      {/* Core Pillars Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coreValues.map((value, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-8 rounded-2xl border bg-linear-to-b ${value.color} shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between space-y-6`}
          >
            <div className="space-y-4">
              <div className="p-3 bg-white w-14 h-14 rounded-xl flex items-center justify-content shadow-xs border border-gray-100">
                {value.icon}
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase block">{value.subtitle}</span>
                <h3 className="text-2xl font-bold text-gray-800 font-display tracking-tight">{value.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                {value.description}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-5 space-y-3">
              <h4 className="text-xs font-bold text-gray-500 tracking-widest uppercase">주요 추진 내용</h4>
              <ul className="space-y-2.5">
                {value.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Concepts Flow */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-xs"
      >
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 font-display flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            선도학교의 3대 핵심 키워드
          </h3>
          <p className="text-sm text-gray-500 mt-1">이 교육 프로그램은 아래 핵심 전략을 직접 실감할 수 있는 3가지 대화형 시뮬레이터를 제공합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {policyKeypoints.map((pt, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-gray-50 hover:bg-emerald-50/30 border border-gray-100 transition-colors duration-200">
              <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-medium mb-3">
                {pt.badge}
              </span>
              <h4 className="font-bold text-gray-800 text-base mb-1.5">{pt.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Dynamic Education Goals Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-linear-to-r from-teal-50 to-emerald-50 border border-emerald-100/60 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between"
      >
        <div className="space-y-2">
          <h4 className="text-base font-bold text-emerald-950 flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            친환경 탄소 중립과 급식의 만남
          </h4>
          <p className="text-sm text-emerald-800 leading-relaxed max-w-2xl">
            급식실에서의 작은 노력이 지구를 살리는 큰 기폭제가 됩니다. 학생들이 먹을 만큼만 선택하고 다 비우면, 조리실에서는 잔반 처리 부담이 줄고 온실가스 배출량이 현격히 감소하는 선순환이 완성됩니다.
          </p>
        </div>
        <div className="flex gap-4 shrink-0 bg-white/75 p-4 rounded-xl border border-emerald-100/40">
          <div className="text-center px-4">
            <span className="block text-2xl font-bold text-emerald-700">35%</span>
            <span className="text-xs font-medium text-gray-500">평균 잔반 감소율</span>
          </div>
          <div className="w-px bg-gray-200 self-stretch"></div>
          <div className="text-center px-4">
            <span className="block text-2xl font-bold text-sky-700">40분</span>
            <span className="text-xs font-medium text-gray-500">조리원 행정 절감</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
