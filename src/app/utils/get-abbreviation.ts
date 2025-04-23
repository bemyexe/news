const customAbbreviations: Record<string, string> = {
  'United States of America': 'USA',
};

export const getAbbreviation = (str: string): string => {
  return customAbbreviations[str] || str;
};
