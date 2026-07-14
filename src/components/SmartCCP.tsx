/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Clock, 
  User, 
  RefreshCcw,
  Printer,
  Sparkles
} from 'lucide-react';
import { CCPCheckItem } from '../types';

export default function SmartCCP() {
  const [managerName, setManagerName] = useState("김영희 조리원");
  const [ccpList, setCcpList] = useState<CCPCheckItem[]>([
    {
      id: "ccp-1",
      ccpType: "CCP-1",
      name: "식재료 검수 위생 상태",
      target: "신선 보관 온도: 냉장 10°C 이하 / 냉동 -18°C 이하",
      currentValue: 4.5,
      unit: "°C",
      status: "SAFE",
      manager: "김영희",
      timestamp: "08:15",
      isCompleted: true
    },
    {
      id: "ccp-2",
      ccpType: "CCP-2",
      name: "조리 중심 온도 (닭갈비/찜닭)",
      target: "육류 핵심 가열 온도: 85°C 이상에서 1분 이상 지속",
      currentValue: 88.2,
      unit: "°C",
      status: "SAFE",
      manager: "김영희",
      timestamp: "10:45",
      isCompleted: true
    },
    {
      id: "ccp-3",
      ccpType: "CCP-3",
      name: "배식 전 온수조 보온 상태",
      target: "보온 배식 보관 온도: 57°C 이상으로 일정 유지",
      currentValue: 62.4,
      unit: "°C",
      status: "SAFE",
      manager: "김영희",
      timestamp: "11:30",
      isCompleted: true
    }
  ]);

  const [activeTab, setActiveTab] = useState<'CCP-1' | 'CCP-2' | 'CCP-3'>('CCP-2');
  const [printSuccess, setPrintSuccess] = useState(false);

  // Quick adjustment of the currently selected CCP temperature for the live simulator
  const activeCcp = ccpList.find(c => c.ccpType === activeTab)!;

  const handleTemperatureChange = (val: number) => {
    let status: 'SAFE' | 'WARNING' | 'CRITICAL' = 'SAFE';

    if (activeTab === 'CCP-1') {
      // Receiving inspection: > 10 is CRITICAL, > 7 is WARNING
      if (val > 10) status = 'CRITICAL';
      else if (val > 7) status = 'WARNING';
    } else if (activeTab === 'CCP-2') {
      // Core cooking temperature: < 85 is CRITICAL, < 87 is WARNING
      if (val < 85) status = 'CRITICAL';
      else if (val < 87) status = 'WARNING';
    } else if (activeTab === 'CCP-3') {
      // Hot keeping temperature: < 57 is CRITICAL, < 59 is WARNING
      if (val < 57) status = 'CRITICAL';
      else if (val < 59) status = 'WARNING';
    }

    setCcpList(prev => prev.map(item => {
      if (item.ccpType === activeTab) {
        return {
          ...item,
          currentValue: Math.round(val * 10) / 10,
          status,
          manager: managerName,
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
      }
      return item;
    }));
  };

  // Preset corrective action advice based on status and type
  const getCorrectiveAction = () => {
    if (activeCcp.status === 'SAFE') return "검증 기준을 만족합니다. 정상 기록 후 다음 조리 과정을 진행해 주세요.";
    
    if (activeTab === 'CCP-1') {
      return activeCcp.status === 'WARNING'
        ? "주의: 온도가 서서히 올라가고 있습니다. 신속히 냉장창고로 입고 조치하십시오."
        : "위험: 냉장 차량 온도 한계 초과! 즉시 납품 거부 후 제조사에 회수 요구 및 긴급 식재료 대체 계획을 실행하십시오.";
    } else if (activeTab === 'CCP-2') {
      return activeCcp.status === 'WARNING'
        ? "주의: 가열 기준 온도 직전입니다. 가열 화력을 높여 완전 도달을 준비하십시오."
        : "위험: 중심 온도 85°C 미만! 85°C 도달 후 최소 1분 동안 추가 재가열 조치를 내린 후 온도를 재측정하십시오.";
    } else {
      return activeCcp.status === 'WARNING'
        ? "주의: 온도가 소폭 내려갔습니다. 배식대 하단 온수 밸브를 높여 보온을 유지하십시오."
        : "위험: 보온 배식 온도 미달! 식중독 유발균 증식 위험이 있으니 보온 설비를 수리하고 음식을 긴급 가열 후 재보관 하십시오.";
    }
  };

  // Simulate print/export of digital logs
  const handlePrint = () => {
    setPrintSuccess(true);
    setTimeout(() => {
      setPrintSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display tracking-tight flex items-center gap-2">
          [조리종사원용] 스마트 CCP <span className="text-sky-600 font-medium">디지털 위생 관리 일지</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Interactive Tablet Simulator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg relative">
            {/* Tablet Header bar style */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono font-bold text-slate-400">SMART_KITCHEN_OS v1.4</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400">담당자:</span>
                <input 
                  type="text" 
                  value={managerName} 
                  onChange={(e) => setManagerName(e.target.value)}
                  className="bg-slate-800 border border-slate-700 px-2 py-1 rounded text-white font-semibold text-xs text-center w-28 focus:outline-hidden focus:border-sky-500"
                />
              </div>
            </div>

            {/* CCP Tabs */}
            <div className="grid grid-cols-3 gap-2.5 my-5">
              {ccpList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.ccpType)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                    activeTab === item.ccpType
                      ? 'border-sky-500 bg-sky-950/40 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs font-bold text-sky-400">{item.ccpType}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      item.status === 'SAFE' 
                        ? 'bg-emerald-500' 
                        : item.status === 'WARNING' 
                          ? 'bg-amber-500' 
                          : 'bg-rose-500 animate-ping'
                    }`}></span>
                  </div>
                  <h4 className="text-xs font-bold truncate">{item.name}</h4>
                  <span className="font-mono text-xs font-semibold mt-1 block">
                    {item.currentValue}{item.unit}
                  </span>
                </button>
              ))}
            </div>

            {/* Active CCP Interactive Calibration Workspace */}
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/80 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] bg-sky-900/40 border border-sky-800 text-sky-300 px-2 py-0.5 rounded font-mono font-bold inline-block mb-1.5">
                    {activeCcp.ccpType} 위생 검증 구역
                  </span>
                  <h3 className="text-base font-bold text-white">{activeCcp.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{activeCcp.target}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">기록 시간</span>
                  <span className="font-mono text-xs text-slate-300 flex items-center gap-1 justify-end mt-0.5">
                    <Clock className="w-3 h-3" />
                    {activeCcp.timestamp}
                  </span>
                </div>
              </div>

              {/* Live thermometer slider widget */}
              <div className="py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Thermometer className={`w-5 h-5 ${
                      activeCcp.status === 'SAFE' 
                        ? 'text-emerald-500' 
                        : activeCcp.status === 'WARNING' 
                          ? 'text-amber-500' 
                          : 'text-rose-500 animate-bounce'
                    }`} />
                    <span className="text-xs font-semibold">실측 온도 조정 (드래그하여 시뮬레이션)</span>
                  </div>
                  <div className="font-mono font-bold text-xl text-white">
                    {activeCcp.currentValue} <span className="text-slate-400 text-sm">{activeCcp.unit}</span>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="range"
                    min={activeTab === 'CCP-1' ? -25 : activeTab === 'CCP-2' ? 60 : 40}
                    max={activeTab === 'CCP-1' ? 20 : activeTab === 'CCP-2' ? 100 : 80}
                    step="0.5"
                    value={activeCcp.currentValue}
                    onChange={(e) => handleTemperatureChange(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 focus:outline-hidden"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1.5">
                    <span>MIN</span>
                    <span className="text-sky-500 font-bold">
                      {activeTab === 'CCP-1' ? "기준: 10°C 이하" : activeTab === 'CCP-2' ? "기준: 85°C 이상" : "기준: 57°C 이상"}
                    </span>
                    <span>MAX</span>
                  </div>
                </div>
              </div>

              {/* Live Status Guard Box */}
              <div className={`p-4 rounded-xl border flex gap-3 ${
                activeCcp.status === 'SAFE'
                  ? 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
                  : activeCcp.status === 'WARNING'
                    ? 'bg-amber-950/30 border-amber-900/60 text-amber-300'
                    : 'bg-rose-950/40 border-rose-900/60 text-rose-300'
              }`}>
                {activeCcp.status === 'SAFE' ? (
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                ) : (
                  <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                    activeCcp.status === 'WARNING' ? 'text-amber-400' : 'text-rose-400 animate-pulse'
                  }`} />
                )}

                <div>
                  <div className="font-bold text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    {activeCcp.status === 'SAFE' && "✓ 정상 적합 범위"}
                    {activeCcp.status === 'WARNING' && "⚠️ 위생 주의 한계 접근"}
                    {activeCcp.status === 'CRITICAL' && "🚨 Critical Limit Violation! 한계기준 온도 이탈"}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    <b>대응 지침:</b> {getCorrectiveAction()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Generated Digital HACCP Report Sheet */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between h-full min-h-[500px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="font-display font-bold text-gray-800 text-sm flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-sky-600" />
                  디지털 위생 관리 대장 출력 미리보기
                </span>
                <button 
                  onClick={handlePrint}
                  className="p-1.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1 text-xs font-semibold"
                >
                  <Printer className="w-3.5 h-3.5" />
                  보고서 출력
                </button>
              </div>

              {/* Live stamped report */}
              <div className="p-5 border border-dashed border-gray-300 bg-gray-50/50 rounded-xl relative overflow-hidden font-mono text-[11px] leading-relaxed text-gray-700 space-y-4">
                {/* Stamp */}
                <div className="absolute top-10 right-5 border-2 border-emerald-500 text-emerald-500 font-bold px-3 py-1 rounded-md rotate-12 text-[10px] uppercase tracking-wider bg-white select-none">
                  HACCP APPROVED
                </div>

                <div className="text-center space-y-1">
                  <h4 className="text-gray-900 font-bold text-sm tracking-wide">디지털 스마트 위생 기록표</h4>
                  <p className="text-gray-400 text-[10px]">학교 급식 정책 선도학교 전산망 자동 전송본</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] border-b border-gray-200 pb-2">
                  <div>• 일시: {new Date().toLocaleDateString('ko-KR')}</div>
                  <div className="text-right">• 소속: 선도초등학교 급식실</div>
                  <div>• 결재자: {managerName}</div>
                  <div className="text-right">• 상태: 전산 백업 완료</div>
                </div>

                <div className="space-y-3">
                  {ccpList.map((item, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-2.5 last:border-b-0">
                      <div className="flex justify-between text-gray-900 font-bold">
                        <span>[{item.ccpType}] {item.name}</span>
                        <span className={item.status === 'SAFE' ? 'text-emerald-600' : 'text-rose-600'}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-[9px] mt-0.5">
                        <span>목표 기준: {item.ccpType === 'CCP-1' ? '≤10°C' : item.ccpType === 'CCP-2' ? '≥85°C' : '≥57°C'}</span>
                        <span className="font-bold text-gray-600">실측값: {item.currentValue}{item.unit} ({item.timestamp})</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-2.5 rounded border border-gray-200/60 text-[9px] leading-normal text-gray-500">
                  ⚠️ <b>특이사항 및 조치사항:</b> <br />
                  {ccpList.some(c => c.status !== 'SAFE') 
                    ? `일부 한계기준 범위 근접 또는 이탈이 관찰되어 CCP 조치 지침에 따라 ${managerName} 조치 완료.`
                    : "특이사항 없음. 모든 핵심 중요관리점 기준을 완전 준격하여 안전한 급식 상태가 유지됨을 확인함."}
                </div>
              </div>
            </div>

            {/* Success Prompt Overlay */}
            <AnimatePresence>
              {printSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3.5 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-1.5 mt-4"
                >
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  스마트 교육 공용 보고서 생성 완료 및 다운로드가 예약되었습니다!
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-4 mt-4">
              💡 <b>업무 효율화 지표:</b> 종이 장부에 일일이 기록하던 서명 10여 회가 실시간 디지털 슬라이딩 체크로 <b>대체 완료</b>되었습니다. 모든 정보는 클라우드 HACCP 망에 축적되어 실시간 모니터링이 가능합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
