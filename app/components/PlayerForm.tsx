'use client'

import { useState } from 'react'
import PredictionResult from './PredictionResult'
import { ArrowLeft, User, Target, TrendingUp, Zap, Users } from 'lucide-react'

interface PlayerFormProps {
    onBack: () => void
}

const testPlayers = [
    {
        name: "Lionel Messi",
        data: {
            Age: '36',
            Potential: '94',
            Special: '2200',
            'International Reputation': '5',
            'Weak Foot': '4',
            'Skill Moves': '4',
            'Kit Number': '10',
            height_cm: '170',
            weight_kg: '72',
            Value_num: '45000000',
            Wage_num: '500000',
            'Release Clause_num': '80000000',
            pot_minus_ovr: '2',
            'Preferred Foot': 'Left',
            Nationality: 'Argentina',
            'Body Type': 'Lean (170-185)',
            'Work Rate': 'Medium/ Medium',
            primary_position: 'RW',
            pos_bucket: 'Forward',
            'Club_topk': 'Inter Miami'
        }
    },
    {
        name: "Erling Haaland",
        data: {
            Age: '23',
            Potential: '91',
            Special: '2100',
            'International Reputation': '4',
            'Weak Foot': '3',
            'Skill Moves': '3',
            'Kit Number': '9',
            height_cm: '195',
            weight_kg: '88',
            Value_num: '180000000',
            Wage_num: '350000',
            'Release Clause_num': '200000000',
            pot_minus_ovr: '5',
            'Preferred Foot': 'Left',
            Nationality: 'Norway',
            'Body Type': 'Stocky',
            'Work Rate': 'High/ High',
            primary_position: 'ST',
            pos_bucket: 'Forward',
            'Club_topk': 'Manchester City'
        }
    },
    {
        name: "Kevin De Bruyne",
        data: {
            Age: '32',
            Potential: '91',
            Special: '2300',
            'International Reputation': '4',
            'Weak Foot': '5',
            'Skill Moves': '4',
            'Kit Number': '17',
            height_cm: '181',
            weight_kg: '70',
            Value_num: '60000000',
            Wage_num: '400000',
            'Release Clause_num': '100000000',
            pot_minus_ovr: '1',
            'Preferred Foot': 'Right',
            Nationality: 'Belgium',
            'Body Type': 'Normal',
            'Work Rate': 'High/ High',
            primary_position: 'CAM',
            pos_bucket: 'Midfielder',
            'Club_topk': 'Manchester City'
        }
    },
    {
        name: "Virgil van Dijk",
        data: {
            Age: '32',
            Potential: '89',
            Special: '1900',
            'International Reputation': '4',
            'Weak Foot': '3',
            'Skill Moves': '2',
            'Kit Number': '4',
            height_cm: '193',
            weight_kg: '92',
            Value_num: '45000000',
            Wage_num: '220000',
            'Release Clause_num': '80000000',
            pot_minus_ovr: '0',
            'Preferred Foot': 'Right',
            Nationality: 'Netherlands',
            'Body Type': 'Stocky',
            'Work Rate': 'Medium/ Medium',
            primary_position: 'CB',
            pos_bucket: 'Defender',
            'Club_topk': 'Liverpool'
        }
    }
]

