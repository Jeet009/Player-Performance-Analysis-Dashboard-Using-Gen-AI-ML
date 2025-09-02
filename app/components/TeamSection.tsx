'use client'

interface TeamSectionProps {
    onBack: () => void
}

export default function TeamSection({ onBack }: TeamSectionProps) {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Team Analysis</h2>
                    <p className="text-gray-600 text-lg">Coming Soon</p>
                </div>

                <p className="text-gray-500 mb-8">
                    We're working on bringing you comprehensive team performance analytics.
                    This feature will include team statistics, player comparisons, and strategic insights.
                </p>

                <button
                    onClick={onBack}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    )
} 