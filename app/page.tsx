'use client'

import { useState } from 'react'
import PlayerForm from './components/PlayerForm'
import TeamSection from './components/TeamSection'
import { Trophy, Users, TrendingUp, BarChart3, Target, Zap, Shield, Star } from 'lucide-react'

export default function Dashboard() {
    const [selectedOption, setSelectedOption] = useState<'player' | 'team' | null>(null)

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 font-poppins">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 rounded-full">
                            <Trophy className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-700 to-amber-700 bg-clip-text text-transparent mb-4">
                        Player Performance Dashboard
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Advanced AI-powered football analytics platform providing deep insights into player performance,
                        team dynamics, and predictive analysis for strategic decision-making.
                    </p>
                </div>

                {!selectedOption && (
                    <div className="max-w-4xl mx-auto">
                        {/* Choose Analysis Type - Moved to Top */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                Choose Your Analysis Type
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <button
                                    onClick={() => setSelectedOption('player')}
                                    className="group relative bg-gradient-to-r from-orange-500 to-amber-600 text-white p-8 rounded-2xl text-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-orange-400/30 hover:border-orange-300/50"
                                >
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-colors">
                                            <Users className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-2">Player Analysis</h3>
                                        <p className="text-orange-100 text-sm opacity-90 mb-4">
                                            Individual performance metrics and future potential
                                        </p>
                                        <div className="bg-white/10 rounded-lg p-3">
                                            <p className="text-xs text-orange-50">
                                                Analyze individual player stats, strengths, weaknesses, and performance trends
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setSelectedOption('team')}
                                    className="group relative bg-gradient-to-r from-amber-600 to-orange-700 text-white p-8 rounded-2xl text-lg font-semibold hover:from-amber-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-amber-400/30 hover:border-amber-300/50"
                                >
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-colors">
                                            <Trophy className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-2">Team Analysis</h3>
                                        <p className="text-amber-100 text-sm opacity-90 mb-4">
                                            Team dynamics and collective performance insights
                                        </p>
                                        <div className="bg-white/10 rounded-lg p-3">
                                            <p className="text-xs text-amber-50">
                                                Evaluate team chemistry, tactical formations, and overall performance metrics
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* App Description */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                        Transform Your Football Strategy
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Our cutting-edge AI platform analyzes thousands of data points to provide
                                        comprehensive insights into player performance, team dynamics, and future predictions.
                                        Whether you're a coach, scout, or analyst, make data-driven decisions with confidence.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-orange-500 mr-3" />
                                            <span className="text-gray-700">Advanced machine learning algorithms</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Shield className="w-5 h-5 text-amber-600 mr-3" />
                                            <span className="text-gray-700">Accurate performance predictions</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-5 h-5 text-orange-600 mr-3" />
                                            <span className="text-gray-700">Comprehensive team analysis</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white">
                                        <div className="text-center">
                                            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-80" />
                                            <h4 className="text-xl font-semibold mb-2">Data-Driven Insights</h4>
                                            <p className="text-orange-100">
                                                Leverage advanced analytics to optimize player selection,
                                                training programs, and tactical decisions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedOption === 'player' && (
                    <PlayerForm onBack={() => setSelectedOption(null)} />
                )}

                {selectedOption === 'team' && (
                    <TeamSection onBack={() => setSelectedOption(null)} />
                )}
            </div>
        </div>
    )
} 