import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pitchText, setPitchText] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handlePitchChange = (e) => {
    setPitchText(e.target.value);
  };

  const submitPitch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/feedback', { pitchText });
      setFeedback(response.data);
      setPitchText('');
    } catch (error) {
      console.error('Error submitting pitch:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="heading">
          <span style={{ color: '#D45203' }}>Salesifyme </span>AI-Powered Sales Coach
        </h1>

        {feedback && (
          <div className="feedback-box">
            <h2 className="feedback-title">Feedback</h2>
            <div className="feedback-details">
              <p><strong>Sentiment:</strong> {feedback.sentimentAnalysis} (Score: {feedback.sentimentScore})</p>
              <p><strong>Clarity:</strong> {feedback.clarity}</p>
              <p><strong>Confidence:</strong> {feedback.confidence}</p>
            </div>

            <h3 className="nlp-title">NLP Sentiment Analysis</h3>
            <div className="nlp-analysis">
              {feedback.nlpAnalysis && feedback.nlpAnalysis.length > 0 ? (
                feedback.nlpAnalysis.map((result, index) => (
                  <div key={index} className="nlp-result">
                    <p><strong>Label:</strong> {result.label || 'N/A'}</p>
                    <p><strong>Confidence:</strong> {(result.score ? (result.score * 100).toFixed(2) : 'N/A')}%</p>
                  </div>
                ))
              ) : (
                <p>No detailed analysis available.</p>
              )}
            </div>
          </div>
        )}

        <textarea
          value={pitchText}
          onChange={handlePitchChange}
          placeholder="Type your sales pitch here..."
          rows="8"
          className="textarea"
        />

        <button onClick={submitPitch} className="submit-button">Analyze Pitch</button>
      </div>
    </div>
  );
}

export default App;
