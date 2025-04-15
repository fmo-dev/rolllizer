

export const getBarStyle = (scrollPercent: number) => {
  const shadowProp = 14 - scrollPercent * 14;
  return {
    opacity: scrollPercent,
    boxShadow: `0px ${shadowProp}px ${shadowProp}px var(--color-primary)`,
  };
}

export const getHeaderStyle = (scrollPercent: number) => {
  const blur = scrollPercent * 10;
  return {
    boxShadow: `0 0 ${blur}px 0px var(--color-grey)`,
  };
}

export const getTitleStyle = (scrollPercent: number) => {
  if (scrollPercent > 0.6)
    return {
      top: `${-50 + (scrollPercent * 100 - 60) * 2.5}%`,
    };
}