export const cn = (...classes: (string | undefined | Record<string, unknown>)[]) => {
  const allClasses: string[] = [];
  classes.forEach((classElement) => {
    if (typeof classElement === 'string') {
      allClasses.push(classElement);
    } else if (typeof classElement === 'object') {
      Object.keys(classElement).forEach((key) => {
        if (classElement[key]) {
          allClasses.push(key);
        }
      });
    }
  })
  return allClasses.join(' ');
}