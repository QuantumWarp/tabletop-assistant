enum DisplayType {
  dotCounter = 'Dot Counter',
  numberSquare = 'Number Square',
  simpleCard = 'Simple Card',
  simpleToggle = 'Simple Toggle',
}

export const defaultSize = (type: DisplayType) => {
  switch (type) {
    case DisplayType.dotCounter: return { width: '400px', height: '100px' };
    case DisplayType.numberSquare: return { width: '200px', height: '200px' };
    case DisplayType.simpleCard: return { width: '450px', height: '85px' };
    case DisplayType.simpleToggle: return { width: '300px', height: '50px' };
    default: return { width: '100px', height: '100px' };
  }
};

export default DisplayType;
