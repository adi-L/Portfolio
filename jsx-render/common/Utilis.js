export function isEvent(prop) {
    const pattern = new RegExp('^on');
    const result = pattern.test(prop);
    if (result) {
      let evName = prop.replace('on', '');
      const letters = /[A-Z]/;
      return letters.test(evName);
    }
  }