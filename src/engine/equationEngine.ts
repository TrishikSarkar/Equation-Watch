/**
 * EQUATION WATCH — Core Mathematical Engine
 * Formula: (a * b * c + d) * e + f
 * Variables: a, b, c, d, e, f in [0..9]
 * Target range: 100 to 1259 (representing 1:00 through 12:59 on a 12-hour clock)
 */

export type VariableTuple = [number, number, number, number, number, number];

export interface EquationSolution {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  target: number;
  formatted: string;
}

export interface StepByStepStep {
  step: number;
  description: string;
  math: string;
  result: number;
}

export interface TimeState {
  hours: number;       // 1-12
  minutes: number;     // 0-59
  seconds: number;     // 0-59
  milliseconds: number;
  isPm: boolean;
  target: number;      // hours * 100 + minutes
}

/**
 * Directly evaluates the master watch equation:
 * (a * b * c + d) * e + f
 */
export function evaluateEquation(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
): number {
  return (a * b * c + d) * e + f;
}

/**
 * Converts clock hours and minutes into the target integer:
 * Hour in 12-hour format (12 stays 12, 0 becomes 12)
 * Target = hour * 100 + minutes
 */
export function timeToTarget(hours: number, minutes: number): number {
  let h = hours % 12;
  if (h === 0) h = 12;
  return h * 100 + minutes;
}

/**
 * Scoring function to find visually balanced and mathematically elegant combinations.
 * - Discourages trivial 0 multipliers (e.g., a=0 or e=0).
 * - Prefers non-trivial multiplication (a, b, c, e >= 2).
 * - Enforces ascending factor order (a <= b <= c) for readability.
 * - Rewards non-zero additive terms d and f for full mechanical engagement.
 */
function scoreCombination(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
): number {
  let score = 0;

  // Penalize zero multipliers
  if (a === 0 || b === 0 || c === 0) score -= 1500;
  if (e === 0) score -= 1500;
  if (e === 1) score -= 400;

  // Penalize trivial multipliers of 1
  if (a === 1) score -= 250;
  if (b === 1) score -= 250;
  if (c === 1) score -= 250;

  // Bonus for natural ascending order a <= b <= c
  if (a <= b && b <= c) score += 350;

  // Moderate outer multiplier preferred
  score -= Math.abs(e - 5) * 20;

  // Bonus for active additive terms
  if (d > 0) score += 60;
  if (f > 0) score += 60;

  // Reward significant multiplication doing the heavy work
  const abc = a * b * c;
  if (abc >= 20) score += 120;

  return score;
}

/**
 * Build the complete lookup map of deterministic, optimal solutions for every target 100..1259.
 */
function buildSolutionMap(): Map<number, VariableTuple> {
  const map = new Map<number, VariableTuple>();
  const scores = new Map<number, number>();

  for (let a = 0; a < 10; a++) {
    for (let b = a; b < 10; b++) {
      for (let c = b; c < 10; c++) {
        const abc = a * b * c;
        for (let d = 0; d < 10; d++) {
          const inner = abc + d;
          for (let e = 1; e < 10; e++) {
            const scaled = inner * e;
            for (let f = 0; f < 10; f++) {
              const res = scaled + f;
              if (res >= 100 && res <= 1259) {
                const s = scoreCombination(a, b, c, d, e, f);
                const currentBest = scores.get(res);
                if (currentBest === undefined || s > currentBest) {
                  scores.set(res, s);
                  map.set(res, [a, b, c, d, e, f]);
                }
              }
            }
          }
        }
      }
    }
  }

  // Ensure the iconic combination from the reference image for 10:11 (1011)
  map.set(1011, [4, 5, 7, 4, 7, 3]);

  return map;
}

// Singleton precomputed lookup table
const SOLUTION_TABLE = buildSolutionMap();

/**
 * Retrieve the solution for an arbitrary target integer.
 */
export function getSolutionForTarget(target: number): EquationSolution {
  const tuple = SOLUTION_TABLE.get(target);
  if (!tuple) {
    // Fallback if target is outside 100..1259
    return {
      a: 1, b: 2, c: 5, d: 0, e: 1, f: 0,
      target,
      formatted: `(${1} × ${2} × ${5} + ${0}) × ${1} + ${0}`,
    };
  }

  const [a, b, c, d, e, f] = tuple;
  return {
    a, b, c, d, e, f,
    target,
    formatted: `(${a} × ${b} × ${c} + ${d}) × ${e} + ${f}`,
  };
}

/**
 * Retrieve the solution for clock hours and minutes.
 */
export function getSolutionForTime(hours: number, minutes: number): EquationSolution {
  const target = timeToTarget(hours, minutes);
  return getSolutionForTarget(target);
}

/**
 * Returns step-by-step arithmetic breakdown of the equation for educational/inspection modal.
 */
export function getStepByStepBreakdown(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
): { steps: StepByStepStep[]; finalResult: number; timeString: string } {
  const step1 = a * b;
  const step2 = step1 * c;
  const step3 = step2 + d;
  const step4 = step3 * e;
  const step5 = step4 + f;

  const steps: StepByStepStep[] = [
    {
      step: 1,
      description: 'First factor product',
      math: `${a} × ${b}`,
      result: step1,
    },
    {
      step: 2,
      description: 'Multiply by third factor',
      math: `${step1} × ${c}`,
      result: step2,
    },
    {
      step: 3,
      description: 'Add inner offset',
      math: `${step2} + ${d}`,
      result: step3,
    },
    {
      step: 4,
      description: 'Multiply by outer multiplier',
      math: `${step3} × ${e}`,
      result: step4,
    },
    {
      step: 5,
      description: 'Add final minute adjustment',
      math: `${step4} + ${f}`,
      result: step5,
    },
  ];

  // Format as time string: e.g. 1011 -> "10:11", 105 -> "1:05"
  const h = Math.floor(step5 / 100);
  const m = step5 % 100;
  const timeString = `${h}:${m < 10 ? '0' : ''}${m}`;

  return { steps, finalResult: step5, timeString };
}

/**
 * Verifies coverage of all 720 minutes of the 12-hour clock (1:00 through 12:59).
 */
export function verifyAllClockMinutes(): {
  totalMinutes: number;
  coveredMinutes: number;
  missing: number[];
  valid: boolean;
} {
  const missing: number[] = [];
  let total = 0;

  for (let h = 1; h <= 12; h++) {
    for (let m = 0; m < 60; m++) {
      total++;
      const target = h * 100 + m;
      const sol = SOLUTION_TABLE.get(target);
      if (!sol) {
        missing.push(target);
      } else {
        const val = evaluateEquation(...sol);
        if (val !== target) {
          missing.push(target);
        }
      }
    }
  }

  return {
    totalMinutes: total,
    coveredMinutes: total - missing.length,
    missing,
    valid: missing.length === 0,
  };
}

