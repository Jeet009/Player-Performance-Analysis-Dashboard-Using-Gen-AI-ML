'use client'

import { ArrowLeft, Download, Star, TrendingUp, Target, Award, FileText } from 'lucide-react'
import { useRef } from 'react'

interface PredictionResultProps {
    prediction: any
    onBack: () => void
}

export default function PredictionResult({ prediction, onBack }: PredictionResultProps) {
    const reportRef = useRef<HTMLDivElement>(null)

    const downloadPDF = async () => {
        try {
            const html2canvas = (await import('html2canvas')).default
            const jsPDF = (await import('jspdf')).default

            if (reportRef.current) {
                const canvas = await html2canvas(reportRef.current, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    logging: false,
                    removeContainer: true
                })

                const imgData = canvas.toDataURL('image/png')
                const pdf = new jsPDF('p', 'mm', 'a4')
                const imgWidth = 210
                const pageHeight = 295
                const imgHeight = (canvas.height * imgWidth) / canvas.width
                let heightLeft = imgHeight

                let position = 0

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
                heightLeft -= pageHeight

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight
                    pdf.addPage()
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
                    heightLeft -= pageHeight
                }

                pdf.save('player-analysis-report.pdf')
            }
        } catch (error) {
            console.error('PDF generation error:', error)
            alert('Failed to generate PDF. Please try again.')
        }
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-3 rounded-full">
                            <Award className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-orange-700 to-amber-700 bg-clip-text text-transparent">
                                Analysis Results
                            </h2>
                            <p className="text-gray-600 text-sm">Comprehensive player performance insights</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={downloadPDF}
                            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 transform hover:scale-105"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            New Analysis
                        </button>
                    </div>
                </div>

                <div ref={reportRef} className="space-y-8">
                    {/* Performance Prediction */}
                    {prediction.prediction && (
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-orange-500 p-2 rounded-full">
                                    <Star className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Performance Prediction</h3>
                            </div>
                            <div className="text-center">
                                <div
                                    className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 shadow-lg"
                                    style={{
                                        background: 'linear-gradient(135deg, #f97316 0%, #d97706 100%)',
                                        border: '3px solid #ea580c'
                                    }}
                                >
                                    <span
                                        className="text-4xl font-bold"
                                        style={{
                                            color: '#ffffff',
                                            fontSize: '2.5rem',
                                            fontWeight: 'bold',
                                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        {prediction.prediction}
                                    </span>
                                </div>
                                <p className="text-xl font-semibold text-gray-700">Overall Rating</p>
                                <p className="text-gray-600 mt-2">Based on comprehensive analysis of player attributes</p>
                            </div>
                        </div>
                    )}

                    {/* AI Analysis Report */}
                    {prediction.report && (
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-amber-600 p-2 rounded-full">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">AI Analysis Report</h3>
                            </div>
                            <div className="bg-white/80 rounded-xl p-8 border border-amber-200">
                                <div
                                    className="text-gray-700 leading-relaxed prose prose-lg max-w-none space-y-6"
                                    dangerouslySetInnerHTML={{
                                        __html: prediction.report
                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-700 font-semibold">$1</strong>')
                                            .replace(/\n\n/g, '</div><div class="mb-6">')
                                            .replace(/\n/g, '<br>')
                                            .replace(/^/, '<div class="mb-6">')
                                            .replace(/$/, '</div>')
                                            .replace(/(\d+\.\s\*\*.*?)\*\*$/, '$1</strong>')
                                            .replace(/<h([1-6])>/g, '<h$1 class="text-gray-800 font-bold text-xl mb-4 mt-8 first:mt-0">')
                                            .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-3 ml-4 my-4">')
                                            .replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-3 ml-4 my-4">')
                                            .replace(/<li>/g, '<li class="text-gray-700 leading-relaxed">')
                                            .replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-4 text-base">')
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Error Display */}
                    {prediction.error && (
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-red-500 p-2 rounded-full">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-red-800">Error</h3>
                            </div>
                            <div className="bg-white/80 rounded-xl p-6 border border-red-200">
                                <p className="text-red-700 text-lg">{prediction.error}</p>
                            </div>
                        </div>
                    )}

                    {/* Report Footer */}
                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Target className="w-5 h-5 text-orange-600" />
                                <span className="text-lg font-semibold text-gray-700">Generated by AI Performance Analytics</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                This report is generated using advanced machine learning algorithms and comprehensive player data analysis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 