# Player Performance Analysis Dashboard

A Next.js dashboard for AI-powered football player performance analysis using **Machine Learning** and **Generative AI** technologies.

## Overview

This application combines the power of **Machine Learning** for performance prediction and **Generative AI** for comprehensive analysis reports. The system uses trained ML models to predict player ratings and leverages advanced language models to generate detailed, human-like analysis reports.

## Features

- **ML-Powered Predictions**: Machine learning models analyze player statistics to predict performance ratings
- **AI-Generated Reports**: Generative AI creates comprehensive, detailed analysis reports using Groq API
- **Player Analysis**: Input player statistics and get both numerical predictions and detailed insights
- **Premium UI**: Modern, responsive design with Tailwind CSS and Poppins font
- **PDF Export**: Download analysis reports as professional PDF documents
- **Test Players**: Quick test functionality with pre-loaded player data
- **Team Analysis**: Coming soon feature

## Technology Stack

### Machine Learning
- **Scikit-learn**: For loading and using trained ML models
- **Pickle**: Model serialization and storage
- **Performance Prediction**: Custom trained models for player rating prediction

### Generative AI
- **Groq API**: High-performance language model for generating analysis reports
- **Natural Language Processing**: AI-powered text generation for comprehensive insights
- **Dynamic Content**: Real-time report generation based on player data

### Frontend & Backend
- **Next.js 14**: Full-stack React framework
- **React 18**: Modern React with hooks and components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **html2canvas & jsPDF**: PDF generation capabilities

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
GROQ_API_KEY=your_groq_api_key_here
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## How It Works

### Machine Learning Pipeline
1. **Data Input**: Player statistics are collected through the form
2. **Feature Processing**: Data is preprocessed and normalized
3. **ML Prediction**: Trained model predicts overall player rating
4. **Result Generation**: Numerical prediction is returned

### Generative AI Pipeline
1. **Context Creation**: Player data and ML prediction are formatted
2. **AI Analysis**: Groq API generates comprehensive analysis report
3. **Content Enhancement**: Report includes strengths, weaknesses, and recommendations
4. **Formatting**: Content is formatted for optimal display and PDF export

## Model Integration

The `performance_pred.pkl` file contains the trained machine learning model. Update the `makePrediction` function in `app/api/predict/route.ts` to load and use your actual model.

## Deployment

The dashboard is ready for Vercel deployment. Simply connect your repository and deploy.

## API Endpoints

- `POST /api/predict`: Combines ML prediction with AI report generation
  - Input: Player statistics
  - Output: Prediction + AI-generated analysis report

## Future Enhancements

- **Advanced ML Models**: Integration with more sophisticated prediction algorithms
- **Real-time Data**: Live player statistics integration
- **Team Analysis**: Multi-player comparison and team dynamics
- **Historical Analysis**: Player performance tracking over time 