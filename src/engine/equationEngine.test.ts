import { describe, it, expect } from 'vitest';
import {
  evaluateEquation,
  timeToTarget,
  getSolutionForTarget,
  getSolutionForTime,
  getStepByStepBreakdown,
  verifyAllClockMinutes,
} from './equationEngine';

describe('EQUATION WATCH — Mathematical Engine Tests', () => {
  it('covers every single minute from 1:00 to 12:59 (all 720 clock targets)', () => {
    const verification = verifyAllClockMinutes();
    expect(verification.totalMinutes).toBe(720);
    expect(verification.coveredMinutes).toBe(720);
    expect(verification.missing).toEqual([]);
    expect(verification.valid).toBe(true);
  });

  it('covers all continuous integers from 100 to 1259 without gaps', () => {
    for (let target = 100; target <= 1259; target++) {
      const sol = getSolutionForTarget(target);
      expect(sol).toBeDefined();

      // Check all 6 variables are single digits between 0 and 9
      expect(Number.isInteger(sol.a)).toBe(true);
      expect(Number.isInteger(sol.b)).toBe(true);
      expect(Number.isInteger(sol.c)).toBe(true);
      expect(Number.isInteger(sol.d)).toBe(true);
      expect(Number.isInteger(sol.e)).toBe(true);
      expect(Number.isInteger(sol.f)).toBe(true);

      expect(sol.a).toBeGreaterThanOrEqual(0);
      expect(sol.a).toBeLessThanOrEqual(9);
      expect(sol.b).toBeGreaterThanOrEqual(0);
      expect(sol.b).toBeLessThanOrEqual(9);
      expect(sol.c).toBeGreaterThanOrEqual(0);
      expect(sol.c).toBeLessThanOrEqual(9);
      expect(sol.d).toBeGreaterThanOrEqual(0);
      expect(sol.d).toBeLessThanOrEqual(9);
      expect(sol.e).toBeGreaterThanOrEqual(0);
      expect(sol.e).toBeLessThanOrEqual(9);
      expect(sol.f).toBeGreaterThanOrEqual(0);
      expect(sol.f).toBeLessThanOrEqual(9);

      // Verify mathematical evaluation equals target exactly
      const calculated = evaluateEquation(sol.a, sol.b, sol.c, sol.d, sol.e, sol.f);
      expect(calculated).toBe(target);
    }
  });

  it('matches the exact reference image equation for 10:11 (1011)', () => {
    const sol = getSolutionForTime(10, 11);
    expect(sol.target).toBe(1011);
    expect([sol.a, sol.b, sol.c, sol.d, sol.e, sol.f]).toEqual([4, 5, 7, 4, 7, 3]);
    const value = evaluateEquation(4, 5, 7, 4, 7, 3);
    expect(value).toBe(1011);
  });

  it('correctly maps 12:00 AM, 12:00 PM, 1:00 AM, and 1:00 PM', () => {
    // Test timeToTarget mapping
    expect(timeToTarget(0, 0)).toBe(1200);
    expect(timeToTarget(12, 0)).toBe(1200);
    expect(timeToTarget(1, 0)).toBe(100);
    expect(timeToTarget(13, 0)).toBe(100);
    expect(timeToTarget(10, 11)).toBe(1011);

    // 12:00 AM -> hour 0 in 24h -> 12:00 -> target 1200
    const midnight = getSolutionForTime(0, 0);
    expect(midnight.target).toBe(1200);
    expect(evaluateEquation(midnight.a, midnight.b, midnight.c, midnight.d, midnight.e, midnight.f)).toBe(1200);

    // 12:00 PM -> hour 12 in 24h -> 12:00 -> target 1200
    const noon = getSolutionForTime(12, 0);
    expect(noon.target).toBe(1200);
    expect(evaluateEquation(noon.a, noon.b, noon.c, noon.d, noon.e, noon.f)).toBe(1200);

    // 1:00 AM -> hour 1 in 24h -> 1:00 -> target 100
    const oneAm = getSolutionForTime(1, 0);
    expect(oneAm.target).toBe(100);
    expect(evaluateEquation(oneAm.a, oneAm.b, oneAm.c, oneAm.d, oneAm.e, oneAm.f)).toBe(100);

    // 1:00 PM -> hour 13 in 24h -> 1:00 -> target 100
    const onePm = getSolutionForTime(13, 0);
    expect(onePm.target).toBe(100);
    expect(evaluateEquation(onePm.a, onePm.b, onePm.c, onePm.d, onePm.e, onePm.f)).toBe(100);
  });

  it('changes equation correctly when minutes advance', () => {
    const timeA = getSolutionForTime(10, 11);
    const timeB = getSolutionForTime(10, 12);
    expect(timeA.target).toBe(1011);
    expect(timeB.target).toBe(1012);
    expect(timeA.formatted).not.toEqual(timeB.formatted);
  });

  it('produces valid step-by-step arithmetic breakdown', () => {
    const breakdown = getStepByStepBreakdown(4, 5, 7, 4, 7, 3);
    expect(breakdown.finalResult).toBe(1011);
    expect(breakdown.timeString).toBe('10:11');
    expect(breakdown.steps.length).toBe(5);
    expect(breakdown.steps[0].result).toBe(20);    // 4 * 5
    expect(breakdown.steps[1].result).toBe(140);   // 20 * 7
    expect(breakdown.steps[2].result).toBe(144);   // 140 + 4
    expect(breakdown.steps[3].result).toBe(1008);  // 144 * 7
    expect(breakdown.steps[4].result).toBe(1011);  // 1008 + 3
  });
});
