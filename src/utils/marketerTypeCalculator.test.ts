import { getMarketerTypeAndImage } from './marketerTypeCalculator';

describe('getMarketerTypeAndImage', () => {
  it('should return All-Around Marketer if both scores meet criteria', () => {
    const result = getMarketerTypeAndImage(4, 2);
    expect(result.type).toBe('All-Around Marketer');
    expect(result.imagePath).toBe('/marketer-type/all-around.svg');
  });

  it('should return Data-Aware Marketer if only meetingTwoScore meets criteria', () => {
    const result = getMarketerTypeAndImage(4, 1);
    expect(result.type).toBe('Data-Aware Marketer');
    expect(result.imagePath).toBe('/marketer-type/data-aware.svg');
  });

  it('should return Creative Marketer if only meetingThreeScore meets criteria', () => {
    const result = getMarketerTypeAndImage(3, 2);
    expect(result.type).toBe('Creative Marketer');
    expect(result.imagePath).toBe('/marketer-type/creative.svg');
  });

  it('should return Curious Marketer if neither score meets criteria', () => {
    const result = getMarketerTypeAndImage(3, 1);
    expect(result.type).toBe('Curious Marketer');
    expect(result.imagePath).toBe('/marketer-type/curious.svg');
  });

  it('should handle null meetingTwoScore and return Creative Marketer if meetingThreeScore meets criteria', () => {
    const result = getMarketerTypeAndImage(null, 2);
    expect(result.type).toBe('Creative Marketer');
    expect(result.imagePath).toBe('/marketer-type/creative.svg');
  });

  it('should handle null meetingThreeScore and return Data-Aware Marketer if meetingTwoScore meets criteria', () => {
    const result = getMarketerTypeAndImage(4, null);
    expect(result.type).toBe('Data-Aware Marketer');
    expect(result.imagePath).toBe('/marketer-type/data-aware.svg');
  });

  it('should handle both scores as null and return Curious Marketer', () => {
    const result = getMarketerTypeAndImage(null, null);
    expect(result.type).toBe('Curious Marketer');
    expect(result.imagePath).toBe('/marketer-type/curious.svg');
  });

  it('should handle scores below threshold and return Curious Marketer', () => {
    const result = getMarketerTypeAndImage(0, 0);
    expect(result.type).toBe('Curious Marketer');
    expect(result.imagePath).toBe('/marketer-type/curious.svg');
  });

  it('should handle boundary conditions for meetingTwoScore', () => {
    let result = getMarketerTypeAndImage(3, 2);
    expect(result.type).toBe('Creative Marketer'); // 3 is below 4

    result = getMarketerTypeAndImage(4, 2);
    expect(result.type).toBe('All-Around Marketer'); // 4 is at or above 4
  });

  it('should handle boundary conditions for meetingThreeScore', () => {
    let result = getMarketerTypeAndImage(4, 1);
    expect(result.type).toBe('Data-Aware Marketer'); // 1 is below 2

    result = getMarketerTypeAndImage(4, 2);
    expect(result.type).toBe('All-Around Marketer'); // 2 is at or above 2
  });
});
