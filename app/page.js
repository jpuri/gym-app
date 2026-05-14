"use client";

import { useState } from "react";

function calculateSteps(weightKg, heightCm) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let baseSteps;
  let band;
  let note;

  if (bmi < 18.5) {
    baseSteps = 8000;
    band = "Underweight";
    note = "Focus on strength training alongside walking.";
  } else if (bmi < 25) {
    baseSteps = 10000;
    band = "Healthy";
    note = "Maintain your routine — you're in the optimal range.";
  } else if (bmi < 30) {
    baseSteps = 12500;
    band = "Overweight";
    note = "A higher daily step goal will accelerate fat loss.";
  } else {
    baseSteps = 15000;
    band = "Obese";
    note = "Start gradually — build up to this target over weeks.";
  }

  // Light personalization: heavier folks get a small bump
  const adjusted = Math.round((baseSteps + (weightKg - 70) * 25) / 100) * 100;
  const steps = Math.max(6000, adjusted);

  return { steps, bmi: bmi.toFixed(1), band, note };
}

export default function LandingPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || w <= 0 || h <= 0) {
      setError("Please enter valid weight and height values.");
      return;
    }
    if (w < 25 || w > 300 || h < 80 || h > 250) {
      setError("Please enter realistic weight (kg) and height (cm).");
      return;
    }

    setResult(calculateSteps(w, h));
  };

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="brand">
          IRON<span>FORGE</span>
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#calculator">Step Goal</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="#calculator">
          Join Now
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-inner">
          <span className="eyebrow">Train Like a Beast</span>
          <h1>
            Forge Your <span className="accent">Strongest</span> Self
          </h1>
          <p className="lede">
            World-class equipment, elite coaches, and a community that pushes
            you past your limits. Step inside IronForge — where ordinary ends
            and legends begin.
          </p>
          <div className="hero-actions">
            <a href="#calculator" className="btn btn-primary">
              Get My Step Goal
            </a>
            <a href="#gallery" className="btn btn-ghost">
              Take the Tour
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats" id="about">
        <div className="stat">
          <div className="num">12K+</div>
          <div className="label">Active Members</div>
        </div>
        <div className="stat">
          <div className="num">80+</div>
          <div className="label">Certified Coaches</div>
        </div>
        <div className="stat">
          <div className="num">24/7</div>
          <div className="label">Open Access</div>
        </div>
        <div className="stat">
          <div className="num">15</div>
          <div className="label">Locations</div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section" id="gallery">
        <div className="section-title">
          <h2>Inside The Forge</h2>
          <p>Cutting-edge equipment. Unmatched atmosphere.</p>
        </div>
        <div className="gallery">
          <div className="tile tile-1">
            <div className="caption">Main Floor</div>
          </div>
          <div className="tile tile-2">
            <div className="caption">Free Weights</div>
          </div>
          <div className="tile tile-3">
            <div className="caption">Cardio Zone</div>
          </div>
          <div className="tile tile-4">
            <div className="caption">Studio</div>
          </div>
          <div className="tile tile-5">
            <div className="caption">Recovery</div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="calculator-wrap" id="calculator">
        <div className="calculator">
          <div className="calculator-copy">
            <h2>
              Your Daily <span className="accent">Step Goal</span>
            </h2>
            <p>
              Drop in your weight and height — we'll suggest how many steps to
              hit every day. A simple, science-inspired starting point built
              around your body's profile.
            </p>
          </div>

          <form className="card" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                type="number"
                step="0.1"
                placeholder="e.g. 72"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="height">Height (cm)</label>
              <input
                id="height"
                type="number"
                step="0.1"
                placeholder="e.g. 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary calc-btn">
              Calculate My Steps
            </button>

            {error && <div className="error">{error}</div>}

            {result && (
              <div className="result">
                <div className="steps">
                  {result.steps.toLocaleString()}
                </div>
                <div className="steps-label">Steps / Day</div>
                <div className="meta">
                  BMI <strong>{result.bmi}</strong> · {result.band}
                  <br />
                  {result.note}
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="brand">
          IRON<span style={{ color: "var(--accent)" }}>FORGE</span>
        </div>
        <div>Train. Sweat. Conquer. © {new Date().getFullYear()}</div>
      </footer>
    </>
  );
}
