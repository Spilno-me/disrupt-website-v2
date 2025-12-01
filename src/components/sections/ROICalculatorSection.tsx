import { useState, useMemo } from 'react'
import { COLORS } from '@/constants/designTokens'

// =============================================================================
// CONSTANTS
// =============================================================================

const WORKING_DAYS_PER_YEAR = 250
const AGENTIC_MONTHLY_COST_PER_USER = 10 // Viewer License
const INCUMBENT_COST_PER_TASK = 2.5

// =============================================================================
// TYPES
// =============================================================================

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (value: number) => void
}

// =============================================================================
// SLIDER COMPONENT
// =============================================================================

function Slider({ label, value, min, max, step, unit, onChange }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-sans font-semibold text-base text-dark tracking-tight">
          {label}
        </span>
        <span className="font-sans font-bold text-base text-dark tracking-tight">
          {value} {unit}
        </span>
      </div>
      <div className="relative h-4">
        {/* Track Background */}
        <div className="absolute inset-0 bg-slate-100 rounded-full" />
        {/* Track Fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: COLORS.ferrariRed,
          }}
        />
        {/* Slider Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md border border-ferrari-red pointer-events-none"
          style={{
            left: `calc(${percentage}% - 10px)`,
            borderColor: COLORS.ferrariRed,
          }}
        />
      </div>
    </div>
  )
}

// =============================================================================
// COST DISPLAY COMPONENT
// =============================================================================

interface CostDisplayProps {
  label: string
  amount: number
  subtitle: string
  variant: 'incumbent' | 'agentic' | 'savings'
}

function CostDisplay({ label, amount, subtitle, variant }: CostDisplayProps) {
  const amountColors = {
    incumbent: COLORS.ferrariRed,
    agentic: COLORS.dark,
    savings: '#22C55E',
  }

  const subtitleColors = {
    incumbent: '#F87171',
    agentic: COLORS.muted,
    savings: '#22C55E',
  }

  const labelStyles = variant === 'agentic'
    ? 'font-medium'
    : 'font-medium'

  return (
    <div className="flex flex-col gap-2">
      <span
        className={`font-sans text-sm uppercase tracking-wider ${labelStyles}`}
        style={{ color: COLORS.dark }}
      >
        {label}
      </span>
      <span
        className={`font-display font-bold ${variant === 'savings' ? 'text-4xl lg:text-5xl' : 'text-3xl lg:text-4xl'}`}
        style={{ color: amountColors[variant] }}
      >
        ${amount.toLocaleString()}
      </span>
      <span
        className="font-sans text-xs"
        style={{ color: subtitleColors[variant] }}
      >
        {subtitle}
      </span>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ROICalculatorSection() {
  const [workers, setWorkers] = useState(100)
  const [tasksPerDay, setTasksPerDay] = useState(5)

  const calculations = useMemo(() => {
    const totalTasksPerYear = workers * tasksPerDay * WORKING_DAYS_PER_YEAR
    const incumbentAnnualCost = totalTasksPerYear * INCUMBENT_COST_PER_TASK
    const agenticAnnualCost = workers * AGENTIC_MONTHLY_COST_PER_USER * 12
    const annualSavings = incumbentAnnualCost - agenticAnnualCost

    return {
      incumbentAnnualCost: Math.round(incumbentAnnualCost),
      agenticAnnualCost: Math.round(agenticAnnualCost),
      annualSavings: Math.round(annualSavings),
    }
  }, [workers, tasksPerDay])

  return (
    <section
      className="py-11 bg-cream border-y-dashed-figma"
      data-element="roi-calculator-section"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-start lg:items-center gap-3 lg:gap-5 mb-11">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[30px] leading-[1.2] tracking-tight text-left lg:text-center text-dark">
            ROI CALCULATOR: See Your Savings
          </h2>
          <p className="font-display font-medium text-sm sm:text-base lg:text-lg text-left lg:text-center max-w-[800px] text-teal">
            Drag the sliders to see how much incumbent "Flat-Tax" fees are costing you versus our Flat-Rate model.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-[1120px] mx-auto bg-white rounded-[14px] border border-slate-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Sliders */}
            <div className="flex-1 p-6 lg:p-8">
              <div className="flex flex-col gap-10">
                {/* Workers Slider */}
                <Slider
                  label="Number of Field Workers"
                  value={workers}
                  min={10}
                  max={1000}
                  step={10}
                  unit="Workers"
                  onChange={setWorkers}
                />

                {/* Tasks Slider */}
                <Slider
                  label="Daily AI Tasks Per Worker (Photos/Video)"
                  value={tasksPerDay}
                  min={1}
                  max={20}
                  step={1}
                  unit="Tasks/Day"
                  onChange={setTasksPerDay}
                />

                {/* Assumptions Box */}
                <div
                  className="p-4 rounded-md"
                  style={{ backgroundColor: '#F5F1FD' }}
                >
                  <p
                    className="font-sans font-semibold text-xs mb-2"
                    style={{ color: COLORS.muted }}
                  >
                    Assumptions:
                  </p>
                  <ul className="flex flex-col gap-1">
                    <li
                      className="font-sans text-xs"
                      style={{ color: COLORS.muted }}
                    >
                      Working Days: {WORKING_DAYS_PER_YEAR}/year
                    </li>
                    <li
                      className="font-sans text-xs"
                      style={{ color: COLORS.muted }}
                    >
                      Agentic Cost: Flat ${AGENTIC_MONTHLY_COST_PER_USER}/mo per user (Viewer License)
                    </li>
                    <li
                      className="font-sans text-xs"
                      style={{ color: COLORS.muted }}
                    >
                      Incumbent Cost: ${INCUMBENT_COST_PER_TASK.toFixed(2)} per task
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="flex-1 p-6 lg:p-8 lg:pl-12 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-center gap-8">
              <CostDisplay
                label="Incumbent Annual Cost"
                amount={calculations.incumbentAnnualCost}
                subtitle="Variable & Unpredictable"
                variant="incumbent"
              />

              <CostDisplay
                label="Agentic Annual Cost"
                amount={calculations.agenticAnnualCost}
                subtitle="Predictable"
                variant="agentic"
              />

              <div className="pt-6 border-t border-slate-200">
                <CostDisplay
                  label="Total Annual Savings"
                  amount={calculations.annualSavings}
                  subtitle=""
                  variant="savings"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