export default function PlayerForm({ onBack }: PlayerFormProps) {
    const [formData, setFormData] = useState({
        Age: '20',
        Potential: '75',
        Special: '1500',
        'International Reputation': '2',
        'Weak Foot': '3',
        'Skill Moves': '3',
        'Kit Number': '10',
        height_cm: '180',
        weight_kg: '75',
        Value_num: '5000000',
        Wage_num: '50000',
        'Release Clause_num': '10000000',
        pot_minus_ovr: '5',
        'Preferred Foot': 'Right',
        Nationality: '',
        'Body Type': 'Lean (170-185)',
        'Work Rate': 'Medium/ Medium',
        primary_position: '',
        pos_bucket: '',
        'Club_topk': ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [prediction, setPrediction] = useState<any>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const loadTestPlayer = (playerData: any) => {
        setFormData(playerData)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const result = await response.json()
            setPrediction(result)

            // Scroll to top when results are displayed
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.error('Prediction error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (prediction) {
        return <PredictionResult prediction={prediction} onBack={() => setPrediction(null)} />
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-3 rounded-full">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-orange-700 to-amber-700 bg-clip-text text-transparent">
                                Player Analysis
                            </h2>
                            <p className="text-gray-600 text-sm">Adjust player details for performance prediction</p>
                        </div>
                    </div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 transform hover:scale-105"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Test Players Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-500 p-2 rounded-full">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Quick Test Players</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Select a test player to quickly see how the analysis works:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {testPlayers.map((player, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => loadTestPlayer(player.data)}
                                    className="bg-white/80 rounded-xl p-4 border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md hover:scale-105"
                                >
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-white font-bold text-sm">{player.name.split(' ')[0][0]}</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-800 text-sm mb-1">{player.name}</h4>
                                        <p className="text-gray-600 text-xs">{player.data.primary_position} • {player.data.Nationality}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Basic Information */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-orange-500 p-2 rounded-full">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Basic Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age: {formData.Age}</label>
                                    <input
                                        type="range"
                                        name="Age"
                                        min="16"
                                        max="50"
                                        value={formData.Age}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Potential: {formData.Potential}</label>
                                    <input
                                        type="range"
                                        name="Potential"
                                        min="50"
                                        max="99"
                                        value={formData.Potential}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Special: {formData.Special}</label>
                                    <input
                                        type="range"
                                        name="Special"
                                        min="0"
                                        max="3000"
                                        value={formData.Special}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm): {formData.height_cm}</label>
                                    <input
                                        type="range"
                                        name="height_cm"
                                        min="150"
                                        max="220"
                                        value={formData.height_cm}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg): {formData.weight_kg}</label>
                                    <input
                                        type="range"
                                        name="weight_kg"
                                        min="50"
                                        max="120"
                                        value={formData.weight_kg}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality</label>
                                    <input
                                        type="text"
                                        name="Nationality"
                                        value={formData.Nationality}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skills & Attributes */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-amber-600 p-2 rounded-full">
                                    <Target className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Skills & Attributes</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">International Reputation: {formData['International Reputation']}</label>
                                    <input
                                        type="range"
                                        name="International Reputation"
                                        min="1"
                                        max="5"
                                        step="0.5"
                                        value={formData['International Reputation']}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Weak Foot: {formData['Weak Foot']}</label>
                                    <input
                                        type="range"
                                        name="Weak Foot"
                                        min="1"
                                        max="5"
                                        step="0.5"
                                        value={formData['Weak Foot']}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Moves: {formData['Skill Moves']}</label>
                                    <input
                                        type="range"
                                        name="Skill Moves"
                                        min="1"
                                        max="5"
                                        step="0.5"
                                        value={formData['Skill Moves']}
                                        onChange={handleInputChange}
                                        className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Foot</label>
                                    <select
                                        name="Preferred Foot"
                                        value={formData['Preferred Foot']}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80"
                                        required
                                    >
                                        <option value="Right">Right</option>
                                        <option value="Left">Left</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Body Type</label>
                                    <select
                                        name="Body Type"
                                        value={formData['Body Type']}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80"
                                        required
                                    >
                                        <option value="Lean (170-185)">Lean (170-185)</option>
                                        <option value="Stocky">Stocky</option>
                                        <option value="Normal">Normal</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Work Rate</label>
                                    <select
                                        name="Work Rate"
                                        value={formData['Work Rate']}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80"
                                        required
                                    >
                                        <option value="Medium/ Medium">Medium/ Medium</option>
                                        <option value="High/ High">High/ High</option>
                                        <option value="High/ Medium">High/ Medium</option>
                                        <option value="Medium/ High">Medium/ High</option>
                                        <option value="Low/ Low">Low/ Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-600 p-2 rounded-full">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Additional Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Kit Number: {formData['Kit Number']}</label>
                                <input
                                    type="range"
                                    name="Kit Number"
                                    min="1"
                                    max="99"
                                    value={formData['Kit Number']}
                                    onChange={handleInputChange}
                                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Value: ${parseInt(formData.Value_num).toLocaleString()}</label>
                                <input
                                    type="range"
                                    name="Value_num"
                                    min="0"
                                    max="10000000"
                                    step="100000"
                                    value={formData.Value_num}
                                    onChange={handleInputChange}
                                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Wage: ${parseInt(formData.Wage_num).toLocaleString()}</label>
                                <input
                                    type="range"
                                    name="Wage_num"
                                    min="0"
                                    max="1000000"
                                    step="1000"
                                    value={formData.Wage_num}
                                    onChange={handleInputChange}
                                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Release Clause: ${parseInt(formData['Release Clause_num']).toLocaleString()}</label>
                                <input
                                    type="range"
                                    name="Release Clause_num"
                                    min="0"
                                    max="20000000"
                                    step="100000"
                                    value={formData['Release Clause_num']}
                                    onChange={handleInputChange}
                                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Potential - Overall: {formData.pot_minus_ovr}</label>
                                <input
                                    type="range"
                                    name="pot_minus_ovr"
                                    min="-20"
                                    max="20"
                                    value={formData.pot_minus_ovr}
                                    onChange={handleInputChange}
                                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Position</label>
                                <input
                                    type="text"
                                    name="primary_position"
                                    value={formData.primary_position}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Position Bucket</label>
                                <input
                                    type="text"
                                    name="pos_bucket"
                                    value={formData.pos_bucket}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Club Top K</label>
                                <input
                                    type="text"
                                    name="Club_topk"
                                    value={formData['Club_topk']}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 px-12 rounded-2xl text-xl font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex items-center justify-center gap-3">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <Zap className="w-5 h-5" />
                                )}
                                {isLoading ? 'Analyzing Player...' : 'Analyze Player Performance'}
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 