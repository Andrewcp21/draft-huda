interface MarketerTypeResult {
  type: string;
  imagePath: string;
}

export function getMarketerTypeAndImage(
  meetingTwoScore: number | null,
  meetingThreeScore: number | null
): MarketerTypeResult {
  const isDataAware = (meetingTwoScore !== null && meetingTwoScore >= 4);
  const isCreative = (meetingThreeScore !== null && meetingThreeScore >= 2);

  if (isDataAware && isCreative) {
    return { type: 'All-Around Marketer', imagePath: '/marketer-type/all-around.svg' };
  } else if (isDataAware) {
    return { type: 'Data-Aware Marketer', imagePath: '/marketer-type/data-aware.svg' };
  } else if (isCreative) {
    return { type: 'Creative Marketer', imagePath: '/marketer-type/creative.svg' };
  } else {
    return { type: 'Curious Marketer', imagePath: '/marketer-type/curious.svg' };
  }
}
