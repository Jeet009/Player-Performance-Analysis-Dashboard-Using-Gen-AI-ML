import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Load the model and make prediction
        const prediction = await makePrediction(body)

        // Generate AI report
        const report = await generateReport(body, prediction)

        return NextResponse.json({
            prediction,
            report,
            success: true
        })

    } catch (error) {
        console.error('Prediction error:', error)
        return NextResponse.json({
            error: 'Failed to generate prediction',
            success: false
        }, { status: 500 })
    }
}

async function makePrediction(playerData: any) {
    // This is a placeholder - you'll need to implement the actual model loading
    // and prediction logic using your performance_pred.pkl file
    // For now, returning a sample prediction

    // TODO: Implement actual model loading from pickle file
    // import pickle
    // with open('performance_pred.pkl', 'rb') as f:
    //     model = pickle.load(f)
    // prediction = model.predict([features])

    return Math.floor(Math.random() * 30) + 70 // Random rating between 70-99
}

async function generateReport(playerData: any, prediction: number) {
    const prompt = `Analyze this football player's performance data and provide insights:

Player Data:
- Age: ${playerData.Age}
- Potential: ${playerData.Potential}
- Special: ${playerData.Special}
- International Reputation: ${playerData['International Reputation']}
- Weak Foot: ${playerData['Weak Foot']}
- Skill Moves: ${playerData['Skill Moves']}
- Height: ${playerData.height_cm}cm
- Weight: ${playerData.weight_kg}kg
- Value: ${playerData.Value_num}
- Wage: ${playerData.Wage_num}
- Preferred Foot: ${playerData['Preferred Foot']}
- Nationality: ${playerData.Nationality}
- Body Type: ${playerData['Body Type']}
- Work Rate: ${playerData['Work Rate']}
- Position: ${playerData.primary_position}

Predicted Overall Rating: ${prediction}

Please provide a comprehensive analysis including:
1. Strengths and areas for improvement
2. Position-specific insights
3. Development potential
4. Market value assessment
5. Recommendations for improvement

Keep the analysis professional and football-focused.`

    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant",
            max_tokens: 500,
            temperature: 0.7,
        })

        return completion.choices[0]?.message?.content || 'Unable to generate report'
    } catch (error) {
        console.error('Groq API error:', error)
        return 'AI report generation failed. Please try again later.'
    }
} 